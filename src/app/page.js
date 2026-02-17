"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import LoginPrompt from "@/components/LoginPrompt";
import LoadingSpinner from "@/components/LoadingSpinner";

function useAlreadyLoggedIn() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const checkSession = useCallback(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace("/dashboard");
        return;
      }
      setChecking(false);
    });
  }, [router]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // When user logs in from another tab, Supabase writes session to localStorage; storage event fires here
  useEffect(() => {
    const onStorage = () => checkSession();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [checkSession]);

  return checking;
}

export default function Home() {
  const checking = useAlreadyLoggedIn();

  const loginWithGoogle = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <LoginPrompt onGoogleLogin={loginWithGoogle} />
    </main>
  );
}
