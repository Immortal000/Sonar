import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth(async (event) => {
  const authOptions = {
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    secret: AUTH_SECRET,
    trustHost: true,
    callbacks: {
      async session({ session, token, newSession }) {
        if (session.user) {
          session.user = token;
        }
        return session;
      },
    },
    session: {
      strategy: "jwt",
    },
  };
  return authOptions;
});
