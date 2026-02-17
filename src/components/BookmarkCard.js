"use client";

export default function BookmarkCard({ bookmark, onDelete }) {
  const { id, title, url } = bookmark;

  return (
    <li className="group rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-4 hover:border-border/80 transition">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer min-w-0 flex-1"
      >
        <div className="font-medium text-foreground truncate group-hover:text-accent transition">
          {title}
        </div>
        <div className="text-sm text-muted truncate mt-0.5">{url}</div>
      </a>
      <button
        type="button"
        onClick={() => onDelete(id)}
        className="cursor-pointer shrink-0 p-2 rounded-lg text-muted hover:text-red-600 hover:bg-red-500/10 transition"
        title="Delete bookmark"
        aria-label={`Delete ${title}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </li>
  );
}
