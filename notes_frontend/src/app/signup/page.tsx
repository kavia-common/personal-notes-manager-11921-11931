"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function SignupPage() {
  /** Signup form for demo auth. */
  const { user, signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (user) router.replace("/notes");
  }, [user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, pwd);
    router.replace("/notes");
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-medium mb-4">Sign up</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="input"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            className="input"
            type="password"
            required
            placeholder="••••••••"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            aria-label="Password"
          />
        </div>
        <button className="btn btn-primary w-full" type="submit">
          Create account
        </button>
      </form>
      <div className="mt-3 text-sm">
        Have an account?{" "}
        <a className="text-[var(--color-accent)] underline" href="/login">
          Login
        </a>
      </div>
    </div>
  );
}
