"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotes } from "@/lib/store";
import SearchBar from "@/components/SearchBar";
import NoteCard from "@/components/NoteCard";
import EmptyState from "@/components/EmptyState";

// PUBLIC_INTERFACE
export default function NotesIndexPage() {
  /** All notes page with search and tag filter. */
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const qParam = searchParams.get("q") || "";
  const tagParam = searchParams.get("tag") || "";

  const { notes, allTags, ready, create } = useNotes({ q: qParam, tag: tagParam });
  const [q, setQ] = useState(qParam);
  const [tag, setTag] = useState(tagParam);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  useEffect(() => {
    setQ(qParam);
    setTag(tagParam);
  }, [qParam, tagParam]);

  const applyFilter = (nextQ: string, nextTag: string) => {
    const params = new URLSearchParams();
    if (nextQ) params.set("q", nextQ);
    if (nextTag) params.set("tag", nextTag);
    router.replace(`/notes?${params.toString()}`);
  };

  const createNote = React.useCallback(() => {
    const n = create({ title: "Untitled", content: "", tags: [] });
    if (n) router.push(`/notes/${n.id}`);
  }, [create, router]);

  const content = useMemo(() => {
    if (!ready) {
      return <div className="text-[var(--color-secondary)]">Loading…</div>;
    }
    if (notes.length === 0) {
      return (
        <EmptyState
          title="No notes yet"
          action={
            <button className="btn btn-primary" onClick={createNote}>
              Create your first note
            </button>
          }
        />
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {notes.map((n) => (
          <NoteCard key={n.id} note={n} />
        ))}
      </div>
    );
  }, [notes, ready, createNote]);

  return (
    <div className="space-y-4">
      <div
        className="border rounded-lg p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between"
        style={{ borderColor: "var(--color-border)", background: "#fff" }}
      >
        <div className="flex-1">
          <SearchBar
            defaultValue={q}
            onSearch={(value) => {
              setQ(value);
              applyFilter(value, tag);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="input"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              applyFilter(q, e.target.value);
            }}
            aria-label="Filter by tag"
            style={{ width: 200 }}
          >
            <option value="">All tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={createNote}>
            New
          </button>
        </div>
      </div>

      {content}
    </div>
  );
}
