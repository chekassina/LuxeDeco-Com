import { Category, Product, Supplier, Review } from './types';

export const categories: Category[] = [
  { id: 'cat-1', nameEn: 'Living Room', nameFr: 'Salon', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80', icon: 'living' },
  { id: 'cat-2', nameEn: 'Bedroom', nameFr: 'Chambre', imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80', icon: 'bed' },
  { id: 'cat-3', nameEn: 'Kitchen Accessories', nameFr: 'Cuisine', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80', icon: 'kitchen' },
  { id: 'cat-4', nameEn: 'Wall Decorations', nameFr: 'Décoration Murale', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80', icon: 'wall' },
  { id: 'cat-5', nameEn: 'Lighting & Lamps', nameFr: 'Éclairage', imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80', icon: 'lamp' },
  { id: 'cat-6', nameEn: 'Modern Furniture', nameFr: 'Meubles Modernes', imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80', icon: 'furniture' },
  { id: 'cat-7', nameEn: 'Curtains & Carpets', nameFr: 'Rideaux & Tapis', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80', icon: 'carpet' },
  { id: 'cat-8', nameEn: 'Office Decoration', nameFr: 'Bureau', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', icon: 'office' }
];

export const suppliers: Supplier[] = [
  { id: 'sup-1', name: 'LuxeInteriors CM', location: 'Douala', verified: true, rating: 4.9 },
  { id: 'sup-2', name: 'Yaoundé Décor', location: 'Yaoundé', verified: true, rating: 4.8 },
  { id: 'sup-3', name: 'Premium Build Africa', location: 'Douala', verified: true, rating: 4.7 },
  { id: 'sup-4', name: 'Marble Masters', location: 'Yaoundé', verified: false, rating: 4.5 }
];

export const products: Product[] = [
  {
    id: 'prod-1',
    nameEn: 'Royal White Marble Wall Panel',
    nameFr: 'Panneau Mural Marbre Blanc Royal',
    descriptionEn: 'Premium grade PVC marble wall panel for luxury living rooms and hotel lobbies. Water-resistant and easy to install.',
    descriptionFr: "Panneau mural en PVC effet marbre de qualité premium pour salons de luxe et halls d'hôtel. Résistant à l'eau et facile à installer.",
    priceFcfa: 15000,
    category: 'cat-1',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'
    ],
    supplierId: 'sup-1',
    isFeatured: true,
    isTrending: true,
    badges: ['Verified Supplier', 'Fast Delivery'],
    stockQuantity: 50,
    specifications: [
      { label: 'Material', value: 'PVC' },
      { label: 'Dimensions', value: '120cm x 60cm' },
      { label: 'Thickness', value: '3mm' }
    ]
  },
  {
    id: 'prod-2',
    nameEn: 'Golden Brass Decorative Trim',
    nameFr: 'Moulure Décorative en Laiton Doré',
    descriptionEn: 'Elegant golden trim to complement marble and wood finishes. Creates a sophisticated separation line.',
    descriptionFr: 'Élégante moulure dorée pour compléter les finitions en marbre et en bois. Crée une ligne de séparation sophistiquée.',
    priceFcfa: 4500,
    category: 'cat-3',
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80'],
    supplierId: 'sup-2',
    isFeatured: true,
    isTrending: false,
    badges: ['Premium Quality', 'Trusted Importer'],
    stockQuantity: 200,
    specifications: [
      { label: 'Material', value: 'Brass' },
      { label: 'Length', value: '240cm' }
    ]
  },
  {
    id: 'prod-3',
    nameEn: 'Black Laurent PVC Panel',
    nameFr: 'Panneau PVC Noir Laurent',
    descriptionEn: 'Luxurious black marble finish with gold veins. Perfect for modern office and residential feature walls.',
    descriptionFr: 'Finition luxueuse en marbre noir avec des veines dorées. Parfait pour les murs de bureaux modernes et résidentiels.',
    priceFcfa: 17500,
    category: 'cat-1',
    imageUrl: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80'],
    supplierId: 'sup-1',
    isFeatured: true,
    isTrending: true,
    badges: ['Verified Supplier'],
    stockQuantity: 30,
    specifications: [
      { label: 'Material', value: 'PVC' },
      { label: 'Dimensions', value: '120cm x 60cm' }
    ]
  },
  {
    id: 'prod-4',
    nameEn: '3D Geometric Ceiling Tile',
    nameFr: 'Dalle de Plafond Géométrique 3D',
    descriptionEn: 'Acoustic and visually striking ceiling tiles for commercial spaces and modern homes.',
    descriptionFr: 'Dalles de plafond acoustiques et visuellement frappantes pour les espaces commerciaux et les maisons modernes.',
    priceFcfa: 8000,
    category: 'cat-4',
    imageUrl: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80'],
    supplierId: 'sup-3',
    isFeatured: true,
    isTrending: false,
    badges: ['Fast Delivery', 'Premium Quality'],
    stockQuantity: 150,
    specifications: [
      { label: 'Material', value: 'Acoustic Foam / PVC' },
      { label: 'Dimensions', value: '60cm x 60cm' }
    ]
  },
  {
    id: 'prod-5',
    nameEn: 'Adhesive Foam Wallpaper Rolls',
    nameFr: 'Rouleaux de papier peint adhésif en mousse',
    descriptionEn: 'High-quality adhesive foam wallpaper rolls for easy decoration and sound insulation.',
    descriptionFr: 'Rouleaux de papier peint adhésif en mousse de haute qualité pour une décoration facile et une isolation phonique.',
    priceFcfa: 5000,
    category: 'cat-4',
    imageUrl: 'https://images.unsplash.com/photo-1615800098779-1be32e7122e2?auto=format&fit=crop&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1615800098779-1be32e7122e2?auto=format&fit=crop&q=80'],
    supplierId: 'sup-1',
    isFeatured: true,
    isTrending: true,
    badges: ['Easy Install', 'Trending'],
    stockQuantity: 100,
    specifications: [
      { label: 'Material', value: 'Foam' },
      { label: 'Application', value: 'Self-adhesive' }
    ]
  }
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Jean-Paul K.',
    roleEn: 'Real Estate Developer, Douala',
    roleFr: 'Promoteur Immobilier, Douala',
    contentEn: 'LuxeDeco provided all the marble panels for our recent apartment project in Bonapriso. Exceptional quality and reliable supply.',
    contentFr: "LuxeDeco a fourni tous les panneaux en marbre pour notre récent projet d'appartements à Bonapriso. Qualité exceptionnelle et approvisionnement fiable.",
    rating: 5
  },
  {
    id: 'rev-2',
    author: 'Marie E.',
    roleEn: 'Interior Designer, Yaoundé',
    roleFr: "Architecte d'Intérieur, Yaoundé",
    contentEn: 'My clients love the exact finishes I source from here. The WhatsApp communication makes the ordering process incredibly fast for Cameroon.',
    contentFr: 'Mes clients adorent les finitions exactes que je trouve ici. La communication WhatsApp rend le processus de commande incroyablement rapide pour le Cameroun.',
    rating: 5
  },
  {
    id: 'rev-3',
    author: 'Daniel T.',
    roleEn: 'Hotel Manager, Kribi',
    roleFr: "Directeur d'Hôtel, Kribi",
    contentEn: 'We upgraded our hotel lobby with their black Laurent panels. Fast delivery from Douala to Kribi and excellent customer service.',
    contentFr: 'Nous avons rénové le hall de notre hôtel avec leurs panneaux Noir Laurent. Livraison rapide de Douala à Kribi et excellent service client.',
    rating: 4.5
  }
];
