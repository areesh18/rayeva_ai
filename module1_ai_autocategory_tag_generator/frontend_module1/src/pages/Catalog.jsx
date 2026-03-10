import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const CATEGORIES = [
  "All",
  "Personal Care",
  "Kitchen & Dining",
  "Home & Living",
  "Fashion & Apparel",
  "Baby & Kids",
  "Office & Stationery",
  "Food & Beverages",
  "Garden & Outdoors",
  "Pet Care",
  "Travel & Accessories",
];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (!error) {
        setProducts(data);
        // apply filters immediately on fetch
        let result = data;
        if (activeCategory !== "All") {
          result = result.filter((p) => p.primary_category === activeCategory);
        }
        if (search.trim()) {
          result = result.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.seo_tags.some((t) =>
                t.toLowerCase().includes(search.toLowerCase()),
              ),
          );
        }
        setFiltered(result);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [activeCategory, search]);
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
        <p className="text-gray-400 mb-8">
          {products.length} products indexed by AI
        </p>

        {/* Search */}
        <input
          placeholder="Search by name or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 mb-6"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-rose-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No products found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Sub Category</th>
                  <th className="px-4 py-3 text-left">SEO Tags</th>
                  <th className="px-4 py-3 text-left">Sustainability</th>
                  <th className="px-4 py-3 text-left">Saved At</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    onClick={() =>
                      setExpandedRow(expandedRow === p.id ? null : p.id)
                    }
                    className={`cursor-pointer transition-colors ${
                      i % 2 === 0 ? "bg-gray-900/50" : "bg-gray-900/20"
                    } hover:bg-gray-800`}
                  >
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {p.primary_category}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {p.sub_category}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(expandedRow === p.id
                          ? p.seo_tags
                          : p.seo_tags.slice(0, 3)
                        ).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {expandedRow !== p.id && p.seo_tags.length > 3 && (
                          <span className="text-rose-400 text-xs cursor-pointer">
                            +{p.seo_tags.length - 3} click to expand
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.sustainability_filters.slice(0, 2).map((f) => (
                          <span
                            key={f}
                            className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30"
                          >
                            {f}
                          </span>
                        ))}
                        {p.sustainability_filters.length > 2 && (
                          <span className="text-gray-500 text-xs">
                            +{p.sustainability_filters.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {p.created_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
