"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import DashboardHeader from "@/components/DashboardHeader";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const loadBookmarks = async (uid) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user);
      if (res.data.user) loadBookmarks(res.data.user.id);
    });
  }, []);

  useEffect(() => {
    let channel;

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      setUser(u);

      if (!u) return;

      await loadBookmarks(u.id);

      channel = supabase
        .channel("bookmarks-live")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
          },
          () => loadBookmarks(u.id)
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const addBookmark = async () => {
    if (!title?.trim() || !url?.trim()) return;

    await supabase.from("bookmarks").insert({
      title: title.trim(),
      url: url.trim(),
      user_id: user.id,
    });

    setTitle("");
    setUrl("");
    loadBookmarks(user.id);
  };

  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    loadBookmarks(user.id);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <AddBookmarkForm
          title={title}
          url={url}
          onTitleChange={setTitle}
          onUrlChange={setUrl}
          onSubmit={addBookmark}
        />
        <BookmarkList bookmarks={bookmarks} onDelete={deleteBookmark} />
      </main>
    </div>
  );
}
