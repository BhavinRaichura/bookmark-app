"use client";

import GoogleIcon from "@/components/GoogleIcon";

export default function LoginPrompt({
  title = "Bookmark App",
  subtitle = "Save your links in one place. Sign in to get started.",
  onGoogleLogin,
}) {
  return (
    <div className="max-w-md w-full text-center">
      <span
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent text-3xl mb-6"
        aria-hidden
      >
        🔖
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        {title}
      </h1>
      <p className="text-muted text-lg mb-10">{subtitle}</p>
      <button
        type="button"
        onClick={onGoogleLogin}
        className="cursor-pointer w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-foreground text-background font-medium hover:opacity-90 active:scale-[0.98] transition"
      >
        <GoogleIcon />
        Login with Google
      </button>
    </div>
  );
}
