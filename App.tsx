
import React, { useState, useEffect, useCallback } from 'react';
import { SCENARIOS } from './constants';
import { Scenario, LogicResult } from './types';
import CodeBlock from './components/CodeBlock';

const App: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [inputValue, setInputValue] = useState<string | number>(SCENARIOS[0].defaultValue);
  const [result, setResult] = useState<LogicResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runLogic = useCallback(() => {
    setLoading(true);
    
    // Simulasi delay singkat untuk feel "eksekusi" program
    setTimeout(() => {
      let logicOutput = '';
      let conditionName = '';
      let explanation = '';
      let highlights: number[] = [0];

      const val = activeScenario.inputType === 'number' ? Number(inputValue) : String(inputValue).toLowerCase();

      if (activeScenario.id === 'voting') {
        const nVal = Number(val);
        if (nVal >= 17) {
          logicOutput = "✅ Anda diperbolehkan memilih!";
          conditionName = "Umur >= 17 (IF)";
          explanation = "Karena nilai variabel lebih besar atau sama dengan 17, kondisi IF terpenuhi. Program menjalankan baris di dalam kurung kurawal pertama.";
          highlights = [0, 2, 3];
        } else if (nVal >= 13) {
          logicOutput = "🧒 Anda remaja, tapi belum cukup umur memilih.";
          conditionName = "Umur >= 13 (ELSE IF)";
          explanation = "Kondisi pertama (IF) gagal karena umur < 17. Namun, kondisi kedua (ELSE IF) terpenuhi karena umur minimal 13 tahun.";
          highlights = [0, 4, 5];
        } else {
          logicOutput = "👶 Maaf, Anda masih kategori anak-anak.";
          conditionName = "Lainnya (ELSE)";
          explanation = "Kedua kondisi di atas gagal. Program secara otomatis menjalankan blok ELSE sebagai pilihan terakhir.";
          highlights = [0, 6, 7, 8];
        }
      } else if (activeScenario.id === 'grading') {
        const nVal = Number(val);
        if (nVal >= 90) {
          logicOutput = "🏆 Sangat Memuaskan! Nilai Anda A.";
          conditionName = "Nilai >= 90 (IF)";
          explanation = "Input nilai memenuhi syarat tertinggi (minimal 90). Blok kode IF dieksekusi dan blok lainnya diabaikan.";
          highlights = [0, 2, 3];
        } else if (nVal >= 75) {
          logicOutput = "🌟 Selamat! Anda Lulus dengan Nilai B.";
          conditionName = "Nilai >= 75 (ELSE IF)";
          explanation = "Nilai di bawah 90 tapi masih di atas atau sama dengan 75. Ini memicu blok ELSE IF untuk berjalan.";
          highlights = [0, 4, 5];
        } else {
          logicOutput = "📚 Semangat! Nilai C, Perlu Remedial.";
          conditionName = "Lainnya (ELSE)";
          explanation = "Karena nilai tidak mencapai standar minimal 75, program jatuh ke pilihan terakhir yaitu blok ELSE.";
          highlights = [0, 6, 7, 8];
        }
      } else if (activeScenario.id === 'shopping') {
        const nVal = Number(val);
        if (nVal > 100000) {
          logicOutput = "🎫 Selamat! Anda mendapatkan kupon diskon.";
          conditionName = "Total > 100.000 (IF)";
          explanation = "Operator '>' mengecek apakah nilai benar-benar lebih besar dari 100rb. Karena benar, hadiah diberikan.";
          highlights = [0, 2, 3];
        } else {
          logicOutput = "⚪ Tidak ada hadiah. (Kondisi IF Salah)";
          conditionName = "False - Blok IF diabaikan";
          explanation = "Kondisi IF bernilai 'false' (salah). Karena tidak ada blok ELSE, program melewati bagian ini dan lanjut ke baris terakhir.";
          highlights = [0, 2, 4];
        }
      } else if (activeScenario.id === 'weather') {
        if (val === 'hujan') {
          logicOutput = "☔ Bawa payung ya!";
          conditionName = "Cuaca === 'hujan' (IF)";
          explanation = "Operator '===' membandingkan teks secara persis. Teks yang dimasukkan cocok dengan syarat 'hujan'.";
          highlights = [0, 2, 3];
        } else {
          logicOutput = "☀️ Pakai kacamata hitam!";
          conditionName = "Lainnya (ELSE)";
          explanation = "Teks yang dimasukkan tidak sama dengan 'hujan'. Program menjalankan blok ELSE untuk kondisi cuaca lainnya.";
          highlights = [0, 4, 5, 6];
        }
      }

      setResult({
        output: logicOutput,
        conditionMet: conditionName,
        explanation: explanation,
        highlightLines: highlights
      });
      setLoading(false);
    }, 400);
  }, [activeScenario, inputValue]);

  useEffect(() => {
    setInputValue(activeScenario.defaultValue);
    setResult(null);
  }, [activeScenario]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-slate-50">
      <header className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          JS <span className="text-yellow-500">Logic</span> Lab
        </h1>
        <p className="text-slate-600 text-lg">
          Kuasai dasar-dasar percabangan JavaScript dengan cara yang seru dan interaktif.
        </p>
      </header>

      <main className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
              <span className="p-1 bg-yellow-100 text-yellow-600 rounded">1</span> 
              Pilih Skenario
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(s)}
                  className={`p-3 text-sm font-semibold rounded-xl transition-all border-2 ${
                    activeScenario.id === s.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-yellow-200 hover:bg-yellow-50'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold mb-2 text-slate-800 flex items-center gap-2">
              <span className="p-1 bg-yellow-100 text-yellow-600 rounded">2</span>
              Input Data
            </h2>
            <p className="text-slate-500 text-sm mb-4">{activeScenario.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type={activeScenario.inputType}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeScenario.placeholder}
                  className="w-full bg-white border-2 border-slate-300 text-slate-900 p-3 rounded-xl outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all font-medium placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <button
                onClick={runLogic}
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-xl shadow-md transform active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-w-[160px]"
              >
                {loading ? 'Memproses...' : 'Jalankan Kode'}
              </button>
            </div>
          </section>

          {result && (
            <section className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-4 text-slate-800">Hasil Output</h2>
              <div className={`border-2 p-6 rounded-xl mb-4 text-center shadow-inner ${
                result.output.includes("Tidak ada") ? 'bg-slate-50 border-slate-100' : 'bg-green-50 border-green-100'
              }`}>
                <span className="text-4xl block mb-2">{result.output.split(' ')[0]}</span>
                <p className={`text-2xl font-black mb-1 ${
                  result.output.includes("Tidak ada") ? 'text-slate-400' : 'text-green-900'
                }`}>{result.output.split(' ').slice(1).join(' ')}</p>
                <div className={`mt-2 inline-block px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest ${
                   result.output.includes("Tidak ada") ? 'bg-slate-200 text-slate-500' : 'bg-green-200/50 text-green-800'
                }`}>
                  Kondisi: {result.conditionMet}
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-xl text-slate-200 relative overflow-hidden border-l-4 border-yellow-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">📝</span>
                  <span className="text-[10px] text-yellow-500 font-black tracking-tighter uppercase">Analisis Logika</span>
                </div>
                <p className="text-sm leading-relaxed font-medium">{result.explanation}</p>
              </div>
            </section>
          )}
        </div>

        <div className="sticky top-8 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">JavaScript Sandbox</h2>
              <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-mono rounded font-bold">logic.js</span>
            </div>
            
            <CodeBlock 
              scenarioId={activeScenario.id}
              variableName={activeScenario.variableName}
              value={inputValue}
              highlightedLines={result ? result.highlightLines : [0]}
            />

            <div className="mt-6 space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2">Tips Pemula</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">1</span>
                  <p>Urutan sangat penting! Komputer mengecek dari atas ke bawah.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">2</span>
                  <p>Gunakan kurung kurawal <code>{'{ }'}</code> untuk membungkus kode yang ingin dijalankan.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="max-w-4xl w-full mt-20 py-8 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p className="font-medium">Belajar koding langkah demi langkah.</p>
        <p className="mt-1 font-mono text-[10px]">© 2024 JS Logic Lab</p>
      </footer>
    </div>
  );
};

export default App;
