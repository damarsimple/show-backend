import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Show as ShowType } from "nexus-prisma";
import { NexusArgDef, NexusNonNullDef } from "nexus/dist/core";
import { shuffle } from "lodash";
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
      resolve: async (_, args, ctx) => {
        return shuffle(
          await ctx.prisma.show.findMany({
            take: 40,
          })
        );
      },
    });
    t.list.field("recomendations", {
      type: Show,
      resolve: async (_, args, ctx) => {
        return await ctx.prisma.show.findMany();
      },
    });

    t.list.field("trending", {
      type: Show,
      resolve: async (_, args, ctx) => {
        return await ctx.prisma.show.findMany();
      },
    });

    t.field("show", {
      type: Show,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, ctx) => {
        return await ctx.prisma.show.findFirst({
          where: {
            id,
          },
        });
      },
    });
  },
});

export const reduceArg = (
  args: string[],
  nullable: boolean,
  type: () => NexusArgDef<any> | NexusNonNullDef<any>
) => {
  const maps: Record<string, NexusArgDef<any> | NexusNonNullDef<any>> = {};

  if (!nullable) {
    args.forEach((arg) => {
      maps[arg] = nonNull(type() as any);
    });
  } else {
    args.forEach((arg) => {
      maps[arg] = type();
    });
  }

  return maps;
};

export const ShowMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("showUpdate", {
      type: Show,
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      resolve: async (_, { id, ...args }, ctx) => {
        await ctx.prisma.show.update({
          where: { id },
          data: {
            ...args,
          },
        });
        return await ctx.prisma.show.findFirst({ where: { id } });
      },
    });
    t.field("showCreate", {
      type: Show,
      args: {
        ...reduceArg(
          [
            "name",
            "description",
            "image_potrait",
            "image_wide",
            "director",
            "rating",
          ],
          false,
          stringArg
        ),
        ...reduceArg(["year"], false, intArg),
      },
      resolve: async (_, args, ctx) => {
        return await ctx.prisma.show.create({
          data: {
            ...args,
          },
        });
      },
    });

    t.field("showDelete", {
      type: Show,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id, ...args }, ctx) => {
        const show = await ctx.prisma.show.findFirst({ where: { id } });
        await ctx.prisma.show.delete({ where: { id } });
        return show;
      },
    });
  },
});
