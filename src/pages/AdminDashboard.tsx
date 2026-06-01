import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Supplier, Category } from '../types';
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Loader2 } from 'lucide-react';
// Removed supabase import

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | Partial<Product> | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          fetchData();
        } else {
          navigate('/admin/login');
        }
      } catch (err) {
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);
      if (prodRes.ok) setProducts(await prodRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    navigate('/');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    // Assure minimum fields
    const payload = {
      ...editingProduct,
      imageUrl: editingProduct.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3',
      imageUrls: editingProduct.imageUrls || [],
      specifications: editingProduct.specifications || []
    };

    const isExisting = !!payload.id;
    const url = isExisting ? `/api/products/${payload.id}` : `/api/products`;
    const method = isExisting ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setEditingProduct(null);
        fetchData();
      } else {
        alert("Failed to save product.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    
    setUploadingImage(true);
    for (const file of files) {
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = ev => resolve(ev.target?.result as string);
          reader.onerror = err => reject(err);
          reader.readAsDataURL(file);
        });

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 })
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setEditingProduct(prev => {
              if (!prev) return prev;
              return {
                ...prev,
                imageUrls: [...(prev.imageUrls || []), data.url]
              };
            });
          }
        } else {
          alert("Failed to upload image. File might be too large.");
        }
      } catch (err) {
        console.error(err);
        alert("Error uploading image");
      }
    }
    setUploadingImage(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0A] flex justify-center items-center"><div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white tracking-tight mb-4">Admin Dashboard</h1>
            <div className="h-px w-20 bg-gold"></div>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => setEditingProduct({ nameEn: '', nameFr: '', imageUrls: [], priceFcfa: 0, stockQuantity: 0, category: categories[0]?.id || '', specifications: [], isFeatured: true })} className="bg-gold text-black px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 rounded-sm hover:opacity-90">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
            <button onClick={handleLogout} className="border border-white/20 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-colors">
              Logout
            </button>
          </div>
        </div>

        {editingProduct ? (
          <div className="bg-[#111] p-8 border border-white/10 rounded-sm">
            <h2 className="text-xl font-medium mb-6 uppercase tracking-widest text-gold text-xs">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={saveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Name (English)</label>
                  <input required value={editingProduct.nameEn || ''} onChange={(e) => setEditingProduct({...editingProduct, nameEn: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Name (French)</label>
                  <input required value={editingProduct.nameFr || ''} onChange={(e) => setEditingProduct({...editingProduct, nameFr: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Price (FCFA)</label>
                  <input required type="number" value={editingProduct.priceFcfa || 0} onChange={(e) => setEditingProduct({...editingProduct, priceFcfa: parseInt(e.target.value)})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Stock Quantity</label>
                  <input required type="number" value={editingProduct.stockQuantity || 0} onChange={(e) => setEditingProduct({...editingProduct, stockQuantity: parseInt(e.target.value)})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Category</label>
                  <select required value={editingProduct.category || ''} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light">
                    <option value="">Select a category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nameEn}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Description (English)</label>
                <textarea rows={3} value={editingProduct.descriptionEn || ''} onChange={(e) => setEditingProduct({...editingProduct, descriptionEn: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light"></textarea>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Description (French)</label>
                <textarea rows={3} value={editingProduct.descriptionFr || ''} onChange={(e) => setEditingProduct({...editingProduct, descriptionFr: e.target.value})} className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light"></textarea>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked={editingProduct.isFeatured || false} onChange={(e) => setEditingProduct({...editingProduct, isFeatured: e.target.checked})} className="bg-[#0A0A0A] border-white/10 text-gold focus:ring-gold" />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked={editingProduct.isTrending || false} onChange={(e) => setEditingProduct({...editingProduct, isTrending: e.target.checked})} className="bg-[#0A0A0A] border-white/10 text-gold focus:ring-gold" />
                  <span>Trending</span>
                </label>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Specifications</label>
                {(editingProduct.specifications || []).map((spec, i) => (
                  <div key={i} className="flex gap-4 mb-2">
                    <input 
                      value={spec.label} 
                      onChange={(e) => {
                        const newSpecs = [...(editingProduct.specifications || [])];
                        newSpecs[i] = { ...newSpecs[i], label: e.target.value };
                        setEditingProduct({...editingProduct, specifications: newSpecs});
                      }}
                      placeholder="Label (e.g. Material)" 
                      className="w-1/2 bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light text-sm" 
                    />
                    <input 
                      value={spec.value} 
                      onChange={(e) => {
                        const newSpecs = [...(editingProduct.specifications || [])];
                        newSpecs[i] = { ...newSpecs[i], value: e.target.value };
                        setEditingProduct({...editingProduct, specifications: newSpecs});
                      }}
                      placeholder="Value (e.g. Wood)" 
                      className="w-1/2 bg-[#0A0A0A] border border-white/10 px-4 py-3 text-white focus:border-gold font-light text-sm" 
                    />
                    <button type="button" onClick={() => {
                      const newSpecs = editingProduct.specifications?.filter((_, idx) => idx !== i);
                      setEditingProduct({...editingProduct, specifications: newSpecs});
                    }} className="text-red-500 hover:text-red-400 flex items-center justify-center px-2 border border-white/10 hover:border-red-500 rounded-sm">
                      <X className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => {
                  setEditingProduct({...editingProduct, specifications: [...(editingProduct.specifications || []), {label: '', value: ''}]});
                }} className="text-xs text-gold hover:underline mt-2 flex items-center space-x-1">
                  <Plus className="w-3 h-3" />
                  <span>Add Specification</span>
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Images (Upload Multiple) - First is Primary</label>
                <div className="flex flex-wrap gap-4 mb-4">
                  {(editingProduct.imageUrls || []).map((url, i) => (
                    <div key={i} className="relative w-24 h-24 border border-white/10">
                      <img src={url} alt="upload" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setEditingProduct({...editingProduct, imageUrls: editingProduct.imageUrls?.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                  <label className="w-24 h-24 border border-dashed border-white/20 hover:border-gold flex items-center justify-center cursor-pointer transition-colors relative">
                    {uploadingImage ? <Loader2 className="w-6 h-6 text-gold animate-spin" /> : <ImageIcon className="w-6 h-6 text-gray-500" />}
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                </div>
                <p className="text-xs text-gray-500 font-light">Add multiple high-quality images. The first image will be the primary image.</p>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-white/10">
                <button type="submit" className="bg-gold text-black px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-90">
                  Save Product
                </button>
                <button type="button" onClick={() => setEditingProduct(null)} className="border border-white/20 px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-[#111] p-4 border border-white/10 flex flex-col">
                <img src={product.imageUrl} alt={product.nameEn} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-sm font-medium text-white mb-2">{product.nameEn}</h3>
                <p className="text-gold font-serif italic text-sm mb-4">{product.priceFcfa.toLocaleString()} FCFA</p>
                <p className="text-gray-500 text-xs mb-4">Stock: {product.stockQuantity || 0}</p>
                <div className="mt-auto flex space-x-2">
                  <button onClick={() => setEditingProduct(product)} className="flex-1 border border-white/20 py-2 flex justify-center items-center hover:text-gold hover:border-gold transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 border border-white/20 py-2 flex justify-center items-center hover:text-red-500 hover:border-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
