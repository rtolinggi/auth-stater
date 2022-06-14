import { prisma } from "src/utils/prisma.server";

type User = {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
  };
};

const seed = async () => {
  await Promise.all(
    getUser().map((user) => {
      const { email, password, profile } = user;
      return prisma.user.create({
        data: {
          email,
          password,
          profile: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            phome: profile.phone,
          },
        },
      });
    })
  );
};

const getUser = (): Array<User> => {
  return [
    {
      email: "admin@gmail.com",
      password: "password",
      profile: {
        firstName: "admin",
        lastName: "sistem",
        phone: "081254789542",
      },
    },
    {
      email: "user@gmail.com",
      password: "password",
      profile: {
        firstName: "user",
        lastName: "sistem",
        phone: "081254579542",
      },
    },
    {
      email: "rtolinggi@gmail.com",
      password: "password",
      profile: {
        firstName: "rio",
        lastName: "tolinggi",
        phone: "081351441899",
      },
    },
  ];
};

seed();
