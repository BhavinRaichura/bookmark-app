"use client";

import User from "@/components/User";
import Logout from "@/components/Logout";

export default function DashboardHeader({ user }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl shrink-0" aria-hidden>
            🔖
          </span>
          <div className="min-w-0">
            <User user={user} />
            <p className="text-sm text-muted mt-0.5">Your bookmarks</p>
          </div>
        </div>
        <Logout />
      </div>
    </header>
  );
}
