import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("ai_logs")
        .select("*")
        .order("id", { ascending: false });
      if (!error) setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Logs</h1>
        <p className="text-gray-400 mb-8">{logs.length} AI interactions logged</p>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400">No logs found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-rose-500/50 transition-colors"
                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full border border-rose-500/30">
                      Log #{log.id}
                    </span>
                    <span className="text-gray-500 text-xs">
                      Product ID: {log.product_id}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">{log.created_at}</span>
                </div>

                {/* Response preview */}
                <div className="flex gap-3 flex-wrap">
                  {log.response?.primary_category && (
                    <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {log.response.primary_category}
                    </span>
                  )}
                  {log.response?.sub_category && (
                    <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {log.response.sub_category}
                    </span>
                  )}
                  {log.response?.sustainability_filters?.slice(0, 3).map((f) => (
                    <span key={f} className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                      ♻ {f}
                    </span>
                  ))}
                </div>

                {/* Expanded view */}
                {expandedLog === log.id && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Prompt</p>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">{log.prompt}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Response</p>
                      <pre className="text-sm text-green-400 overflow-x-auto">
                        {JSON.stringify(log.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-600 mt-3">
                  {expandedLog === log.id ? "▲ Click to collapse" : "▼ Click to expand prompt & response"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}