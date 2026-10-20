import React, { useState } from 'react';
import { calculateSubjectMoyenne } from '../utils/grinttaMath';
import { Sparkles, ArrowRight, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface SimulationSliderProps {
  noteControle: number;
  targetMoyenne: number;
  coefficient: number;
  onSimulate?: (synthese: number) => void;
}

export const SimulationSlider: React.FC<SimulationSliderProps> = ({
  noteControle,
  targetMoyenne,
  coefficient,
}) => {
  const [simulatedSynthese, setSimulatedSynthese] = useState<number>(12);

  const resultingMoyenne = calculateSubjectMoyenne(noteControle, simulatedSynthese);
  const diffFromTarget = Math.round((resultingMoyenne - targetMoyenne) * 100) / 100;
  const simulatedTotalPoints = Math.round(resultingMoyenne * coefficient * 100) / 100;

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-amber-400 font-mono tracking-wide uppercase">
            سيميلاسيون تفاعلية
          </span>
          <h4 className="text-lg font-bold text-white font-arabic mt-0.5">
            كان تجيب هكا في التأليفي، قداش يطلع معدل المادة؟
          </h4>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
          <span>المراقبة:</span>
          <span className="font-bold text-white">{noteControle.toFixed(2)}/20</span>
        </div>
      </div>

      <div className="py-5 space-y-4">
        {/* Slider control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 font-arabic">
              الفرض التأليفي الافتراضي (Synthèse):
            </label>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-2xl font-black text-amber-400 tabular-nums">
                {simulatedSynthese.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500">/ 20</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="20"
            step="0.25"
            value={simulatedSynthese}
            onChange={(e) => setSimulatedSynthese(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0.00</span>
            <span>5.00</span>
            <span>10.00</span>
            <span>15.00</span>
            <span>20.00</span>
          </div>
        </div>

        {/* Live dynamic outcome box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Resulting subject mark */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-arabic">
              معدل المادة الناتج
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                {resultingMoyenne.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500">/ 20</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
              (0.2 × {noteControle.toFixed(2)}) + (0.8 × {simulatedSynthese.toFixed(2)})
            </span>
          </div>

          {/* Difference vs Target */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-arabic">
              المقارنة مع الهدف ({targetMoyenne.toFixed(2)})
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono">
              {diffFromTarget >= 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xl font-bold text-emerald-400 tabular-nums">
                    +{diffFromTarget.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-400/80 font-arabic">رابح</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-xl font-bold text-red-400 tabular-nums">
                    {diffFromTarget.toFixed(2)}
                  </span>
                  <span className="text-xs text-red-400/80 font-arabic">ناقص</span>
                </>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-arabic block mt-0.5">
              {diffFromTarget >= 0
                ? 'توصل للهدف وفايتو!'
                : `مازال يخصك ${Math.abs(diffFromTarget).toFixed(2)} نقطة`}
            </span>
          </div>

          {/* Total Points for Coefficient */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-arabic">
              مجموع النقاط (ضارب {coefficient})
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-amber-400 font-mono tabular-nums">
                {simulatedTotalPoints.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500">نقاط</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
              {resultingMoyenne.toFixed(2)} × {coefficient}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
