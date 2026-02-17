"use client";

function getFirstName(user) {
  const meta = user?.user_metadata;
  if (meta?.given_name) return meta.given_name;
  if (meta?.full_name) return meta.full_name.trim().split(/\s+/)[0] || meta.full_name;
  if (user?.email) return user.email.split("@")[0];
  return "User";
}

function getAvatarUrl(user) {
  const meta = user?.user_metadata;
  return meta?.avatar_url || meta?.picture || null;
}

export default function User({ user }) {
  const firstName = getFirstName(user);
  const avatarUrl = getAvatarUrl(user);

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-border shrink-0 ring-2 ring-border">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/20 text-accent font-semibold text-sm">
            {firstName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-lg font-semibold text-foreground truncate">
          {firstName}
        </p>
        <p className="text-sm text-muted truncate">{user?.email}</p>
      </div>
    </div>
  );
}
