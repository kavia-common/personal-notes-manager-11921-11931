"use client";

import { useAuth } from "@/lib/auth";
import { useNotes } from "@/lib/store";
import TagInput from "@/components/TagInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function NewNotePage() {
  /** Create a new note. */
  const { user } = useAuth();
  const router = useRouter();
  const { create } = useNotes();

  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  const save = () => {
    const n = create({ title, content, tags });
    if (n) router.replace(`/notes/${n.id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className="btn" onClick={() => router.back()}>
          Back
        </button>
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
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
