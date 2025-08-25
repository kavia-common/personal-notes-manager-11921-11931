"use client";

import { useAuth } from "@/lib/auth";
import { useNotes } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// PUBLIC_INTERFACE
export default function TagsPage() {
  /** List of tags and quick navigation to filtered notes. */
  const { user } = useAuth();
  const router = useRouter();
  const { allTags, ready } = useNotes();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!ready) return <div className="text-[var(--color-secondary)]">Loading…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Tags</h1>
      {allTags.length === 0 ? (
        <div className="text-[var(--color-secondary)]">No tags yet.</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <button
              key={t}
              className="tag"
              onClick={() => router.push(`/notes?tag=${encodeURIComponent(t)}`)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
