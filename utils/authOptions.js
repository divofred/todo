import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/'
  },
  callbacks: {
    async session({ session, token, user }) {
      session.jwt = token.jwt;
      session.id = token.id;

      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?access_token=${account.access_token}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return token;
    }
  }
};
