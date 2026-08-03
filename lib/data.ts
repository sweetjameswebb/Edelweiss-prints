export interface Product {
  id: string;
  slug: string;
  name: string;
  nameGe: string;
  price: number;
  salePrice?: number;
  collection: string;
  tags: string[];
  color: string;
  description: string;
  descriptionGe: string;
}

export const products: Product[] = [
  { id: "1", slug: "tbilisi-1960", name: "Tbilisi 1960", nameGe: "თბილისი 1960", price: 45, collection: "Georgian Retro", tags: ["popular", "picks"], color: "#C94B28", description: "A stunning retro poster of Tbilisi from the 1960s, capturing the golden era of Georgian modernism.", descriptionGe: "მდიდარი რეტრო პოსტერი, თბილისი 1960-იანი წლებიდან." },
  { id: "2", slug: "georgian-film-poster", name: "Georgian Film Classic", nameGe: "ქართული კინო კლასიკა", price: 38, collection: "Cinema & Theatre", tags: ["popular"], color: "#8B6E4E", description: "An homage to the golden age of Georgian cinema. Warm sepia tones and bold typography.", descriptionGe: "პატივისცემა ქართული კინოს ოქროს ხანისადმი." },
  { id: "3", slug: "wave-kanagawa", name: "The Great Wave", nameGe: "დიდი ტალღა", price: 52, collection: "Japanese Ukiyo-e", tags: ["popular", "new"], color: "#5A7D48", description: "Hokusai's iconic woodblock print, one of the most recognizable artworks in history.", descriptionGe: "ჰოკუსაის ხის ბლოკის ბეჭდვა." },
  { id: "4", slug: "art-nouveau-spring", name: "Art Nouveau Spring", nameGe: "არ ნუვო გაზაფხული", price: 60, salePrice: 42, collection: "Art Nouveau", tags: ["sale", "picks"], color: "#99B18A", description: "Delicate floral motifs in the classic Art Nouveau style. Perfect for bedroom or study.", descriptionGe: "ნაზი ყვავილოვანი მოტივები კლასიკური არ ნუვო სტილში." },
  { id: "5", slug: "propaganda-red", name: "Red Star Rising", nameGe: "წითელი ვარსკვლავი", price: 40, salePrice: 28, collection: "Propaganda", tags: ["sale", "popular"], color: "#C94B28", description: "A bold Soviet-era propaganda poster reprint. High contrast reds and strong geometric forms.", descriptionGe: "საბჭოთა ეპოქის პროპაგანდის პოსტერი." },
  { id: "6", slug: "paris-1920", name: "Paris 1920", nameGe: "პარიზი 1920", price: 48, collection: "European Retro", tags: ["new", "picks"], color: "#B59878", description: "Art Deco style poster of Paris in the roaring twenties. Elegant and timeless.", descriptionGe: "პარიზის არ დეკო სტილის პოსტერი 1920-იანი წლებიდან." },
  { id: "7", slug: "magazine-vogue-1930", name: "Vogue 1930s Cover", nameGe: "ვოგ 1930-ის გარეკანი", price: 35, salePrice: 25, collection: "Magazine Covers", tags: ["sale"], color: "#E56744", description: "Iconic 1930s Vogue magazine cover reproduction. Timeless fashion illustration.", descriptionGe: "1930-იანი წლების ვოგის ჟურნალის გარეკანი." },
  { id: "8", slug: "american-road", name: "Route 66", nameGe: "გზა 66", price: 42, collection: "American Retro", tags: ["popular", "new"], color: "#6B5039", description: "The iconic American road. A vintage style poster celebrating freedom and open highways.", descriptionGe: "ამერიკის იკონური გზა." },
  { id: "9", slug: "nature-forest", name: "Forest Morning", nameGe: "ტყის დილა", price: 38, collection: "Nature", tags: ["new"], color: "#5A7D48", description: "A serene morning forest scene with soft light filtering through ancient trees.", descriptionGe: "სერენული ტყის დილა." },
  { id: "10", slug: "modern-abstract", name: "Modern Abstract I", nameGe: "მოდერნი აბსტრაქცია I", price: 55, collection: "Modern", tags: ["picks", "popular"], color: "#321F10", description: "Bold geometric forms and muted palette. A modern statement piece for any room.", descriptionGe: "თამამი გეომეტრიული ფორმები." },
  { id: "11", slug: "kids-space", name: "Space Adventure", nameGe: "კოსმოსური თავგადასავალი", price: 32, collection: "Kids", tags: ["new"], color: "#778abd", description: "A colourful space adventure poster for children's rooms. Rockets, planets, and stars.", descriptionGe: "ფერადი კოსმოსური პოსტერი ბავშვებისთვის." },
  { id: "12", slug: "nostalgia-radio", name: "Old Radio Days", nameGe: "ძველი რადიოს დღეები", price: 36, collection: "Nostalgia", tags: ["picks"], color: "#C9B49A", description: "Warm nostalgia for the golden age of radio. Sepia tones and vintage typography.", descriptionGe: "სითბო ნოსტალგია რადიოს ოქროს ხანის." },
  { id: "13", slug: "fun-cats", name: "Cool Cats", nameGe: "მაგარი კატები", price: 30, salePrice: 22, collection: "Fun & What Not", tags: ["sale", "popular"], color: "#E56744", description: "Whimsical illustration of cats in human situations. Guaranteed to make you smile.", descriptionGe: "სახალისო კატების ილუსტრაცია." },
  { id: "14", slug: "georgian-feast", name: "Georgian Feast", nameGe: "ქართული სუფრა", price: 50, collection: "Georgian Retro", tags: ["picks", "popular"], color: "#A03920", description: "A vibrant poster celebrating the Georgian supra tradition, rich with food and wine.", descriptionGe: "ქართული სუფრის ამსახველი ვიბრანტი პოსტერი." },
];

export const collections = [
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

export const blogPosts = [
  {
    id: "1",
    slug: "posters-in-interior-design",
    title: "Posters in Interior Design",
    titleGe: "პოსტერები ინტერიერის დიზაინში",
    excerpt: "How to choose and hang art prints that transform your living space into a personal gallery.",
    excerptGe: "როგორ ავირჩიოთ და განვათავსოთ პოსტერები, რომლებიც სახლს გარდაქმნიან.",
    date: "2025-11-15",
    color: "#C9B49A",
  },
  {
    id: "2",
    slug: "propaganda-posters",
    title: "What to Know About Propaganda Posters",
    titleGe: "რა უნდა ვიცოდეთ პროპაგანდის პოსტერებზე",
    excerpt: "A deep dive into the history, art, and psychology behind some of the most powerful posters ever made.",
    excerptGe: "ისტორია, ხელოვნება და ფსიქოლოგია ყველაზე ძლიერი პოსტერების უკან.",
    date: "2025-10-28",
    color: "#C94B28",
  },
  {
    id: "3",
    slug: "history-of-the-poster",
    title: "The History of the Poster",
    titleGe: "პოსტერის ისტორია",
    excerpt: "From 19th century lithographs to digital prints — how posters became the world's most democratic art form.",
    excerptGe: "მე-19 საუკუნის ლითოგრაფიებიდან ციფრულ ბეჭდვამდე.",
    date: "2025-10-05",
    color: "#5A7D48",
  },
];
