import { extendType, objectType } from "nexus";
import { Genre } from "./genre";

export const Show = objectType({
  name: "Show",

  definition(t) {
    t.int("id");
    t.string("name");
    t.string("description");
    t.string("image_potrait");
    t.string("image_wide");
    t.string("rating");
    t.int("year");
    t.list.field("genres", {
      type: Genre,
      resolve: (parent, args, ctx) => {
        return ctx.prisma.show
          .findOne({
            where: {
              id: parent.id,
            },
          })
          .genres();
      },
    });
  },
});

export const ShowQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("shows", {
      type: Show,
      resolve: (parent, args, ctx) => {
        return ctx.prisma.show.findMany();
      },
    });
  },
});
