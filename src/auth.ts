import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
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
});
