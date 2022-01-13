import { objectType } from "nexus";
import { Genre as GenreType } from "nexus-prisma";
export const Genre = objectType({
  name: GenreType.$name,
  definition(t) {
    t.field(GenreType.id);
    t.field(GenreType.name);
    t.field(GenreType.shows);
  },
});
