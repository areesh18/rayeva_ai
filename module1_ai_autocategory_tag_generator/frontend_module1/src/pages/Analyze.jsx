import { useState } from "react";

export default function Analyze() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Analyze Product</h1>
        <p className="text-gray-400 mb-8">
          Enter a product description and let AI auto-categorize it.
        </p>

        <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 border border-gray-800">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Product Name (optional)</label>
            <input
              placeholder="e.g. Bamboo Toothbrush"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Product Description (required)</label>
            <textarea
              placeholder="Describe the product in detail — materials, packaging, certifications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 resize-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Analyzing... (may take a moment)" : "Analyze Product"}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-rose-400">AI Result</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Primary Category</p>
                <p className="font-semibold">{result.primary_category}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Sub Category</p>
                <p className="font-semibold">{result.sub_category}</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">SEO Tags</p>
              <div className="flex flex-wrap gap-2">
                {result.seo_tags.map((tag) => (
                  <span key={tag} className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">Sustainability Filters</p>
              <div className="flex flex-wrap gap-2">
                {result.sustainability_filters.map((f) => (
                  <span key={f} className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                    ♻ {f}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500">Saved at {result.created_at}</p>
          </div>
        )}
      </div>
    </div>
  );
}