import { objectType } from "nexus";
import { User as UserType } from "nexus-prisma";
export const User = objectType({
  name: UserType.$name,

  definition(t) {
    t.field(UserType.id);
  },
});
