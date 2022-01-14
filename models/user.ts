import {
  enumType,
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { PLAN, User as UserType } from "nexus-prisma";
import { signJWT } from "../jwt";
import { hash, genSalt, compare } from "bcrypt";
export const User = objectType({
  name: UserType.$name,
  definition(t) {
    t.field(UserType.id);
    t.field(UserType.username);
    t.field(UserType.email);
    t.field(UserType.plan);
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: User,
      resolve: async (parent, args, ctx) => {
        if (!ctx.user?.id) return null;

        return await ctx.prisma.user.findFirst({
          where: {
            id: ctx.user.id,
          },
        });
      },
    });
  },
});

export const Auth = objectType({
  name: "Auth",
  definition(t) {
    t.string("token");
    t.nonNull.boolean("status");
    t.nonNull.string("message");
    t.field("user", {
      type: User,
    });
  },
});

export const Plan = enumType(PLAN);

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field({
      name: "register",
      type: Auth,
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        plan: nonNull(Plan),
        genres: nonNull(list(intArg())),
      },
      async resolve(root, { genres, ...args }, { prisma }) {
        try {
          const salt = await genSalt();
          const connect = (genres.filter((e) => e == null) as number[]).map(
            (e) => ({ id: e })
          );
          const user = await prisma.user.create({
            data: {
              ...args,
              plan: args.plan,
              password: await hash(args.password, salt),
              genres: {
                connect,
              },
            },
          });

          if (user) {
            const token = await signJWT(user);
            return {
              status: true,
              token,
              message: "success",
              user,
            };
          }

          return {
            status: false,
            message: "unknown error",
            token: "",
          };
        } catch (error) {
          console.log(error);
          return {
            status: false,
            message: "Username or Email  already exists",
          };
        }
      },
    });
    t.field("login", {
      type: Auth,
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (parent, args, ctx) => {
        const user = await ctx.prisma.user.findFirst({
          where: {
            username: args.username,
          },
        });

        if (!user)
          return {
            status: false,
            message: "account not found",
          };

        const isValid = await compare(args.password, user.password);

        if (isValid) {
          const token = await signJWT(user);
          return {
            status: true,
            token,
            message: "success",
            user,
          };
        }

        return {
          status: false,
          message: "Password is incorrect",
        };
      },
    });
  },
});
