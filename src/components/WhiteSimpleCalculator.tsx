import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Calculator, AlertCircle } from 'lucide-react';

export const WhiteSimpleCalculator: React.FC = () => {
  // 1. Note de contrôle (0 à 20)
  const [noteControle, setNoteControle] = useState<string>('10');
  // 2. Moyenne souhaitée (0 à 20)
  const [targetMoyenne, setTargetMoyenne] = useState<string>('12');

  const [copied, setCopied] = useState<boolean>(false);

  // Parse and enforce strict bounds between 0 and 20
  const parseGrade = (val: string): number => {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;
    if (num < 0) return 0;
    if (num > 20) return 20;
    return num;
  };

  const handleControleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setNoteControle('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      if (num > 20) setNoteControle('20');
      else if (num < 0) setNoteControle('0');
      else setNoteControle(val);
    } else {
      setNoteControle(val);
    }
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setTargetMoyenne('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      if (num > 20) setTargetMoyenne('20');
      else if (num < 0) setTargetMoyenne('0');
      else setTargetMoyenne(val);
    } else {
      setTargetMoyenne(val);
    }
  };

  const nc = parseGrade(noteControle);
  const target = parseGrade(targetMoyenne);

  // Formula:
  // Moyenne = (0.20 * NC) + (0.80 * NS)
  // NS = (Target - 0.20 * NC) / 0.80
  const pointsControle = Math.round(0.20 * nc * 100) / 100;
  const pointsRestants = Math.max(0, Math.round((target - pointsControle) * 100) / 100);

  const rawSynthese = (target - 0.20 * nc) / 0.80;
  const noteSyntheseRequise = Math.round(rawSynthese * 100) / 100;

  const isOverTwenty = rawSynthese > 20;
  const isZeroOrNegative = rawSynthese <= 0;

  const displayNote = isZeroOrNegative
    ? '0.00'
    : isOverTwenty
    ? '20.00+'
    : noteSyntheseRequise.toFixed(2);

  const handleReset = () => {
    setNoteControle('10');
    setTargetMoyenne('12');
  };

  const handleCopy = () => {
    const text = `Grintta bac 2027 - Calcul de note de synthèse :\n` +
      `Note de contrôle (20%) : ${nc.toFixed(2)} / 20\n` +
      `Moyenne souhaitée : ${target.toFixed(2)} / 20\n` +
      `Note requise en synthèse (80%) : ${displayNote} / 20\n` +
      `Points acquis (contrôle) : ${pointsControle.toFixed(2)} pts\n` +
      `Points à obtenir (synthèse) : ${pointsRestants.toFixed(2)} pts`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold tracking-wide uppercase border border-purple-200/90 shadow-xs">
          <span>Grintta bac 2027</span>
          <span>🇹🇳</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-950">
          Calculateur Devoir de Synthèse
        </h1>
        <p className="text-xs text-purple-600 font-medium">
          20% Contrôle + 80% Synthèse (Notes de 0 à 20)
        </p>
      </div>

      {/* Main Mauve Form Card */}
      <div className="bg-white rounded-2xl border border-purple-200/80 p-6 sm:p-7 shadow-sm shadow-purple-500/5 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-purple-100">
          <div className="flex items-center gap-2 text-purple-900 font-semibold text-sm">
            <div className="p-1 rounded-md bg-purple-100 text-purple-700">
              <Calculator className="w-4 h-4" />
            </div>
            <span>المعطيات</span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-purple-600 hover:text-purple-900 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة تعيين</span>
          </button>
        </div>

        {/* 1. Note de Contrôle (20%) */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-medium text-slate-800">
              1. عدد فرض المراقبة (20%) :
            </label>
            <span className="font-mono text-purple-700 font-semibold">
              +{pointsControle.toFixed(2)} نقطة في الجيب
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={noteControle}
              onChange={handleControleChange}
              placeholder="10.00"
              className="w-full bg-purple-50/40 border border-purple-200 rounded-lg px-3.5 py-2.5 text-base font-semibold font-mono text-purple-950 text-right focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors tabular-nums"
            />
            <span className="text-sm font-mono text-purple-400 shrink-0">/ 20</span>
          </div>
        </div>

        {/* 2. Target Subject Average */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-medium text-slate-800">
              2. المعدل اللي تحب عليه في المادة :
            </label>
            <span className="font-mono text-purple-700 font-semibold">
              الهدف
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={targetMoyenne}
              onChange={handleTargetChange}
              placeholder="12.00"
              className="w-full bg-purple-50/40 border border-purple-200 rounded-lg px-3.5 py-2.5 text-base font-semibold font-mono text-purple-950 text-right focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors tabular-nums"
            />
            <span className="text-sm font-mono text-purple-400 shrink-0">/ 20</span>
          </div>

          {/* Quick preset buttons in Mauve theme */}
          <div className="flex gap-2 pt-1">
            {[10, 12, 14, 16].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTargetMoyenne(val.toString())}
                className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                  parseFloat(targetMoyenne) === val
                    ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                    : 'bg-purple-50/50 text-purple-800 border-purple-200/80 hover:bg-purple-100/60'
                }`}
              >
                {val}.00
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card - Mauve Styled */}
      <div className="bg-white rounded-2xl border border-purple-200/80 p-6 sm:p-7 shadow-sm shadow-purple-500/5 space-y-4">
        {/* Large Output Display */}
        <div className="text-center py-2 space-y-1">
          <span className="text-xs font-medium text-purple-700 block">
            العدد المطلوب في الفرض التأليفي (80%) :
          </span>
          <div className="flex items-baseline justify-center gap-1.5">
            <span
              className={`text-5xl sm:text-6xl font-bold font-mono tracking-tight tabular-nums ${
                isOverTwenty ? 'text-rose-600' : 'text-purple-950'
              }`}
            >
              {displayNote}
            </span>
            <span className="text-xl font-medium text-purple-400 font-mono">
              / 20
            </span>
          </div>

          {/* Status note */}
          <div className="text-xs pt-1">
            {isZeroOrNegative && (
              <span className="text-emerald-700 font-medium">
                المعدل مضمون (يكفيك 0.00 في التأليفي للوصول إلى هدفك).
              </span>
            )}
            {!isZeroOrNegative && !isOverTwenty && (
              <span className="text-purple-800 font-medium">
                يلزمك تجيب على الأقل {noteSyntheseRequise.toFixed(2)} في الفرض التأليفي.
              </span>
            )}
            {isOverTwenty && (
              <div className="flex items-center justify-center gap-1 text-rose-700 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>
                  العدد المطلوب ({noteSyntheseRequise.toFixed(2)}) يفوت 20/20. يلزم التعويض في مواد أخرى.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2-stat Simple Row: Points Acquis & Points Restants */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
          <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-100">
            <span className="text-purple-700 block text-[11px] font-medium">ربحت مالـ 20% مراقبة</span>
            <span className="text-base font-bold font-mono text-purple-950 block mt-0.5">
              +{pointsControle.toFixed(2)}
            </span>
            <span className="text-[10px] text-purple-500 font-mono">0.2 × {nc.toFixed(2)}</span>
          </div>

          <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-100">
            <span className="text-purple-700 block text-[11px] font-medium">ناقص مالـ 80% تأليفي</span>
            <span className="text-base font-bold font-mono text-purple-950 block mt-0.5">
              +{pointsRestants.toFixed(2)}
            </span>
            <span className="text-[10px] text-purple-500 font-mono">0.8 × {displayNote}</span>
          </div>
        </div>

        {/* Copy button in Mauve */}
        <div className="pt-2">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-purple-700/20"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ النتيجة'}</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-purple-500 py-1 font-medium">
        المعادلة : <strong>المعدل = (0.20 × المراقبة) + (0.80 × التأليفي)</strong>
      </div>
    </div>
  );
};
