import { objectType } from "nexus";

export const Genre = objectType({
  name: "Genre",

  definition(t) {
    t.int("id");
    t.string("name");
  },
});
