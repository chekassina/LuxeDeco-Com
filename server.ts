import dotenv from "dotenv";
dotenv.config({ override: true });
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import mysql, { Pool } from 'mysql2/promise';
import { products, categories, suppliers, reviews } from "./src/data"; // fallback data

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const JWT_SECRET = process.env.JWT_SECRET || "luxedeco_super_secret_jwt_key_123!";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Mugherick@yahoo.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rick";

const authenticateAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies?.admin_token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

let pool: Pool | null = null;
if (process.env.DATABASE_URL) {
  // MySQL connection string using the URL parsing
  pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log("Database connection initialized");
} else {
  console.log("No DATABASE_URL found. Using fallback mock data.");
}

async function setupDatabase() {
  if (!pool) return;
  try {
    console.log("Testing database connection...");
    await pool.query('SELECT 1');
    console.log("Running automatic database updates...");

    // Create Categories Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        nameEn VARCHAR(255),
        nameFr VARCHAR(255),
        imageUrl TEXT,
        icon VARCHAR(100)
      )
    `);

    // Create Suppliers Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        location VARCHAR(255),
        verified BOOLEAN,
        rating FLOAT
      )
    `);

    // Create Products Table - Note JSON used instead of POSTGRES TEXT[]
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        nameEn VARCHAR(255),
        nameFr VARCHAR(255),
        descriptionEn TEXT,
        descriptionFr TEXT,
        priceFcfa INT,
        category VARCHAR(255),
        imageUrl LONGTEXT,
        supplierId VARCHAR(255),
        isFeatured BOOLEAN,
        badges JSON,
        imageUrls LONGTEXT,
        stockQuantity INT DEFAULT 0,
        isTrending BOOLEAN DEFAULT false,
        specifications JSON
      )
    `);

    try {
      await pool.query('ALTER TABLE products MODIFY imageUrl LONGTEXT');
      await pool.query('ALTER TABLE products MODIFY imageUrls LONGTEXT');
    } catch (e) {
      console.error("ALTER TABLE failed (might be expected if types are already right):", e);
    }

    // Create Reviews Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(255) PRIMARY KEY,
        author VARCHAR(255),
        roleEn VARCHAR(255),
        roleFr VARCHAR(255),
        contentEn TEXT,
        contentFr TEXT,
        rating FLOAT
      )
    `);

    // Seed data if empty (Categories)
    const [catRows]: any = await pool.query('SELECT count(*) as count FROM categories');
    if (catRows[0].count === 0) {
      for (const cat of categories) {
        await pool.query(
          'INSERT INTO categories (id, nameEn, nameFr, imageUrl, icon) VALUES (?, ?, ?, ?, ?)',
          [cat.id, cat.nameEn, cat.nameFr, cat.imageUrl, cat.icon]
        );
      }
    }

    // Seed data if empty (Suppliers)
    const [supRows]: any = await pool.query('SELECT count(*) as count FROM suppliers');
    if (supRows[0].count === 0) {
      for (const sup of suppliers) {
        await pool.query(
          'INSERT INTO suppliers (id, name, location, verified, rating) VALUES (?, ?, ?, ?, ?)',
          [sup.id, sup.name, sup.location, sup.verified, sup.rating]
        );
      }
    }

    // Seed data if empty (Products)
    const [prodRows]: any = await pool.query('SELECT count(*) as count FROM products');
    if (prodRows[0].count === 0) {
      for (const prod of products) {
        await pool.query(
          'INSERT INTO products (id, nameEn, nameFr, descriptionEn, descriptionFr, priceFcfa, category, imageUrl, supplierId, isFeatured, badges, imageUrls, stockQuantity, isTrending, specifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [prod.id, prod.nameEn, prod.nameFr, prod.descriptionEn, prod.descriptionFr, prod.priceFcfa, prod.category, prod.imageUrl, prod.supplierId, prod.isFeatured || false, JSON.stringify(prod.badges || []), JSON.stringify(prod.imageUrls || []), prod.stockQuantity || 0, prod.isTrending || false, JSON.stringify(prod.specifications || [])]
        );
      }
    }

    // Seed data if empty (Reviews)
    const [revRows]: any = await pool.query('SELECT count(*) as count FROM reviews');
    if (revRows[0].count === 0) {
      for (const rev of reviews) {
        await pool.query(
          'INSERT INTO reviews (id, author, roleEn, roleFr, contentEn, contentFr, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [rev.id, rev.author, rev.roleEn, rev.roleFr, rev.contentEn, rev.contentFr, rev.rating]
        );
      }
    }

    console.log("Database update and setup completed successfully.");
  } catch (err) {
    console.error("Setup DB error during startup (falling back to mock data):", err);
    pool = null;
  }
}

async function startServer() {
  await setupDatabase();
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(cookieParser());

  // API ROUTES

  // Auth API
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
      res.cookie('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
      return res.json({ success: true });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  });

  app.post("/api/logout", (req, res) => {
    res.clearCookie('admin_token');
    return res.json({ success: true });
  });

  app.get("/api/auth/check", authenticateAdmin, (req, res) => {
    return res.json({ authenticated: true });
  });

  // Products API
  app.get("/api/products", async (req, res) => {
    if (pool) {
      try {
        const [rows]: any = await pool.query('SELECT * FROM products');

        // MySQL JSON parsing mapping
        const parsed = rows.map((r: any) => ({
          ...r,
          isFeatured: !!r.isFeatured,
          isTrending: !!r.isTrending,
          badges: typeof r.badges === 'string' ? JSON.parse(r.badges) : (r.badges || []),
          imageUrls: typeof r.imageUrls === 'string' ? JSON.parse(r.imageUrls) : (r.imageUrls || []),
          specifications: typeof r.specifications === 'string' ? JSON.parse(r.specifications) : (r.specifications || [])
        }));

        return res.json(parsed);
      } catch (err) {
        console.error("Database error fetching products:", err);
        // Fallback to mock data if table doesn't exist yet
        return res.json(products);
      }
    }
    // Return mock data
    res.json(products);
  });

  app.post("/api/upload", authenticateAdmin, async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) return res.status(400).json({ error: "No image provided" });

      // We will store the base64 image data directly to avoid ephemeral file storage issues in container
      return res.json({ url: image });
    } catch (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Create Product API
  app.post("/api/products", authenticateAdmin, async (req, res) => {
    const prod = req.body;
    const newId = `prod-${Date.now()}`;
    if (pool) {
      try {
        await pool.query(
          'INSERT INTO products (id, nameEn, nameFr, descriptionEn, descriptionFr, priceFcfa, category, imageUrl, supplierId, isFeatured, badges, imageUrls, stockQuantity, isTrending, specifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [newId, prod.nameEn, prod.nameFr, prod.descriptionEn, prod.descriptionFr, prod.priceFcfa, prod.category, prod.imageUrl, prod.supplierId, prod.isFeatured || false, JSON.stringify(prod.badges || []), JSON.stringify(prod.imageUrls || []), prod.stockQuantity || 0, prod.isTrending || false, JSON.stringify(prod.specifications || [])]
        );
        return res.status(201).json({ id: newId });
      } catch (err) {
        console.error("Database error creating product:", err);
        return res.status(500).json({ error: "Failed to create product" });
      }
    }
    // Mock
    return res.status(201).json({ id: newId });
  });

  // Update Product API
  app.put("/api/products/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const prod = req.body;
    if (pool) {
      try {
        await pool.query(
          'UPDATE products SET nameEn=?, nameFr=?, descriptionEn=?, descriptionFr=?, priceFcfa=?, category=?, imageUrl=?, supplierId=?, isFeatured=?, badges=?, imageUrls=?, stockQuantity=?, isTrending=?, specifications=? WHERE id=?',
          [prod.nameEn, prod.nameFr, prod.descriptionEn, prod.descriptionFr, prod.priceFcfa, prod.category, prod.imageUrl, prod.supplierId, prod.isFeatured || false, JSON.stringify(prod.badges || []), JSON.stringify(prod.imageUrls || []), prod.stockQuantity || 0, prod.isTrending || false, JSON.stringify(prod.specifications || []), id]
        );
        return res.json({ success: true });
      } catch (err) {
        console.error("Database error updating product:", err);
        return res.status(500).json({ error: "Failed to update product" });
      }
    }
    return res.json({ success: true });
  });

  // Delete Product API
  app.delete("/api/products/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    if (pool) {
      try {
        await pool.query('DELETE FROM products WHERE id=?', [id]);
        return res.json({ success: true });
      } catch (err) {
        console.error("Database error deleting product:", err);
        return res.status(500).json({ error: "Failed to delete product" });
      }
    }
    return res.json({ success: true });
  });

  // Categories API
  app.get("/api/categories", async (req, res) => {
    if (pool) {
      try {
        const [rows]: any = await pool.query('SELECT * FROM categories');
        return res.json(rows);
      } catch (err) {
        console.error("Database error fetching categories:", err);
        return res.json(categories);
      }
    }
    // Return mock data
    res.json(categories);
  });

  // Providers API
  app.get("/api/suppliers", async (req, res) => {
    if (pool) {
      try {
        const [rows]: any = await pool.query('SELECT * FROM suppliers');
        return res.json(rows);
      } catch (err) {
        return res.json(suppliers);
      }
    }
    res.json(suppliers);
  });

  // Reviews API
  app.get("/api/reviews", async (req, res) => {
    if (pool) {
      try {
        const [rows]: any = await pool.query('SELECT * FROM reviews');
        return res.json(rows);
      } catch (err) {
        return res.json(reviews);
      }
    }
    res.json(reviews);
  });

  // Serve uploads path statically
  const uploadsPath = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsPath));

  // Vite middleware for development
  if (process.env.NODE_ENV == "development") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port:${PORT}`);
  });
}

startServer().catch(console.error);
