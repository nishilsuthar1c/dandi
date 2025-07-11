import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../../../lib/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Upsert user into Supabase users table
      const { name, email, image } = user;
      const { error } = await supabase
        .from("users")
        .upsert([
          {
            email, // using email as unique identifier
            name,
            image,
            created_at: new Date().toISOString(),
          },
        ], { onConflict: ["email"] });
      if (error) {
        console.error("Supabase user upsert error:", error);
        return false;
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST }; 