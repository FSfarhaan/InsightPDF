import { useState } from 'react';
import axios from 'axios';

import WordCloudChart from './WordCloudChart';
import StructureChart from './StructureChart';
import SectionDistributionChart from './SectionDistributionChart';
import CitationChart from './CitationChart';


export default function ResearchPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [summary, setSummary]   = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading,  setLoading]  = useState(false);
  const [stage,    setStage]    = useState('');

  const [chatQ, setChatQ]       = useState('');
  const [chatA, setChatA]       = useState('');
  const [chatBusy, setChatBusy] = useState(false);

  const handleFile = e => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setFileName(f.name); }
  };

  const upload = async e => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const { data } = await axios.post(`${API}/api/researchpaper`, form, {
        onUploadProgress: p => setProgress(Math.round(p.loaded * 100 / p.total))
      });
      setSummary(data);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally { setLoading(false); }
  };

  const ask = async e => {
    e.preventDefault();
    if (!chatQ.trim()) return;
    setChatBusy(true);
    try {
      const { data } = await axios.post(`${API}/api/chat`, {
        query: chatQ,
        context_id: summary?.context_id
      });
      setChatA(data.answer);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally { setChatBusy(false); }
  };

  // --- word‑cloud helper ----------------------------------
  const wordsData = (() => {
    if (!summary?.key_points) return [];
    const count = {};
    summary.key_points.forEach(pt => pt.split(/\s+/).forEach(w => {
      const k = w.toLowerCase().replace(/[^a-z]/g, '');
      if (k) count[k] = (count[k] || 0) + 1;
    }));
    return Object.entries(count).map(([word, n]) => ({ word, count: n }));
  })();

  /* JSX ----------------------------------------------------*/
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8">Research Paper Analyzer</h1>

      {/* upload ------------------------------------------------*/}
      <form onSubmit={upload} className="mb-8 space-y-4">
        <input type="file" accept="application/pdf" onChange={handleFile} />
        <button disabled={!file || loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
          {loading ? `Uploading ${progress}%` : 'Upload & Summarize'}
        </button>
        {stage && <p>{stage}</p>}
      </form>

      {/* summary ----------------------------------------------*/}
      {summary && (
        <>
          <section className="space-y-2 mb-10">
            <h2 className="text-xl font-semibold">{summary.title}</h2>
            <p>{summary.summary}</p>
          </section>

          {/* visualisations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="h-72"><WordCloudChart wordsData={wordsData} /></div>
            <div className="h-72"><StructureChart   summaryData={summary} /></div>
            <div className="h-72"><CitationChart   citationData={summary.citation_data || []} /></div>
            <div className="h-72"><SectionDistributionChart summaryData={summary} /></div>
          </div>
        </>
      )}

      {/* chat -------------------------------------------------*/}
      {summary && (
        <form onSubmit={ask} className="space-y-4">
          <textarea value={chatQ} onChange={e=>setChatQ(e.target.value)} rows={3}
            className="w-full border rounded p-2" placeholder="Ask a question about the paper"/>
          <button disabled={chatBusy} className="px-4 py-2 bg-green-600 text-white rounded">
            {chatBusy ? 'Thinking…' : 'Ask'}
          </button>
          {chatA && <p className="mt-4 p-4 bg-gray-100 rounded">{chatA}</p>}
        </form>
      )}
    </div>
  );
}