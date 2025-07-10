"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function ApiPlayground() {
  const [inputKey, setInputKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyName, setKeyName] = useState(null);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setKeyName(null);
    setShowError(false);
    // Query Supabase for the key
    const { data, error } = await supabase
      .from("api_keys")
      .select("name")
      .eq("value", inputKey.trim())
      .single();
    setLoading(false);
    if (data && data.name) {
      setKeyName(data.name);
    } else {
      setError("Invalid API key. Please try again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">API Playground</h1>
        {!keyName && (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 animate-fade-in">
            <label className="w-full">
              <span className="block mb-2 text-gray-700 font-medium">Enter your API Key</span>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="API Key"
                value={inputKey}
                onChange={e => setInputKey(e.target.value)}
                required
                autoFocus
              />
            </label>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded shadow hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
        {keyName && (
          <div className="w-full flex flex-col items-center animate-fade-in-up">
            <div className="text-green-600 text-3xl font-bold mb-2">✔️</div>
            <div className="text-lg text-gray-700 mb-1">API Key is valid!</div>
            <div className="text-blue-700 font-semibold text-xl mb-4 transition-all duration-500">Key Name: <span className="underline">{keyName}</span></div>
            <button
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
              onClick={() => { setKeyName(null); setInputKey(""); }}
            >
              Try another key
            </button>
          </div>
        )}
        {/* Animated error popup */}
        {showError && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded shadow-lg animate-fade-in-down">
            {error}
          </div>
        )}
      </div>
      {/* Animations */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.5s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(.39,.575,.56,1.000);
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.4s cubic-bezier(.39,.575,.56,1.000);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 