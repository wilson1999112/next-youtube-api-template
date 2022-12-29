import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "[YOUR_CLIENT_ID]",
      clientSecret: "[YOUR_CLIENT_SECRET]",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/youtube " +
            "https://www.googleapis.com/auth/userinfo.email " +
            "https://www.googleapis.com/auth/userinfo.profile " +
            "openid",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
        console.log(account);
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token?.access_token) {
        session.access_token = token.access_token as string;
      }

      return session;
    },
  },
});
