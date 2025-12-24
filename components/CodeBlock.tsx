
import React from 'react';

interface CodeBlockProps {
  scenarioId: string;
  variableName: string;
  value: any;
  highlightedLines: number[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({ scenarioId, variableName, value, highlightedLines }) => {
  const getCode = () => {
    const formattedValue = typeof value === 'string' ? `'${value}'` : value;
    
    if (scenarioId === 'voting') {
      return [
        `let ${variableName} = ${formattedValue};`,
        ``,
        `if (${variableName} >= 17) {`,
        `  console.log("Bisa Memilih");`,
        `} else if (${variableName} >= 13) {`,
        `  console.log("Remaja, Belum Bisa Memilih");`,
        `} else {`,
        `  console.log("Masih Anak-anak");`,
        `}`
      ];
    }
    if (scenarioId === 'grading') {
      return [
        `let ${variableName} = ${formattedValue};`,
        ``,
        `if (${variableName} >= 90) {`,
        `  console.log("Sangat Memuaskan");`,
        `} else if (${variableName} >= 75) {`,
        `  console.log("Lulus");`,
        `} else {`,
        `  console.log("Perlu Remedial");`,
        `}`
      ];
    }
    if (scenarioId === 'shopping') {
      return [
        `let ${variableName} = ${formattedValue};`,
        ``,
        `if (${variableName} > 100000) {`,
        `  console.log("🎉 Dapat Kupon Diskon!");`,
        `}`,
        `// Program selesai di sini`
      ];
    }
    return [
      `let ${variableName} = '${value}';`,
      ``,
      `if (${variableName} === 'hujan') {`,
      `  console.log("Bawa Payung");`,
      `} else {`,
      `  console.log("Pakai Kacamata Hitam");`,
      `}`
    ];
  };

  const lines = getCode();

  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-hidden shadow-inner border border-slate-800">
      <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="code-font text-sm md:text-base leading-relaxed">
        {lines.map((line, idx) => (
          <div 
            key={idx} 
            className={`px-2 -mx-2 transition-colors duration-300 ${
              highlightedLines.includes(idx) ? 'bg-yellow-500/20 border-l-4 border-yellow-500' : 'border-l-4 border-transparent'
            }`}
          >
            <span className="opacity-30 mr-4 select-none text-xs">{idx + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CodeBlock;
