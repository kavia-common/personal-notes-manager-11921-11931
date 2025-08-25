"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth";

// Client-only top bar
function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div
      style={{
        borderBottom: "1px solid var(--color-border)",
        background: "#fff",
      }}
      className="w-full"
    >
      <div className="container px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg"
            style={{ background: "var(--color-accent)" }}
            aria-hidden
          />
          <span className="text-sm text-[var(--color-secondary)]">Notes</span>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                className="btn"
                onClick={() => router.push("/notes/new")}
                aria-label="Create note"
              >
                New
              </button>
              <button className="btn" onClick={() => router.push("/notes")} aria-label="All notes">
                All
              </button>
              <button className="btn" onClick={() => router.push("/tags")} aria-label="Tags">
                Tags
              </button>
              <div className="w-px h-6 bg-[var(--color-border)]" />
              <span className="text-sm text-[var(--color-secondary)]">{user.email}</span>
              <button className="btn" onClick={logout} aria-label="Logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn" href="/login" aria-label="Login">
                Login
              </Link>
              <Link className="btn btn-primary" href="/signup" aria-label="Sign up">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Client-only sidebar
function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const Item = ({
    href,
    label,
    active,
  }: {
    href: string;
    label: string;
    active: boolean;
  }) => (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md"
      style={{
        color: active ? "#fff" : "var(--color-primary)",
        background: active ? "var(--color-accent)" : "transparent",
      }}
    >
      {label}
    </Link>
  );

  return (
    <aside
      className="hidden md:block"
      style={{
        width: 240,
        borderRight: "1px solid var(--color-border)",
        background: "#fff",
      }}
    >
      <div className="p-4">
        <div className="mb-3 text-xs uppercase tracking-wide text-[var(--color-secondary)]">
          Navigation
        </div>
        <nav className="flex flex-col gap-1">
          <Item href="/notes" label="All Notes" active={pathname.startsWith("/notes")} />
          <Item href="/tags" label="Tags" active={pathname.startsWith("/tags")} />
          <Item href="/settings" label="Settings" active={pathname.startsWith("/settings")} />
        </nav>
      </div>
    </aside>
  );
}

// PUBLIC_INTERFACE
export default function ClientShell({ children }: { children: React.ReactNode }) {
  /** Client shell providing AuthProvider, TopBar, Sidebar and main layout. */
  const pathname = usePathname();
  const authRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <TopBar />
        <div className="flex flex-1">
          {!authRoute && <Sidebar />}
          <main className="flex-1">
            <div className="container px-4 py-4">{children}</div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
