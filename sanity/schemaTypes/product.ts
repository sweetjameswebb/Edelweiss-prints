import { defineField, defineType } from "sanity";
import { CATEGORIES } from "./categories";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name (EN)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameGe",
      title: "Name (GE)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "color",
      title: "Placeholder color",
      type: "string",
      description: "Hex swatch used on the storefront until a product photo is uploaded, e.g. #C94B28.",
      validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "What kind of product this is. Collections only apply to the Poster category.",
      options: {
        list: CATEGORIES.map(({ value, title }) => ({ value, title })),
        layout: "radio",
      },
      initialValue: "poster",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (₾)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "salePrice",
      title: "Sale price (₾)",
      type: "number",
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
      description: "Prints/posters only — not used by other categories.",
      hidden: ({ parent }) => parent?.category !== "poster",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { category?: string } | undefined;
          if (parent?.category === "poster" && !value) {
            return "Collection is required for posters";
          }
          if (parent?.category !== "poster" && value) {
            return "Only poster products can belong to a collection";
          }
          return true;
        }),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["popular", "new", "sale", "picks"],
      },
    }),
    defineField({
      name: "description",
      title: "Description (EN)",
      type: "text",
    }),
    defineField({
      name: "descriptionGe",
      title: "Description (GE)",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      collectionTitle: "collection.title",
      media: "image",
    },
    prepare({ title, category, collectionTitle, media }) {
      const categoryTitle = CATEGORIES.find((c) => c.value === category)?.title ?? category;
      return {
        title,
        subtitle: category === "poster" && collectionTitle ? `${categoryTitle} — ${collectionTitle}` : categoryTitle,
        media,
      };
    },
  },
});
