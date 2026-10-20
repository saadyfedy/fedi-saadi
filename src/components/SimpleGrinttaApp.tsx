import React, { useState } from 'react';
import { Flame, Calculator, Sparkles, ArrowRight, RotateCcw, Check, Copy } from 'lucide-react';
import { calculateRequiredSynthese, calculateSubjectMoyenne } from '../utils/grinttaMath';
import { playTickSound, playCelebrationSound } from '../utils/audio';

export const SimpleGrinttaApp: React.FC = () => {
  // Form fields
  const [noteControle, setNoteControle] = useState<string>('10');
  const [targetMoyenne, setTargetMoyenne] = useState<string>('12');
  const [coefficient, setCoefficient] = useState<string>('2');
  const [matiereName, setMatiereName] = useState<string>('Mathématiques');

  // Interactive slider for testing hypothetical synthèse marks
  const [testSynthese, setTestSynthese] = useState<number>(12);
  const [showTester, setShowTester] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Parsed values
  const numNC = Math.max(0, Math.min(20, parseFloat(noteControle) || 0));
  const numTarget = Math.max(0, Math.min(20, parseFloat(targetMoyenne) || 0));
  const numCoeff = Math.max(0.5, Math.min(10, parseFloat(coefficient) || 1));

  // Calculation
  const result = calculateRequiredSynthese(numNC, numTarget, numCoeff);
  const testedMoyenne = calculateSubjectMoyenne(numNC, testSynthese);
  const testedPoints = Math.round(testedMoyenne * numCoeff * 100) / 100;

  const handleCopy = () => {
    const text = `🎯 هدف الڨرينتة في ${matiereName || 'المادة'} (ضارب ${numCoeff}):\n` +
      `📝 المراقبة (20%): ${numNC.toFixed(2)}/20\n` +
      `🎯 المعدل المطلوب: ${numTarget.toFixed(2)}/20\n` +
      `🔥 يلزمك في التأليفي (80%): ${result.noteSyntheseRequise <= 0 ? '0.00' : result.noteSyntheseRequise.toFixed(2)}/20\n` +
      `⚡ ${result.derjaVerdict}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setNoteControle('10');
    setTargetMoyenne('12');
    setCoefficient('2');
    setMatiereName('Mathématiques');
    setShowTester(false);
    playTickSound();
  };

  // Status badge style
  const getBadgeStyle = () => {
    if (result.status === 'already_won') {
      return {
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        bar: 'bg-emerald-400',
      };
    }
    if (result.status === 'easy') {
      return {
        color: 'text-teal-400',
        bg: 'bg-teal-500/10 border-teal-500/20',
        bar: 'bg-teal-400',
      };
    }
    if (result.status === 'moderate') {
      return {
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        bar: 'bg-amber-400',
      };
    }
    if (result.status === 'hard') {
      return {
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        bar: 'bg-orange-500',
      };
    }
    if (result.status === 'extreme') {
      return {
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/30',
        bar: 'bg-red-500',
      };
    }
    return {
      color: 'text-purple-300',
      bg: 'bg-purple-500/10 border-purple-500/20',
      bar: 'bg-purple-500',
    };
  };

  const badge = getBadgeStyle();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight uppercase">
            GRINTTA
          </h1>
          <span className="text-sm font-bold text-amber-400 font-arabic px-2 py-0.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
            ڨرينتة
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-arabic">
          احسب قداش لازمك تجيب في التأليفي (20% مراقبة / 80% تأليفي)
        </p>
      </div>

      {/* Main Clean Form Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <h2 className="text-base font-bold text-white font-arabic flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            استمارة المعطيات
          </h2>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            title="إعادة تعيين"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة تعيين</span>
          </button>
        </div>

        {/* Input 1: Subject Name (Optional quick tag) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 font-arabic block">
            المادة:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={matiereName}
              onChange={(e) => setMatiereName(e.target.value)}
              placeholder="مثال: رياضيات، فيزياء، إعلامية..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          {/* Quick subject buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { name: 'Mathématiques', coeff: 4 },
              { name: 'Physique', coeff: 4 },
              { name: 'Info / Algo', coeff: 1.5 },
              { name: 'SVT', coeff: 2 },
              { name: 'Français', coeff: 2 },
              { name: 'Anglais', coeff: 1.5 },
              { name: 'Arabe', coeff: 2 },
              { name: 'Philo / Éco', coeff: 2 },
            ].map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setMatiereName(s.name);
                  setCoefficient(s.coeff.toString());
                  playTickSound();
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  matiereName === s.name
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input 2: Note Fardh Mora9ba (20%) */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 font-arabic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. عدد فرض المراقبة (20%):
            </label>
            <span className="text-xs font-mono text-emerald-400">
              +{result.pointsControle.toFixed(2)} pts في الجيب
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={noteControle}
              onChange={(e) => {
                setNoteControle(e.target.value);
                playTickSound();
              }}
              placeholder="0.00"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-lg font-bold font-mono text-white text-right focus:outline-none focus:border-emerald-400 transition-colors tabular-nums"
            />
            <span className="text-sm font-mono text-slate-500 shrink-0">/ 20</span>
          </div>
        </div>

        {/* Input 3: Target Subject Average */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 font-arabic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              2. قداش تحب تجيب معدل في المادة؟
            </label>
            <span className="text-xs font-mono text-amber-400">
              المعدل المستهدف
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={targetMoyenne}
              onChange={(e) => {
                setTargetMoyenne(e.target.value);
                playTickSound();
              }}
              placeholder="12.00"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-lg font-bold font-mono text-amber-400 text-right focus:outline-none focus:border-amber-400 transition-colors tabular-nums"
            />
            <span className="text-sm font-mono text-slate-500 shrink-0">/ 20</span>
          </div>

          {/* Quick Target presets */}
          <div className="grid grid-cols-4 gap-2 pt-0.5">
            {[10, 12, 14, 16].map((target) => (
              <button
                key={target}
                type="button"
                onClick={() => {
                  setTargetMoyenne(target.toString());
                  playTickSound();
                }}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer text-center ${
                  parseFloat(targetMoyenne) === target
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {target}.00
              </button>
            ))}
          </div>
        </div>

        {/* Input 4: Coefficient (الضارب) */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center">
            <label className="text-xs sm:text-sm font-semibold text-slate-200 font-arabic flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              3. ضارب المادة (Coefficient):
            </label>
            <span className="text-xs font-mono text-sky-400">
              كل نقطة = +{(0.8 * numCoeff).toFixed(2)} pts
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[1, 1.5, 2, 3, 4].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCoefficient(c.toString());
                  playTickSound();
                }}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer text-center ${
                  parseFloat(coefficient) === c
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                ×{c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Result Card */}
      <div className={`rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all duration-300`}>
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {matiereName || 'المادة'} · ضارب {numCoeff}
            </span>
            <div className={`px-3 py-1 rounded-full text-xs font-arabic font-semibold border ${badge.bg} ${badge.color}`}>
              {result.status === 'already_won' && 'المعدل مضمون 🎉'}
              {result.status === 'easy' && 'ساهلة برشا 🟢'}
              {result.status === 'moderate' && 'ڨرينتة متوسطة ⚡'}
              {result.status === 'hard' && 'ڨرينتة حارة 🔥'}
              {result.status === 'extreme' && 'BEAST MODE 🦁'}
              {result.status === 'impossible' && 'تكتيك وتعويض 🧠'}
            </div>
          </div>

          {/* Big Number Output */}
          <div className="text-center py-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-400 font-arabic block mb-1">
              يلزمك تجيب في الفرض التأليفي (80%):
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-6xl sm:text-7xl font-black font-mono tabular-nums tracking-tight ${badge.color}`}>
                {result.noteSyntheseRequise <= 0 ? '0.00' : result.noteSyntheseRequise.toFixed(2)}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-600 font-mono">
                / 20
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-200 font-arabic mt-2">
              {result.derjaVerdict}
            </p>
          </div>

          {/* Simple 3-stat strip */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-500 font-arabic block">ربحت مالـ 20%</span>
              <span className="text-base font-bold text-emerald-400 font-mono tabular-nums block mt-0.5">
                +{result.pointsControle.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">/ 4 pts</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-500 font-arabic block">ناقص مالـ 80%</span>
              <span className="text-base font-bold text-amber-400 font-mono tabular-nums block mt-0.5">
                +{result.pointsSyntheseRequis.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">/ 16 pts</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-500 font-arabic block">مجموع نقاط المادة</span>
              <span className="text-base font-bold text-sky-400 font-mono tabular-nums block mt-0.5">
                {result.pointsTotauxMatiere.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">نقاط</span>
            </div>
          </div>

          {/* Advice */}
          <p className="text-xs text-slate-300 font-arabic leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <strong className="text-amber-300 ml-1">نصيحة:</strong>
            {result.advice}
          </p>

          {/* Action Row */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setShowTester(!showTester)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold font-arabic text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {showTester ? 'إخفاء المجرب الافتراضي' : 'جرب نوتة أخرى في التأليفي'}
            </button>
            <button
              onClick={handleCopy}
              className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-arabic flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ!' : 'انسخ النتيجة'}</span>
            </button>
          </div>

          {/* Interactive Tester Slider (revealed on demand) */}
          {showTester && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-300 font-arabic">
                  كان تجيب في التأليفي:
                </span>
                <span className="text-lg font-bold font-mono text-amber-400">
                  {testSynthese.toFixed(2)} / 20
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.25"
                value={testSynthese}
                onChange={(e) => setTestSynthese(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <span className="font-arabic text-slate-400">معدل المادة يكون:</span>
                <span className="text-lg font-extrabold font-mono text-white tabular-nums">
                  {testedMoyenne.toFixed(2)} / 20
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiet Footer Note */}
      <div className="text-center text-xs text-slate-500 font-arabic py-4">
        المعادلة: <strong>المعدل = (0.20 × المراقبة) + (0.80 × التأليفي)</strong> · بالڨرينتة والتوفيق في أسبوع المغلق! 🇹🇳
      </div>
    </div>
  );
};
