import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("post").title("Blog Posts"),
    ]);
