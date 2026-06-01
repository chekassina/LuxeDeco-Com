export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  priceFcfa: number;
  category: string;
  imageUrl: string;
  imageUrls: string[];
  supplierId: string;
  isFeatured: boolean;
  isTrending: boolean;
  badges: string[];
  stockQuantity: number;
  specifications: Specification[];
}

export interface Category {
  id: string;
  nameEn: string;
  nameFr: string;
  imageUrl: string;
  icon: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  roleEn: string;
  roleFr: string;
  contentEn: string;
  contentFr: string;
  rating: number;
}

export type Language = 'en' | 'fr';

export interface CartItem extends Product {
  quantity: number;
}
