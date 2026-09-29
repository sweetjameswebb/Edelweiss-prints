import { defineField, defineType } from "sanity";

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  description: "Editorial groupings of prints/posters (e.g. Georgian Retro, Japanese Ukiyo-e). Not used by other product categories.",
  fields: [
    defineField({
      name: "title",
      title: "Title (EN)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleGe",
      title: "Title (GE)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "color",
      title: "Placeholder color",
      type: "string",
      description: "Hex swatch used on the storefront until a cover image is uploaded, e.g. #C94B28.",
      validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
