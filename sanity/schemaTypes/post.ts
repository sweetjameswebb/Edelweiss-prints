import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
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
    defineField({
      name: "excerpt",
      title: "Excerpt (EN)",
      type: "text",
    }),
    defineField({
      name: "excerptGe",
      title: "Excerpt (GE)",
      type: "text",
    }),
    defineField({
      name: "body",
      title: "Body (EN)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bodyGe",
      title: "Body (GE)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
