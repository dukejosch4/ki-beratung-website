"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/intern/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/intern/leads");
      } else {
        setError("Falsches Passwort");
      }
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center pl-0">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-white/60" />
          </div>
          <h1 className="text-2xl font-semibold text-white">veqtis intern</h1>
          <p className="text-sm text-white/40 mt-2">
            Zugang zum Lead-Finder Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
            autoFocus
          />

          {error && (
            <p className="text-sm text-red-400/80 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
