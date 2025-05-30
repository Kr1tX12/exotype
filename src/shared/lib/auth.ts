import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "../../prisma/prisma-client";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const GITHUB_CLIENT_ID = process.env.AUTH_GITHUB_ID!;
const GITHUB_CLIENT_SECRET = process.env.AUTH_GITHUB_SECRET!;

const DISCORD_CLIENT_ID = process.env.AUTH_DISCORD_ID!;
const DISCORD_CLIENT_SECRET = process.env.AUTH_DISCORD_SECRET!;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { email, name, image } }) {
      if (email) {
        const newUser = await prisma.user.upsert({
          where: { email },
          update: { username: name || email.split("@")[0], avatar: image },
          create: {
            email,
            username: name || email.split("@")[0],
            avatar: image,
            slug: email.split("@")[0],
          },
        });

        await prisma.userStats.upsert({
          where: { userId: newUser.id },
          update: {},
          create: {
            userId: newUser.id,
            totalTypingTimeSec: BigInt(0),
            totalStartedTests: 0,
            totalCompletedTests: 0,
            totalFullyCorrectTests: 0,
            totalTypedWords: BigInt(0),
            totalCorrectWords: BigInt(0),
            totalTypedChars: BigInt(0),
            totalCorrectChars: BigInt(0),
            totalXP: 0,

            records: { create: [] },
            typingPerDay: { create: [] },
            lastTests: { create: [] },

            last100TestsAvgWPM: JSON.stringify([]),
            avgWPM: JSON.stringify([]),
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, slug: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.slug = dbUser.slug;
        }
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session.user, { id: token.id, slug: token.slug });
      return session;
    },
  },
};
