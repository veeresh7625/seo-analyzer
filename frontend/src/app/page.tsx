"use client";

import { useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import {
  Image,
  Link,
  Heading,
  Globe,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";


import "react-circular-progressbar/dist/styles.css";
export default function Home() {

const [url, setUrl] = useState("");
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

const imageData = result
  ? [
      {
        name: "With ALT",
        value: result.images_with_alt,
      },
      {
        name: "Missing ALT",
        value: result.images_missing_alt,
      },
    ]
  : [];

const linkData = result
  ? [
      {
        name: "Internal",
        value: result.internal_links,
      },
      {
        name: "External",
        value: result.external_links,
      },
    ]
  : [];

  const headingData = result
  ? [
      { name: "H1", count: result.h1_count },
      { name: "H2", count: result.h2_count },
      { name: "H3", count: result.h3_count },
      { name: "H4", count: result.h4_count },
      { name: "H5", count: result.h5_count },
      { name: "H6", count: result.h6_count },
    ]
  : [];

async function downloadReport() {
  window.open("http://127.0.0.1:8000/download-pdf", "_blank");
}
async function analyzeWebsite() {
  if (!url) {
    alert("Please enter a website URL.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    console.log("HTTP Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);
      alert("Backend returned an error.");
      return;
    }

    const data = await response.json();

    console.log("Response Data:", data);

    setResult(data);
  } catch (err) {
    console.error("Fetch Error:", err);
    alert("Request failed. Check the console.");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <h1 className="text-3xl font-bold text-blue-500">
            NexusSEO
          </h1>

          <div className="flex gap-8 text-gray-300">
            <a href="#" className="hover:text-blue-400 transition">
              Dashboard
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              Features
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              Documentation
            </a>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition">
            Analyze Now
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <span className="px-5 py-2 rounded-full bg-blue-900/30 border border-blue-700 text-blue-300 text-sm">
          🚀 Live SEO Analysis
        </span>

        <h2 className="mt-8 text-6xl font-extrabold leading-tight max-w-5xl">
          Analyze any website
          <br />
          in <span className="text-blue-500">seconds</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-3xl text-xl">
          Analyze metadata, headings, images, links, Open Graph,
          Twitter Cards and generate a professional SEO report.
        </p>

        {/* URL Input */}
        <div className="mt-10 w-full max-w-3xl flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="https://example.com"
            className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-6 py-4 text-lg outline-none focus:border-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
           onClick={analyzeWebsite}
           disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition"
       >
          {loading ? "Analyzing..." : "Analyze Website"}
          </button>

        </div>

            </section>

      {result && (
  <section
  id="seo-report"
  className="max-w-6xl mx-auto px-6 py-12"
>

    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">

      <div className="flex items-center justify-between mb-8">

  <h2 className="text-3xl font-bold">
    SEO Report
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-slate-800 rounded-xl p-6">
    <p className="text-gray-400">Missing ALT</p>
    <h2 className="text-3xl font-bold text-red-400">
      {result.images_missing_alt}
    </h2>
  </div>

  <div className="bg-slate-800 rounded-xl p-6">
    <p className="text-gray-400">H1 Tags</p>
    <h2 className="text-3xl font-bold text-blue-400">
      {result.h1_count}
    </h2>
  </div>

  <div className="bg-slate-800 rounded-xl p-6">
    <p className="text-gray-400">Canonical</p>
    <h2 className="text-2xl font-bold">
      {result.canonical ? "✅ Yes" : "❌ No"}
    </h2>
  </div>

  <div className="bg-slate-800 rounded-xl p-6">
    <p className="text-gray-400">Robots</p>
    <h2 className="text-2xl font-bold">
      {result.robots ? "✅ Yes" : "❌ No"}
    </h2>
  </div>

</div>

  <div className="bg-blue-600 rounded-xl p-6">
    <p className="text-sm text-white/80">SEO Score</p>
    <h2 className="text-4xl font-bold">
      {result.seo_score}
    </h2>
  </div>

  <div className="bg-green-600 rounded-xl p-6">
    <p className="text-sm text-white/80">Internal Links</p>
    <h2 className="text-4xl font-bold">
      {result.internal_links}
    </h2>
  </div>

  <div className="bg-orange-500 rounded-xl p-6">
    <p className="text-sm text-white/80">External Links</p>
    <h2 className="text-4xl font-bold">
      {result.external_links}
    </h2>
  </div>

  <div className="bg-purple-600 rounded-xl p-6">
    <p className="text-sm text-white/80">Images</p>
    <h2 className="text-4xl font-bold">
      {result.total_images}
    </h2>
  </div>

</div>

  <button
    onClick={downloadReport}
    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold transition"
  >
    📄 Download PDF
  </button>

</div>

      {/* Screenshot */}
      {result.screenshot && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Website Screenshot
          </h3>

          <img
            src={result.screenshot}
            alt="Website Screenshot"
            className="w-full rounded-xl border border-slate-700 shadow-lg"
          />
        </div>
      )}

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* SEO Score */}
        <div className="bg-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
          <p className="text-gray-400 mb-6">
            SEO Score
          </p>

          <div className="w-40 h-40">
            <CircularProgressbar
              value={result.seo_score}
              text={`${result.seo_score}`}
              styles={buildStyles({
                textColor: "#ffffff",
                pathColor: "#2563eb",
                trailColor: "#1e293b",
              })}
            />
          </div>

          <p className="mt-6 text-xl font-bold">
          {result.seo_score >= 80
            ? "Excellent"
            : result.seo_score >= 60
            ? "Good"
            : "Needs Improvement"}
        </p>

        <div className="mt-3">
         <span
          className={`px-4 py-2 rounded-full font-bold text-lg ${
            result.seo_score >= 90
              ? "bg-green-600"
              : result.seo_score >= 80
              ? "bg-blue-600"
              : result.seo_score >= 70
              ? "bg-yellow-500 text-black"
              : result.seo_score >= 60
              ? "bg-orange-500"
              : "bg-red-600"
       }`}
  >
    Grade:{" "}
    {result.seo_score >= 90
      ? "A+"
      : result.seo_score >= 80
      ? "A"
      : result.seo_score >= 70
      ? "B"
      : result.seo_score >= 60
      ? "C"
      : "D"}
  </span>
</div>

      </div>

        {/* Title */}
        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">
            Title
          </p>

          <h3 className="text-xl font-bold">
            {result.title}
          </h3>
        </div>

        {/* Description */}
        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">
            Description
          </p>

          <p>{result.description}</p>
        </div>

        {/* Keywords */}
        <div className="bg-slate-800 rounded-xl p-6">
          <p className="text-gray-400">
            Keywords
          </p>

          <p>{result.keywords}</p>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <Image className="text-blue-400 mb-4" size={36} />
          <p className="text-gray-400">
            Images
          </p>
          <h2 className="text-4xl font-bold">
            {result.total_images}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <Link className="text-green-400 mb-4" size={36} />
          <p className="text-gray-400">
            Links
          </p>
          <h2 className="text-4xl font-bold">
            {result.total_links}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <Heading className="text-yellow-400 mb-4" size={36} />
          <p className="text-gray-400">
            H1 Tags
          </p>
          <h2 className="text-4xl font-bold">
            {result.h1_count}
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <Globe className="text-purple-400 mb-4" size={36} />
          <p className="text-gray-400">
            Language
          </p>
          <h2 className="text-3xl font-bold">
            {result.language || "N/A"}
          </h2>
        </div>

      </div>

      <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Image ALT Coverage
  </h2>

  <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Link Distribution
  </h2>

  <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Heading Distribution
  </h2>

  <div className="bg-slate-800 rounded-xl p-6 h-[420px]">

    <ResponsiveContainer width="100%" height="100%">

      <BarChart data={headingData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="count"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

  <div className="bg-slate-800 rounded-xl p-6 h-[420px]">

    <ResponsiveContainer width="100%" height="100%">

      <PieChart>

        <Pie
          data={linkData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >

          {linkData.map((entry, index) => (

            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

  <div className="bg-slate-800 rounded-xl p-6 h-[420px]">

    <ResponsiveContainer width="100%" height="100%">

      <PieChart>

        <Pie
          data={imageData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >

          {imageData.map((entry, index) => (

            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

      {/* Checklist */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          SEO Checklist
        </h2>

        <div className="space-y-4">

          {result.checks.map((check: any, index: number) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-5 flex items-center justify-between border border-slate-700"
            >

              <h3 className="font-semibold text-lg">
                {check.name}
              </h3>

              <div className="flex items-center gap-5">

                <span
                  className={`px-4 py-2 rounded-full font-bold text-sm ${
                    check.status === "PASS"
                      ? "bg-green-600 text-white"
                      : check.status === "WARNING"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {check.status}
                </span>

                <span className="text-blue-400 font-bold">
                  {check.points} pts
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    SEO Recommendations
  </h2>

  <div className="space-y-4">

    {result.recommendations.map(
      (item: string, index: number) => (

        <div
          key={index}
          className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex items-start gap-4"
        >

          <div className="text-yellow-400 text-3xl">
            ⚡
          </div>

          <div>

            <h3 className="font-bold">
              Recommendation
            </h3>

            <p className="text-gray-300">
              {item}
            </p>

          </div>

        </div>

      )
    )}

  </div>

</div>

    </div>

  </section>
      )}

    </main>
  );
}