"use client";

import Link from "next/link";
import { Note } from "@/lib/store";

// PUBLIC_INTERFACE
export default function NoteCard({ note }: { note: Note }) {
  /** Compact note preview card. */
  return (
    <Link
      href={`/notes/${note.id}`}
      className="block border rounded-lg p-4 hover:shadow-sm"
      style={{ borderColor: "var(--color-border)", background: "#fff" }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium">{note.title || "Untitled"}</h3>
        <div className="text-xs text-[var(--color-secondary)]">
          {new Date(note.updatedAt).toLocaleString()}
        </div>
      </div>
      {note.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {note.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}
      {note.content && (
        <p className="mt-2 text-sm text-[var(--color-secondary)] line-clamp-3">
          {note.content}
        </p>
      )}
    </Link>
  );
}
