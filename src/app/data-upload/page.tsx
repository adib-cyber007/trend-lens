"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Play,
  BarChart3,
  Table,
} from "lucide-react";

interface UploadedFile {
  name: string;
  size: string;
  rows: number;
  columns: string[];
  preview: Record<string, string>[];
}

const sampleData: Record<string, string>[] = [
  { date: "2026-03-25", topic: "AI Ethics", platform: "Twitter/X", engagement: "12400", sentiment: "0.72" },
  { date: "2026-03-25", topic: "Climate Tech", platform: "LinkedIn", engagement: "8900", sentiment: "0.85" },
  { date: "2026-03-26", topic: "AI Ethics", platform: "Reddit", engagement: "15600", sentiment: "0.41" },
  { date: "2026-03-26", topic: "Remote Work", platform: "LinkedIn", engagement: "22100", sentiment: "0.33" },
  { date: "2026-03-27", topic: "Climate Tech", platform: "Instagram", engagement: "31200", sentiment: "0.91" },
  { date: "2026-03-27", topic: "AI Ethics", platform: "YouTube", engagement: "9800", sentiment: "0.58" },
  { date: "2026-03-28", topic: "Remote Work", platform: "Twitter/X", engagement: "18700", sentiment: "0.29" },
  { date: "2026-03-28", topic: "Climate Tech", platform: "TikTok", engagement: "45200", sentiment: "0.88" },
];

interface AnalysisResult {
  topic: string;
  totalEngagement: number;
  avgSentiment: number;
  platforms: number;
  viralProbability: number;
  recommendation: string;
}

export default function DataUploadPage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[] | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        const lines = text.split("\n").filter((l) => l.trim());
        const headers = lines[0].split(",").map((h) => h.trim());
        const rows = lines.slice(1).map((line) => {
          const values = line.split(",");
          const row: Record<string, string> = {};
          headers.forEach((h, i) => (row[h] = values[i]?.trim() || ""));
          return row;
        });

        setUploadedFile({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          rows: rows.length,
          columns: headers,
          preview: rows.slice(0, 10),
        });
        setAnalysisResults(null);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const loadSampleData = () => {
    setUploadedFile({
      name: "sample_trends.csv",
      size: "2.4 KB",
      rows: sampleData.length,
      columns: ["date", "topic", "platform", "engagement", "sentiment"],
      preview: sampleData,
    });
    setAnalysisResults(null);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const data = uploadedFile?.preview || sampleData;
      const topicMap = new Map<string, { engagement: number; sentiment: number; platforms: Set<string>; count: number }>();

      data.forEach((row) => {
        const topic = row.topic || row.Topic || "Unknown";
        const existing = topicMap.get(topic) || { engagement: 0, sentiment: 0, platforms: new Set(), count: 0 };
        existing.engagement += parseInt(row.engagement || row.Engagement || "0");
        existing.sentiment += parseFloat(row.sentiment || row.Sentiment || "0.5");
        existing.platforms.add(row.platform || row.Platform || "Unknown");
        existing.count++;
        topicMap.set(topic, existing);
      });

      const results: AnalysisResult[] = Array.from(topicMap.entries()).map(([topic, d]) => {
        const avgSentiment = d.sentiment / d.count;
        const viralProb = Math.min(
          95,
          Math.round(
            (d.engagement / 10000) * 20 + avgSentiment * 40 + d.platforms.size * 10
          )
        );
        return {
          topic,
          totalEngagement: d.engagement,
          avgSentiment: Math.round(avgSentiment * 100),
          platforms: d.platforms.size,
          viralProbability: viralProb,
          recommendation:
            viralProb > 70
              ? "🟢 Ride this trend"
              : viralProb > 50
              ? "🟡 Monitor closely"
              : "🔴 Avoid — low potential",
        };
      });

      setAnalysisResults(results.sort((a, b) => b.viralProbability - a.viralProbability));
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-lg font-bold">Data Upload & Analysis</h1>
        <p className="text-xs text-[#6b6580] mt-0.5">
          Upload your CSV, JSON, or text data and run it through our Trend Radar + Viral Forecast pipeline
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`dropzone p-10 text-center ${isDragging ? "active" : ""}`}
      >
        <Upload className="w-10 h-10 text-[#8b5cf6]/60 mx-auto mb-3" />
        <p className="text-sm text-[#9b97b0] mb-1">Drag & drop your file here</p>
        <p className="text-[11px] text-[#6b6580] mb-4">
          Supports CSV (columns: date, topic, platform, engagement, sentiment) • JSON • TXT
        </p>
        <div className="flex items-center justify-center gap-3">
          <label className="cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#f97316] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Browse Files
            <input type="file" accept=".csv,.json,.txt" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            onClick={loadSampleData}
            className="px-4 py-2 rounded-lg bg-[#1a1825] text-sm text-[#9b97b0] border border-[#2e2a40] hover:border-[#8b5cf6]/30 transition-colors"
          >
            Load Sample Data
          </button>
        </div>
      </motion.div>

      {/* File Info */}
      <AnimatePresence>
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{uploadedFile.name}</p>
                  <p className="text-[11px] text-[#6b6580]">
                    {uploadedFile.size} • {uploadedFile.rows} rows • {uploadedFile.columns.length} columns
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-2 rounded-lg hover:bg-[#1a1825] transition-colors"
                >
                  <Table className="w-4 h-4 text-[#9b97b0]" />
                </button>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setAnalysisResults(null);
                  }}
                  className="p-2 rounded-lg hover:bg-[#1a1825] transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            {/* Columns */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {uploadedFile.columns.map((col) => (
                <span
                  key={col}
                  className="px-2 py-0.5 rounded-md bg-[#1a1825] text-[11px] text-[#9b97b0] border border-[#2e2a40]"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Preview Table */}
            {showPreview && (
              <div className="overflow-x-auto rounded-xl border border-[#2e2a40] mb-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#1a1825]">
                      {uploadedFile.columns.map((col) => (
                        <th key={col} className="px-3 py-2 text-left text-[#9b97b0] font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFile.preview.map((row, i) => (
                      <tr key={i} className="border-t border-[#2e2a40]/50 hover:bg-[#1a1825]/50">
                        {uploadedFile.columns.map((col) => (
                          <td key={col} className="px-3 py-2 text-[#e8e6f0]">
                            {row[col] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#f97316] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Analysis Pipeline
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="section-header">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#8b5cf6]" />
                Analysis Results
              </h2>
            </div>

            {analysisResults.map((result, i) => (
              <motion.div
                key={result.topic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">{result.topic}</h3>
                  <span className="text-sm">{result.recommendation}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[11px] text-[#6b6580]">Total Engagement</p>
                    <p className="text-lg font-bold text-[#f97316]">
                      {result.totalEngagement.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6b6580]">Avg Sentiment</p>
                    <p className={`text-lg font-bold ${result.avgSentiment > 60 ? "text-emerald-400" : result.avgSentiment > 40 ? "text-yellow-400" : "text-red-400"}`}>
                      {result.avgSentiment}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6b6580]">Platforms</p>
                    <p className="text-lg font-bold text-[#06b6d4]">{result.platforms}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6b6580]">Viral Probability</p>
                    <p className="text-lg font-bold text-[#8b5cf6]">{result.viralProbability}%</p>
                  </div>
                </div>
                <div className="mt-3 progress-track">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.viralProbability}%` }}
                    transition={{ duration: 1.5 }}
                    className={`progress-fill bg-gradient-to-r ${
                      result.viralProbability > 70
                        ? "from-[#10b981] to-[#06b6d4]"
                        : result.viralProbability > 50
                        ? "from-[#f59e0b] to-[#f97316]"
                        : "from-[#ef4444] to-[#f97316]"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
