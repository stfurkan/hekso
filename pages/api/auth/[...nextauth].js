import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  callbacks: {
    async session({ session, user }) {
      session.id = user.id;
      return session;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET
};
