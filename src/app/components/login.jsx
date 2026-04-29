"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createClient } from "../../../lib/client";

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOauth = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  const handleEmaillogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else router.push("/home");
    setLoading(false);
  };

  async function handleForgotPassword() {
    if (!email) {
      setError("Enter your email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset-password`,
    });

    if (error) setError(error.message);
    else setMessage("Check your email for a password reset link!");
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="w-95 p-10 bg-[#111] border border-[#222] rounded-2xl">
        {/* Logo */}
        {/* <p className="font-serif italic text-white text-xl mb-7">acme.</p> */}

        {/* Heading */}
        <h1 className="text-2xl font-medium text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-[#555] mt-1 mb-7">Good to see you again</p>

        {/* OAuth */}
        <button
          onClick={() => handleOauth("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#ccc] text-sm hover:bg-[#222] hover:text-white transition-colors mb-2.5 cursor-pointer"
        >
          <img
            src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
            alt="google icon"
            className="h-4 w-4"
          />
          Continue with Google
        </button>
        <button
          onClick={() => handleOauth("github")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#ccc] text-sm hover:bg-[#222] hover:text-white transition-colors cursor-pointer"
        >
          <img
            src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
            alt="github icon"
            className=" bg-white rounded-full  h-4 w-4"
          />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#222]" />
          <span className="text-xs text-[#444]">or continue with email</span>
          <div className="flex-1 h-px bg-[#222]" />
        </div>

        {/* Fields */}
        <div className="mb-3.5">
          <label className="block text-xs text-[#666] font-medium mb-1.5">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@gmail.com"
            className="w-full px-3.5 py-3 bg-[#141414] border border-[#242424] rounded-xl text-[#e0e0e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#444] transition-colors"
          />
        </div>
        <div className="mb-1.5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs text-[#666] font-medium">
              Password
            </label>
            <button
              onClick={handleForgotPassword}
              className="text-xs text-[#555] hover:text-[#999] transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••••"
            className="w-full px-3.5 py-3 bg-[#141414] border border-[#242424] rounded-xl text-[#e0e0e0] text-sm placeholder-[#3a3a3a] outline-none focus:border-[#444] transition-colors"
          />
        </div>
        {/* errors */}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* messages */}

        {message && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleEmaillogin}
          disabled={loading}
          className="w-full mt-4 py-3 bg-white text-[#0a0a0a] rounded-xl text-sm font-medium hover:bg-[#e8e8e8] transition-colors cursor-pointer"
        >
          {loading ? "...Loading" : "Log in"}
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-[#444]">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-[#888] hover:text-[#ccc] transition-colors ml-0.5 cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
