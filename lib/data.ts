export interface Category {
  slug: string;
  name: string;
  nameGe: string;
}

export const categories: Category[] = [
  { slug: "poster", name: "Posters", nameGe: "პოსტერები" },
  { slug: "lantern", name: "Lanterns", nameGe: "ფარნები" },
  { slug: "frame", name: "Frames", nameGe: "ჩარჩოები" },
  { slug: "decor", name: "Decor", nameGe: "დეკორი" },
  { slug: "sticker", name: "Stickers", nameGe: "სტიკერები" },
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameGe: string;
  price: number;
  salePrice?: number;
  category: string;
  collection?: string;
  collectionSlug?: string;
  tags: string[];
  color: string;
  image?: string;
  description: string;
  descriptionGe: string;
}

export interface Collection {
  name: string;
  nameGe: string;
  slug: string;
  color: string;
  coverImage?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleGe: string;
  excerpt: string;
  excerptGe: string;
  date: string;
  color: string;
  coverImage?: string;
  body: string[];
  bodyGe: string[];
}
