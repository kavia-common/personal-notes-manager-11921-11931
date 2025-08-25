"use client";

import { useAuth } from "@/lib/auth";
import { useNote } from "@/lib/store";
import TagInput from "@/components/TagInput";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// PUBLIC_INTERFACE
export default function NoteDetailPage() {
  /** Edit an existing note. */
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { note, update, remove, ready } = useNote(id);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    }
  }, [note]);

  const save = () => {
    if (!id) return;
    update(id, { title, content, tags });
  };

  const del = () => {
    if (!id) return;
    remove(id);
    router.replace("/notes");
  };

  const meta = useMemo(() => {
    if (!note) return null;
    return (
      <div className="text-xs text-[var(--color-secondary)]">
        Updated {new Date(note.updatedAt).toLocaleString()}
      </div>
    );
  }, [note]);

  if (!ready) {
    return <div className="text-[var(--color-secondary)]">Loading…</div>;
  }

  if (!note) {
    return (
      <div>
        <div className="mb-3">Note not found.</div>
        <button className="btn" onClick={() => router.replace("/notes")}>
          Back to Notes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn" onClick={() => router.back()}>
          Back
        </button>
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
        <button className="btn" onClick={del}>
          Delete
        </button>
        <div className="flex-1" />
        {meta}
      </div>

      <div className="grid gap-3">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Title"
        />
        <textarea
          className="input"
          placeholder="Write your note..."
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Content"
        />
        <div>
          <div className="text-sm mb-2 text-[var(--color-secondary)]">Tags</div>
          <TagInput tags={tags} onChange={setTags} />
        </div>
      </div>
    </div>
  );
}
