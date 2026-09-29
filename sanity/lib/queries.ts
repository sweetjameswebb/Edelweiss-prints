import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Product, Collection, BlogPost } from "@/lib/data";

interface PortableTextSpan {
  text?: string;
}
interface PortableTextBlock {
  _type: string;
  children?: PortableTextSpan[];
}

function blocksToParagraphs(blocks: PortableTextBlock[] | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter(Boolean);
}

interface RawProduct {
  _id: string;
  name: string;
  nameGe?: string;
  slug: string;
  price: number;
  salePrice?: number;
  category: string;
  collectionTitle?: string;
  collectionSlug?: string;
  tags?: string[];
  color: string;
  image?: unknown;
  description?: string;
  descriptionGe?: string;
}

const PRODUCT_PROJECTION = `{
  _id,
  name,
  nameGe,
  "slug": slug.current,
  price,
  salePrice,
  category,
  "collectionTitle": collection->title,
  "collectionSlug": collection->slug.current,
  tags,
  color,
  image,
  description,
  descriptionGe
}`;

function mapProduct(raw: RawProduct): Product {
  return {
    id: raw._id,
    slug: raw.slug,
    name: raw.name,
    nameGe: raw.nameGe ?? raw.name,
    price: raw.price,
    salePrice: raw.salePrice,
    category: raw.category,
    collection: raw.collectionTitle,
    collectionSlug: raw.collectionSlug,
    tags: raw.tags ?? [],
    color: raw.color,
    image: raw.image ? urlFor(raw.image as Parameters<typeof urlFor>[0]).width(800).url() : undefined,
    description: raw.description ?? "",
    descriptionGe: raw.descriptionGe ?? raw.description ?? "",
  };
}

export async function getProducts(): Promise<Product[]> {
  const raw = await client.fetch<RawProduct[]>(
    `*[_type == "product"] | order(name asc) ${PRODUCT_PROJECTION}`
  );
  return raw.map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const raw = await client.fetch<RawProduct | null>(
    `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`,
    { slug }
  );
  return raw ? mapProduct(raw) : null;
}

interface RawCollection {
  title: string;
  titleGe?: string;
  slug: string;
  color: string;
  coverImage?: unknown;
}

export async function getCollections(): Promise<Collection[]> {
  const raw = await client.fetch<RawCollection[]>(
    `*[_type == "collection"] | order(title asc) {
      title,
      titleGe,
      "slug": slug.current,
      color,
      coverImage
    }`
  );
  return raw.map((c) => ({
    name: c.title,
    nameGe: c.titleGe ?? c.title,
    slug: c.slug,
    color: c.color,
    coverImage: c.coverImage ? urlFor(c.coverImage as Parameters<typeof urlFor>[0]).width(600).url() : undefined,
  }));
}

interface RawPost {
  _id: string;
  title: string;
  titleGe?: string;
  slug: string;
  excerpt?: string;
  excerptGe?: string;
  publishedAt: string;
  color: string;
  coverImage?: unknown;
  body?: PortableTextBlock[];
  bodyGe?: PortableTextBlock[];
}

const POST_PROJECTION = `{
  _id,
  title,
  titleGe,
  "slug": slug.current,
  excerpt,
  excerptGe,
  publishedAt,
  color,
  coverImage,
  body,
  bodyGe
}`;

function mapPost(raw: RawPost): BlogPost {
  return {
    id: raw._id,
    slug: raw.slug,
    title: raw.title,
    titleGe: raw.titleGe ?? raw.title,
    excerpt: raw.excerpt ?? "",
    excerptGe: raw.excerptGe ?? raw.excerpt ?? "",
    date: raw.publishedAt,
    color: raw.color,
    coverImage: raw.coverImage ? urlFor(raw.coverImage as Parameters<typeof urlFor>[0]).width(800).url() : undefined,
    body: blocksToParagraphs(raw.body),
    bodyGe: blocksToParagraphs(raw.bodyGe).length ? blocksToParagraphs(raw.bodyGe) : blocksToParagraphs(raw.body),
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const raw = await client.fetch<RawPost[]>(
    `*[_type == "post"] | order(publishedAt desc) ${POST_PROJECTION}`
  );
  return raw.map(mapPost);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const raw = await client.fetch<RawPost | null>(
    `*[_type == "post" && slug.current == $slug][0] ${POST_PROJECTION}`,
    { slug }
  );
  return raw ? mapPost(raw) : null;
}
