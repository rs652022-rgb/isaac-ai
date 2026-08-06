import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Overridden in auth.ts
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedAdmin = nextUrl.pathname.startsWith("/admin");

      if (isProtectedAdmin && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
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
