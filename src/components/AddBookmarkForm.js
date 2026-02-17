"use client";

export default function AddBookmarkForm({
  title,
  url,
  onTitleChange,
  onUrlChange,
  onSubmit,
  isLoading = false,
}) {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-medium text-muted mb-3">Add bookmark</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="cursor-text flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent/20 focus:border-accent transition"
          aria-label="Bookmark title"
        />
        <input
          placeholder="https://..."
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          type="url"
          className="cursor-text flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent/20 focus:border-accent transition"
          aria-label="Bookmark URL"
        />
        <button
          type="submit"
          disabled={isLoading || !title?.trim() || !url?.trim()}
          className="cursor-pointer rounded-xl bg-accent text-white px-6 py-3 font-medium hover:opacity-90 active:scale-[0.98] transition shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </form>
    </section>
  );
}
