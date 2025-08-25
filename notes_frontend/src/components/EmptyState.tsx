"use client";

// PUBLIC_INTERFACE
export default function EmptyState({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  /** Generic minimal empty state. */
  return (
    <div
      className="border rounded-lg p-8 text-center"
      style={{ borderColor: "var(--color-border)", background: "#fff" }}
    >
      <div className="text-[var(--color-secondary)]">{title}</div>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
