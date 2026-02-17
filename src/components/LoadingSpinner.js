export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      {label && <p className="text-muted text-sm">{label}</p>}
    </div>
  );
}
