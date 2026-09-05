import { defineField, defineType } from "sanity";

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
    select: { title: "name", subtitle: "collection.title", media: "image" },
  },
});
