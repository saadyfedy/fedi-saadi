import React, { useState, useEffect } from 'react';
import { calculateRequiredSynthese } from '../utils/grinttaMath';
import { GrinttaMeter } from './GrinttaMeter';
import { SimulationSlider } from './SimulationSlider';
import { PRESET_MATIERES, TARGET_PRESETS } from '../data/presets';
import { playCelebrationSound, playTickSound } from '../utils/audio';
import {
  Flame,
  Calculator,
  RotateCcw,
  BookOpen,
  Share2,
  Copy,
  Check,
  Percent,
} from 'lucide-react';

interface GrinttaCalculatorProps {
  soundEnabled: boolean;
}

export const GrinttaCalculator: React.FC<GrinttaCalculatorProps> = ({ soundEnabled }) => {
  // 1. Note de Contrôle
  const [noteControle, setNoteControle] = useState<number>(10.5);
  // 2. Target Subject Average
  const [targetMoyenne, setTargetMoyenne] = useState<number>(14.0);
  // 3. Coefficient
  const [coefficient, setCoefficient] = useState<number>(3.0);
  // Optional subject name
  const [matiereName, setMatiereName] = useState<string>('Mathématiques');

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);

  // Compute calculation
  const calculation = calculateRequiredSynthese(noteControle, targetMoyenne, coefficient);

  const handleControleChange = (val: number) => {
    const clamped = Math.max(0, Math.min(20, Math.round(val * 100) / 100));
    setNoteControle(clamped);
    if (soundEnabled) playTickSound();
  };

  const handleTargetChange = (val: number) => {
    const clamped = Math.max(0, Math.min(20, Math.round(val * 100) / 100));
    setTargetMoyenne(clamped);
    if (soundEnabled) playTickSound();
  };

  const handleCoeffChange = (val: number) => {
    const clamped = Math.max(0.5, Math.min(10, Math.round(val * 10) / 10));
    setCoefficient(clamped);
    if (soundEnabled) playTickSound();
  };

  const selectPresetMatiere = (preset: (typeof PRESET_MATIERES)[0]) => {
    setMatiereName(preset.name);
    setCoefficient(preset.defaultCoeff);
    if (soundEnabled) playCelebrationSound();
  };

  const resetValues = () => {
    setNoteControle(10);
    setTargetMoyenne(12);
    setCoefficient(2);
    setMatiereName('Mathématiques');
    if (soundEnabled) playTickSound();
  };

  const handleCopySummary = () => {
    const text = `🎯 هدف الڨرينتة في ${matiereName || 'المادة'} (ضارب ${coefficient}):\n` +
      `📝 عدد المراقبة (20%): ${noteControle.toFixed(2)}/20\n` +
      `🎯 المعدل المرغوب: ${targetMoyenne.toFixed(2)}/20\n` +
      `🔥 يلزمك تجيب في التأليفي (80%): ${calculation.noteSyntheseRequise <= 0 ? '0' : calculation.noteSyntheseRequise.toFixed(2)}/20\n` +
      `⚡ الڨرينتة: ${calculation.derjaVerdict}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-semibold flex items-center gap-1 font-sans">
              <Flame className="w-4 h-4 fill-amber-400" /> ڨرينتة التلميذ التونسي
            </span>
            <span>·</span>
            <span>20% مراقبة + 80% تأليفي</span>
            <span>·</span>
            <span>حساب دقيق مع الضارب</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-arabic tracking-tight leading-tight">
            قداش لازمك تجيب في <span className="text-amber-400">الفرض التأليفي</span> باش توصل لمعدلك؟
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-arabic leading-relaxed max-w-2xl">
            دخل عدد فرض المراقبة والمعدل اللي تحب عليه وضارب المادة، وخلّي الڨرينتة تحسبلك بالملّي شنية النوتة المطلوبة في أسبوع المغلق.
          </p>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>

      {/* Main 2-Column Split: Inputs Deck on Left, Output Grintta Meter on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Input Deck (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 backdrop-blur-md shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-arabic flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                معطيات المادة
              </h2>
              <button
                onClick={resetValues}
                className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                إعادة تعيين
              </button>
            </div>

            {/* Quick Subject Preset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 font-arabic block">
                اختر مادة (أو اكتب اسمها):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={matiereName}
                  onChange={(e) => setMatiereName(e.target.value)}
                  placeholder="اسم المادة (رياضيات، فيزياء...)"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Subject quick buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRESET_MATIERES.slice(0, 6).map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => selectPresetMatiere(preset)}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      matiereName === preset.name
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {preset.nameAr}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 1: Note Fardh Mora9ba (20%) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-200 font-arabic flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  عدد فرض المراقبة (Contrôle):
                  <span className="text-[11px] text-emerald-400 font-mono">(يمثل 20%)</span>
                </label>
                <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={noteControle}
                    onChange={(e) => handleControleChange(parseFloat(e.target.value) || 0)}
                    className="w-14 bg-transparent font-mono font-bold text-white text-right focus:outline-none tabular-nums"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ 20</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="20"
                step="0.25"
                value={noteControle}
                onChange={(e) => handleControleChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />

              <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
                <span>0.00</span>
                <span className="text-emerald-400 font-arabic">
                  ربحت {calculation.pointsControle.toFixed(2)} نقطة في معدل المادة
                </span>
                <span>20.00</span>
              </div>
            </div>

            {/* Input 2: Target Subject Average */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-200 font-arabic flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  المعدل اللي تحب عليه في المادة:
                  <span className="text-[11px] text-amber-400 font-mono">(Moyenne)</span>
                </label>
                <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={targetMoyenne}
                    onChange={(e) => handleTargetChange(parseFloat(e.target.value) || 0)}
                    className="w-14 bg-transparent font-mono font-bold text-amber-400 text-right focus:outline-none tabular-nums"
                  />
                  <span className="text-xs text-slate-500 font-mono">/ 20</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="20"
                step="0.25"
                value={targetMoyenne}
                onChange={(e) => handleTargetChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
              />

              {/* Target Quick Preset Buttons */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {TARGET_PRESETS.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => handleTargetChange(t.value)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer text-center ${
                      targetMoyenne === t.value
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Dhareb (Coefficient) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-200 font-arabic flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  ضارب المادة (Coefficient):
                </label>
                <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-500 font-mono">×</span>
                  <input
                    type="number"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={coefficient}
                    onChange={(e) => handleCoeffChange(parseFloat(e.target.value) || 1)}
                    className="w-12 bg-transparent font-mono font-bold text-sky-400 text-right focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              {/* Quick Coeff buttons */}
              <div className="flex gap-2">
                {[1, 1.5, 2, 3, 4].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCoeffChange(c)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer text-center ${
                      coefficient === c
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    ×{c}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 block font-arabic">
                كل نقطة في التأليفي تسوى +{(0.8 * coefficient).toFixed(2)} نقطة في مجموع المعدل العام!
              </span>
            </div>

            {/* Share / Copy Summary button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium font-arabic flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>تم النسخ بنجاح! بارطاجي مع صحابك</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>انسخ ملخص الڨرينتة للورقة ولا التيليفون</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Output Grintta Meter + Simulator Slider (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          <GrinttaMeter
            calculation={calculation}
            matiereName={matiereName}
          />

          <SimulationSlider
            noteControle={noteControle}
            targetMoyenne={targetMoyenne}
            coefficient={coefficient}
          />
        </div>
      </div>
    </div>
  );
};
