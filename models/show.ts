import { extendType, objectType } from "nexus";
import { Show as ShowType } from "nexus-prisma";
export const Show = objectType({
  name: ShowType.$name,

  definition(t) {
    t.field(ShowType.id);
    t.field(ShowType.name);
    t.field(ShowType.description);
    t.field(ShowType.image_potrait);
    t.field(ShowType.image_wide);
    t.field(ShowType.rating);
    t.field(ShowType.year);
    t.field(ShowType.genres);
  },
});

export const ShowQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("shows", {
      type: Show,
      resolve: async (parent, args, ctx) => {
        return await ctx.prisma.show.findMany();
      },
    });
  },
});
