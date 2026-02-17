"use client";

import BookmarkCard from "@/components/BookmarkCard";

export default function BookmarkList({ bookmarks = [], onDelete }) {
  const heading =
    bookmarks.length === 0 ? "No bookmarks yet" : "Saved links";

  return (
    <section>
      <h2 className="text-sm font-medium text-muted mb-3">{heading}</h2>
      <ul className="space-y-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
