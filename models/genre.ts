import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Genre as GenreType } from "nexus-prisma";

export const Genre = objectType({
  name: GenreType.$name,
  definition(t) {
    t.field(GenreType.id);
    t.field(GenreType.name);
    t.field(GenreType.shows);
  },
});

export const GenreQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("genres", {
      type: Genre,
      resolve: async (_, args, ctx) => {
        return await ctx.prisma.genre.findMany();
      },
    });

    t.field("genre", {
      type: Genre,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, ctx) => {
        return await ctx.prisma.genre.findFirst({
          where: {
            id,
          },
        });
      },
    });
  },
});

export const GenreMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("genreUpdate", {
      type: Genre,
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg()),
      },
      resolve: async (_, { id, ...args }, ctx) => {
        await ctx.prisma.genre.update({
          where: { id },
          data: {
            ...args,
          },
        });
        return await ctx.prisma.genre.findFirst({ where: { id } });
      },
    });
    t.field("genreCreate", {
      type: Genre,
      args: {
        name: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        return await ctx.prisma.genre.create({
          data: {
            ...args,
          },
        });
      },
    });

    t.field("genreDelete", {
      type: Genre,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id, ...args }, ctx) => {
        const genre = await ctx.prisma.genre.findFirst({ where: { id } });
        await ctx.prisma.genre.delete({ where: { id } });
        return genre;
      },
    });
  },
});
