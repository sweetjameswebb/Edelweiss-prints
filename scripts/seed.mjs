// One-off migration of the original mock catalogue (lib/data.ts, git history)
// into Sanity. Idempotent: uses deterministic _ids and createOrReplace.
//
// Usage: node --env-file=.env.local scripts/seed.mjs
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !apiVersion || !token) {
  throw new Error(
    "Missing one of NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_API_WRITE_TOKEN"
  );
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function textToBlocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    children: [{ _type: "span", _key: `s${i}`, text }],
  }));
}

const collections = [
  { name: "Georgian Retro", nameGe: "ქართული რეტრო", color: "#C94B28" },
  { name: "Modern", nameGe: "მოდერნი", color: "#321F10" },
  { name: "Japanese Ukiyo-e", nameGe: "იაპონური უკიო-ე", color: "#5A7D48" },
  { name: "Propaganda", nameGe: "პროპაგანდა", color: "#8B1A1A" },
  { name: "Cinema & Theatre", nameGe: "კინო და თეატრი", color: "#8B6E4E" },
  { name: "Magazine Covers", nameGe: "ჟურნალის გარეკანები", color: "#E56744" },
  { name: "Art Nouveau", nameGe: "არ ნუვო", color: "#99B18A" },
  { name: "Nature", nameGe: "ბუნება", color: "#5A7D48" },
  { name: "European Retro", nameGe: "ევროპული რეტრო", color: "#B59878" },
  { name: "American Retro", nameGe: "ამერიკული რეტრო", color: "#6B5039" },
];

const products = [
  { slug: "tbilisi-1960", name: "Tbilisi 1960", nameGe: "თბილისი 1960", price: 45, category: "poster", collection: "Georgian Retro", tags: ["popular", "picks"], color: "#C94B28", description: "A stunning retro poster of Tbilisi from the 1960s, capturing the golden era of Georgian modernism.", descriptionGe: "მდიდარი რეტრო პოსტერი, თბილისი 1960-იანი წლებიდან." },
  { slug: "georgian-film-poster", name: "Georgian Film Classic", nameGe: "ქართული კინო კლასიკა", price: 38, category: "poster", collection: "Cinema & Theatre", tags: ["popular"], color: "#8B6E4E", description: "An homage to the golden age of Georgian cinema. Warm sepia tones and bold typography.", descriptionGe: "პატივისცემა ქართული კინოს ოქროს ხანისადმი." },
  { slug: "wave-kanagawa", name: "The Great Wave", nameGe: "დიდი ტალღა", price: 52, category: "poster", collection: "Japanese Ukiyo-e", tags: ["popular", "new"], color: "#5A7D48", description: "Hokusai's iconic woodblock print, one of the most recognizable artworks in history.", descriptionGe: "ჰოკუსაის ხის ბლოკის ბეჭდვა." },
  { slug: "art-nouveau-spring", name: "Art Nouveau Spring", nameGe: "არ ნუვო გაზაფხული", price: 60, salePrice: 42, category: "poster", collection: "Art Nouveau", tags: ["sale", "picks"], color: "#99B18A", description: "Delicate floral motifs in the classic Art Nouveau style. Perfect for bedroom or study.", descriptionGe: "ნაზი ყვავილოვანი მოტივები კლასიკური არ ნუვო სტილში." },
  { slug: "propaganda-red", name: "Red Star Rising", nameGe: "წითელი ვარსკვლავი", price: 40, salePrice: 28, category: "poster", collection: "Propaganda", tags: ["sale", "popular"], color: "#C94B28", description: "A bold Soviet-era propaganda poster reprint. High contrast reds and strong geometric forms.", descriptionGe: "საბჭოთა ეპოქის პროპაგანდის პოსტერი." },
  { slug: "paris-1920", name: "Paris 1920", nameGe: "პარიზი 1920", price: 48, category: "poster", collection: "European Retro", tags: ["new", "picks"], color: "#B59878", description: "Art Deco style poster of Paris in the roaring twenties. Elegant and timeless.", descriptionGe: "პარიზის არ დეკო სტილის პოსტერი 1920-იანი წლებიდან." },
  { slug: "magazine-vogue-1930", name: "Vogue 1930s Cover", nameGe: "ვოგ 1930-ის გარეკანი", price: 35, salePrice: 25, category: "poster", collection: "Magazine Covers", tags: ["sale"], color: "#E56744", description: "Iconic 1930s Vogue magazine cover reproduction. Timeless fashion illustration.", descriptionGe: "1930-იანი წლების ვოგის ჟურნალის გარეკანი." },
  { slug: "american-road", name: "Route 66", nameGe: "გზა 66", price: 42, category: "poster", collection: "American Retro", tags: ["popular", "new"], color: "#6B5039", description: "The iconic American road. A vintage style poster celebrating freedom and open highways.", descriptionGe: "ამერიკის იკონური გზა." },
  { slug: "nature-forest", name: "Forest Morning", nameGe: "ტყის დილა", price: 38, category: "poster", collection: "Nature", tags: ["new"], color: "#5A7D48", description: "A serene morning forest scene with soft light filtering through ancient trees.", descriptionGe: "სერენული ტყის დილა." },
  { slug: "modern-abstract", name: "Modern Abstract I", nameGe: "მოდერნი აბსტრაქცია I", price: 55, category: "poster", collection: "Modern", tags: ["picks", "popular"], color: "#321F10", description: "Bold geometric forms and muted palette. A modern statement piece for any room.", descriptionGe: "თამამი გეომეტრიული ფორმები." },
  { slug: "kids-space", name: "Space Adventure", nameGe: "კოსმოსური თავგადასავალი", price: 32, category: "poster", collection: "Kids", tags: ["new"], color: "#778abd", description: "A colourful space adventure poster for children's rooms. Rockets, planets, and stars.", descriptionGe: "ფერადი კოსმოსური პოსტერი ბავშვებისთვის." },
  { slug: "nostalgia-radio", name: "Old Radio Days", nameGe: "ძველი რადიოს დღეები", price: 36, category: "poster", collection: "Nostalgia", tags: ["picks"], color: "#C9B49A", description: "Warm nostalgia for the golden age of radio. Sepia tones and vintage typography.", descriptionGe: "სითბო ნოსტალგია რადიოს ოქროს ხანის." },
  { slug: "fun-cats", name: "Cool Cats", nameGe: "მაგარი კატები", price: 30, salePrice: 22, category: "poster", collection: "Fun & What Not", tags: ["sale", "popular"], color: "#E56744", description: "Whimsical illustration of cats in human situations. Guaranteed to make you smile.", descriptionGe: "სახალისო კატების ილუსტრაცია." },
  { slug: "georgian-feast", name: "Georgian Feast", nameGe: "ქართული სუფრა", price: 50, category: "poster", collection: "Georgian Retro", tags: ["picks", "popular"], color: "#A03920", description: "A vibrant poster celebrating the Georgian supra tradition, rich with food and wine.", descriptionGe: "ქართული სუფრის ამსახველი ვიბრანტი პოსტერი." },
];

// "Kids" and "Fun & What Not" appear on products but weren't in the original
// collections list — include them so every product's reference resolves.
const extraCollections = [
  { name: "Kids", nameGe: "ბავშვები", color: "#778abd" },
  { name: "Fun & What Not", nameGe: "გართობა", color: "#E56744" },
];

const posts = [
  {
    slug: "posters-in-interior-design",
    title: "Posters in Interior Design",
    titleGe: "პოსტერები ინტერიერის დიზაინში",
    excerpt: "How to choose and hang art prints that transform your living space into a personal gallery.",
    excerptGe: "როგორ ავირჩიოთ და განვათავსოთ პოსტერები, რომლებიც სახლს გარდაქმნიან.",
    publishedAt: "2025-11-15T00:00:00Z",
    color: "#C9B49A",
    body: ["Art prints are one of the most powerful ways to personalise a living space. Whether you prefer minimalist line drawings or bold graphic prints, the right poster can anchor a room, create a focal point, and express your personality without a single word. When hanging posters, consider grouping them in clusters of three or five for a gallery wall effect, or let a single large print stand alone as a statement piece. Pair warm-toned prints (terracotta, ochre, rust) with natural wood frames for a cosy, artisanal feel."],
  },
  {
    slug: "propaganda-posters",
    title: "What to Know About Propaganda Posters",
    titleGe: "რა უნდა ვიცოდეთ პროპაგანდის პოსტერებზე",
    excerpt: "A deep dive into the history, art, and psychology behind some of the most powerful posters ever made.",
    excerptGe: "ისტორია, ხელოვნება და ფსიქოლოგია ყველაზე ძლიერი პოსტერების უკან.",
    publishedAt: "2025-10-28T00:00:00Z",
    color: "#C94B28",
    body: ["Propaganda posters are among the most visually compelling artefacts of the 20th century. Governments and movements from the Soviet Union to the United States commissioned the greatest graphic designers of their day to produce images capable of moving millions. Their secret? Bold colour contrasts, simple symbolic imagery, and an emotional directness that bypasses the rational mind. Today, vintage propaganda prints occupy a curious cultural space — simultaneously historical documents, graphic design masterclasses, and provocations to think about how images shape belief."],
  },
  {
    slug: "history-of-the-poster",
    title: "The History of the Poster",
    titleGe: "პოსტერის ისტორია",
    excerpt: "From 19th century lithographs to digital prints — how posters became the world's most democratic art form.",
    excerptGe: "მე-19 საუკუნის ლითოგრაფიებიდან ციფრულ ბეჭდვამდე.",
    publishedAt: "2025-10-05T00:00:00Z",
    color: "#5A7D48",
    body: ["The modern poster was born in 19th-century Paris, where Jules Chéret and later Henri de Toulouse-Lautrec used the newly perfected chromolithograph press to paste colour and movement across the walls of the city. For the first time, art came to the street — democratic, ephemeral, and powerful. The 20th century brought new printing technologies, new political urgencies, and new aesthetic movements: Art Nouveau, Constructivism, Bauhaus, Psychedelia. Today, digital printing has democratised poster production again, allowing small studios like ours to bring the world's visual heritage into homes across Georgia."],
  },
];

async function main() {
  const allCollections = [...collections, ...extraCollections];
  const collectionIdByName = new Map();

  const tx1 = client.transaction();
  for (const c of allCollections) {
    const slug = slugify(c.name);
    const id = `collection-${slug}`;
    collectionIdByName.set(c.name, id);
    tx1.createOrReplace({
      _id: id,
      _type: "collection",
      title: c.name,
      titleGe: c.nameGe,
      slug: { _type: "slug", current: slug },
      color: c.color,
    });
  }
  await tx1.commit();
  console.log(`Seeded ${allCollections.length} collections`);

  const tx2 = client.transaction();
  for (const p of products) {
    tx2.createOrReplace({
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      nameGe: p.nameGe,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      price: p.price,
      salePrice: p.salePrice,
      color: p.color,
      collection: { _type: "reference", _ref: collectionIdByName.get(p.collection) },
      tags: p.tags,
      description: p.description,
      descriptionGe: p.descriptionGe,
    });
  }
  await tx2.commit();
  console.log(`Seeded ${products.length} products`);

  const tx3 = client.transaction();
  for (const post of posts) {
    tx3.createOrReplace({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      titleGe: post.titleGe,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      excerptGe: post.excerptGe,
      publishedAt: post.publishedAt,
      color: post.color,
      body: textToBlocks(post.body),
    });
  }
  await tx3.commit();
  console.log(`Seeded ${posts.length} posts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
