import React, { useState, useEffect } from 'react';
import { MatiereItem } from '../types';
import { calculateSubjectMoyenne, calculateTermAverage, calculateRequiredSynthese } from '../utils/grinttaMath';
import { Plus, Trash2, RotateCcw, Award, Sparkles, TrendingUp, BookOpen } from 'lucide-react';
import { playCelebrationSound, playTickSound } from '../utils/audio';

const STORAGE_KEY = 'grintta_carnet_matieres_v1';

const DEFAULT_MATIERES: MatiereItem[] = [
  { id: '1', name: 'Mathématiques', nameAr: 'الرياضيات', coefficient: 4, noteControle: 10, targetMoyenne: 13, simulatedSynthese: 13.5 },
  { id: '2', name: 'Sciences Physiques', nameAr: 'العلوم الفيزيائية', coefficient: 4, noteControle: 11, targetMoyenne: 13, simulatedSynthese: 13 },
  { id: '3', name: 'SVT', nameAr: 'علوم الحياة والأرض', coefficient: 2, noteControle: 12.5, targetMoyenne: 14, simulatedSynthese: 14 },
  { id: '4', name: 'Informatique & Algo', nameAr: 'الإعلامية والخوارزميات', coefficient: 1.5, noteControle: 14, targetMoyenne: 16, simulatedSynthese: 16 },
  { id: '5', name: 'Français', nameAr: 'الفرنسية', coefficient: 2, noteControle: 9.5, targetMoyenne: 11, simulatedSynthese: 11.5 },
  { id: '6', name: 'Anglais', nameAr: 'الإنجليزية', coefficient: 1.5, noteControle: 13, targetMoyenne: 14, simulatedSynthese: 14 },
  { id: '7', name: 'Arabe', nameAr: 'اللغة العربية', coefficient: 2, noteControle: 11, targetMoyenne: 12, simulatedSynthese: 12 },
  { id: '8', name: 'Philosophie', nameAr: 'الفلسفة', coefficient: 2, noteControle: 10, targetMoyenne: 11, simulatedSynthese: 11 },
];

interface CarnetTrimestreProps {
  soundEnabled: boolean;
}

export const CarnetTrimestre: React.FC<CarnetTrimestreProps> = ({ soundEnabled }) => {
  const [matieres, setMatieres] = useState<MatiereItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_MATIERES;
  });

  const [newMatiereName, setNewMatiereName] = useState('');
  const [newMatiereCoeff, setNewMatiereCoeff] = useState(2);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matieres));
    } catch {
      // Ignore
    }
  }, [matieres]);

  const updateMatiere = (id: string, updates: Partial<MatiereItem>) => {
    setMatieres((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    if (soundEnabled) playTickSound();
  };

  const removeMatiere = (id: string) => {
    setMatieres((prev) => prev.filter((m) => m.id !== id));
    if (soundEnabled) playTickSound();
  };

  const addMatiere = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatiereName.trim()) return;

    const newItem: MatiereItem = {
      id: Date.now().toString(),
      name: newMatiereName.trim(),
      nameAr: newMatiereName.trim(),
      coefficient: Math.max(0.5, newMatiereCoeff),
      noteControle: 10,
      targetMoyenne: 12,
      simulatedSynthese: 12,
    };

    setMatieres((prev) => [...prev, newItem]);
    setNewMatiereName('');
    if (soundEnabled) playCelebrationSound();
  };

  const resetToDefault = () => {
    setMatieres(DEFAULT_MATIERES);
    if (soundEnabled) playTickSound();
  };

  const termSummary = calculateTermAverage(matieres);

  // Find biggest point opportunity
  const highestCoeffMatiere = [...matieres].sort((a, b) => b.coefficient - a.coefficient)[0];

  return (
    <div className="space-y-8">
      {/* Overview Top Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-amber-400 font-mono tracking-wider">
              دفتر الثلاثي التفاعلي (Carnet de Notes)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-arabic">
              معدل الثلاثي التقديري بالڨرينتة
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-arabic">
              احسب معدلك العام بجميع المواد والضوارب وشوف وين تنجم تربح النقاط!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block font-arabic">المعدل العام التقديري</span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl sm:text-5xl font-black text-amber-400 tabular-nums">
                  {termSummary.moyenneGenerale.toFixed(2)}
                </span>
                <span className="text-lg text-slate-500 font-bold">/ 20</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-800 hidden sm:block" />

            <div className="text-xs space-y-1">
              <div className="flex justify-between gap-3 text-slate-400">
                <span>مجموع النقاط:</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {termSummary.totalPoints.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between gap-3 text-slate-400">
                <span>مجموع الضوارب:</span>
                <span className="font-mono font-bold text-sky-400 tabular-nums">
                  {termSummary.totalCoeffs}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Callout */}
        {highestCoeffMatiere && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-arabic">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                المادة المفتاح: <strong className="text-amber-400">{highestCoeffMatiere.name}</strong> (ضارب {highestCoeffMatiere.coefficient}) هي اللي عندها أكبر تأثير في المعدل العام!
              </span>
            </div>
            <button
              onClick={resetToDefault}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              المواد الافتراضية
            </button>
          </div>
        )}
      </div>

      {/* Subjects Table / List */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-white font-arabic flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            قائمة المواد والأعداد (20% مراقبة / 80% تأليفي)
          </h3>

          {/* Add Subject Inline Form */}
          <form onSubmit={addMatiere} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="اسم مادة جديدة..."
              value={newMatiereName}
              onChange={(e) => setNewMatiereName(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <input
              type="number"
              min="0.5"
              max="6"
              step="0.5"
              value={newMatiereCoeff}
              onChange={(e) => setNewMatiereCoeff(parseFloat(e.target.value) || 1)}
              className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-sky-400 font-mono font-bold text-center focus:outline-none focus:border-sky-400"
              title="ضارب المادة"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1 hover:bg-amber-300 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>زيد مادة</span>
            </button>
          </form>
        </div>

        {/* Responsive Table of Subjects */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950 text-slate-400 font-arabic border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 text-right">المادة</th>
                <th className="py-3 px-3 text-center">الضارب</th>
                <th className="py-3 px-3 text-center">المراقبة (20%)</th>
                <th className="py-3 px-3 text-center">التأليفي التقديري (80%)</th>
                <th className="py-3 px-3 text-center">معدل المادة</th>
                <th className="py-3 px-3 text-center">النقاط</th>
                <th className="py-3 px-3 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {matieres.map((m) => {
                const syntheseVal = m.simulatedSynthese ?? 12;
                const moyMatiere = calculateSubjectMoyenne(m.noteControle, syntheseVal);
                const points = Math.round(moyMatiere * m.coefficient * 100) / 100;

                return (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Subject name */}
                    <td className="py-3.5 px-4 font-sans font-medium text-white">
                      <div className="flex flex-col">
                        <span>{m.nameAr || m.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{m.name}</span>
                      </div>
                    </td>

                    {/* Coefficient */}
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        min="0.5"
                        max="8"
                        step="0.5"
                        value={m.coefficient}
                        onChange={(e) =>
                          updateMatiere(m.id, { coefficient: parseFloat(e.target.value) || 1 })
                        }
                        className="w-12 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-center font-bold text-sky-400 focus:outline-none focus:border-sky-400"
                      />
                    </td>

                    {/* Note Controle */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={m.noteControle}
                          onChange={(e) =>
                            updateMatiere(m.id, {
                              noteControle: Math.max(0, Math.min(20, parseFloat(e.target.value) || 0)),
                            })
                          }
                          className="w-14 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-center font-bold text-emerald-400 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </td>

                    {/* Note Synthese Simulee */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={syntheseVal}
                          onChange={(e) =>
                            updateMatiere(m.id, {
                              simulatedSynthese: Math.max(0, Math.min(20, parseFloat(e.target.value) || 0)),
                            })
                          }
                          className="w-14 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-center font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </td>

                    {/* Moyenne Matiere */}
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`text-sm font-bold tabular-nums ${
                          moyMatiere >= 10 ? 'text-white' : 'text-red-400'
                        }`}
                      >
                        {moyMatiere.toFixed(2)}
                      </span>
                    </td>

                    {/* Total Points */}
                    <td className="py-3.5 px-3 text-center text-slate-300 font-bold tabular-nums">
                      {points.toFixed(2)}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => removeMatiere(m.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded hover:bg-slate-800"
                        title="حذف المادة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
