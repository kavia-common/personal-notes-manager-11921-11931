"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Minimal settings placeholder. */
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Settings</h1>
      <div className="text-[var(--color-secondary)]">No settings available yet.</div>
    </div>
  );
}
