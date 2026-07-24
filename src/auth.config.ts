import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), role: z.string().optional() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, role } = parsedCredentials.data;
          
          // Cannot use Prisma edge in auth.config, but wait, if we are not on edge we can.
          // Wait, Next.js middleware is edge, but if we query db here, it might crash on edge.
          // We will extract authorize to auth.ts if we need db there.
          // Actually, let's keep it simple. Auth.js handles edge now or we skip edge middleware if db is needed.
          // Create user if not exists for demo purposes
          let user = await db.user.findUnique({ where: { email } });
          
          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await db.user.create({
              data: {
                email,
                name: email.split("@")[0],
                password: hashedPassword,
                role: role || "Founder"
              }
            });
          } else if (user && user.password) {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) return null;
            
            // Update role if changed
            if (role && user.role !== role) {
              user = await db.user.update({
                where: { email },
                data: { role }
              });
            }
          }
          
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const protectedPaths = ["/dashboard", "/chat", "/documents", "/settings", "/profile", "/billing", "/founder-workspace"];
      const isProtected = protectedPaths.some((path) => nextUrl.pathname.startsWith(path));

      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect to signIn page
      } else if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        // Map custom fields from token if necessary
        session.user.role = token.role as string;
        session.user.subscriptionPlan = token.subscriptionPlan as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.subscriptionPlan = user.subscriptionPlan;
      }
      return token;
    }
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
