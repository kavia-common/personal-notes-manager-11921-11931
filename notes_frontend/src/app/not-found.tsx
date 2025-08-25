import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-[var(--color-secondary)]">The page you are looking for does not exist.</p>
        <Link className="btn mt-2 inline-flex" href="/notes">
          Go to Notes
        </Link>
      </div>
    </main>
  );
}
