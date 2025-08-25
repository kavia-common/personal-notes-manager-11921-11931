"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace("/notes");
    else router.replace("/login");
  }, [user, loading, router]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-[var(--color-secondary)]">Loading…</div>
    </main>
  );
}
