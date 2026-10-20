import React from 'react';
import { GrinttaCalculation } from '../types';
import { Flame, CheckCircle, ShieldAlert, Zap, Trophy, HelpCircle } from 'lucide-react';

interface GrinttaMeterProps {
  calculation: GrinttaCalculation;
  matiereName: string;
}

export const GrinttaMeter: React.FC<GrinttaMeterProps> = ({ calculation, matiereName }) => {
  const {
    noteSyntheseRequise,
    targetMoyenne,
    noteControle,
    coefficient,
    pointsControle,
    pointsSyntheseRequis,
    pointsTotauxMatiere,
    status,
    derjaVerdict,
    advice,
  } = calculation;

  // Visual color styles based on status
  const getThemeStyles = () => {
    switch (status) {
      case 'already_won':
        return {
          bgGlow: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
          border: 'border-emerald-500/30',
          textAccent: 'text-emerald-400',
          pillBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          meterColor: 'bg-emerald-400',
          icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
        };
      case 'easy':
        return {
          bgGlow: 'from-teal-500/10 via-teal-500/5 to-transparent',
          border: 'border-teal-500/30',
          textAccent: 'text-teal-400',
          pillBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
          meterColor: 'bg-teal-400',
          icon: <Trophy className="w-6 h-6 text-teal-400" />,
        };
      case 'moderate':
        return {
          bgGlow: 'from-amber-500/10 via-amber-500/5 to-transparent',
          border: 'border-amber-500/30',
          textAccent: 'text-amber-400',
          pillBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          meterColor: 'bg-amber-400',
          icon: <Zap className="w-6 h-6 text-amber-400" />,
        };
      case 'hard':
        return {
          bgGlow: 'from-orange-500/15 via-orange-500/5 to-transparent',
          border: 'border-orange-500/40',
          textAccent: 'text-orange-400',
          pillBg: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
          meterColor: 'bg-orange-500',
          icon: <Flame className="w-6 h-6 text-orange-400 fill-orange-400/20" />,
        };
      case 'extreme':
        return {
          bgGlow: 'from-red-600/20 via-orange-600/10 to-transparent',
          border: 'border-red-500/40',
          textAccent: 'text-red-400',
          pillBg: 'bg-red-500/15 text-red-300 border-red-500/30',
          meterColor: 'bg-gradient-to-r from-orange-500 to-red-500',
          icon: <Flame className="w-6 h-6 text-red-400 fill-red-400" />,
        };
      case 'impossible':
      default:
        return {
          bgGlow: 'from-purple-600/15 via-purple-500/5 to-transparent',
          border: 'border-purple-500/40',
          textAccent: 'text-purple-300',
          pillBg: 'bg-purple-500/15 text-purple-200 border-purple-500/30',
          meterColor: 'bg-purple-500',
          icon: <HelpCircle className="w-6 h-6 text-purple-400" />,
        };
    }
  };

  const theme = getThemeStyles();
  const meterWidth = Math.min(100, Math.max(0, (noteSyntheseRequise / 20) * 100));
  const pointsPerSyntheseMark = Math.round(0.8 * coefficient * 100) / 100;

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-b ${theme.bgGlow} bg-slate-900/90 border ${theme.border} p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300`}
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            {matiereName || 'المادة'} · ضارب {coefficient}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-arabic tracking-tight mt-0.5">
            العدد المطلوب في الفرض التأليفي
          </h3>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
            {theme.icon}
          </div>
        </div>
      </div>

      {/* Main Score Hero */}
      <div className="py-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-5xl sm:text-7xl font-extrabold font-mono tabular-nums tracking-tight ${theme.textAccent}`}
            >
              {noteSyntheseRequise <= 0 ? '0.00' : noteSyntheseRequise.toFixed(2)}
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-slate-500 font-mono">
              / 20
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-300 font-arabic mt-2">
            {derjaVerdict}
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 block">المعدل المرغوب</span>
            <span className="text-base font-bold text-white font-mono tabular-nums">
              {targetMoyenne.toFixed(2)} / 20
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">مجموع نقاط المادة</span>
            <span className="text-base font-bold text-amber-400 font-mono tabular-nums">
              {pointsTotauxMatiere.toFixed(2)} pts
            </span>
          </div>
        </div>
      </div>

      {/* Visual Grintta Meter Bar */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            مقياس صعوبة الڨرينتة
          </span>
          <span className="font-mono tabular-nums text-slate-300">
            {noteSyntheseRequise > 20
              ? 'تتجاوز 100%'
              : `${Math.round(meterWidth)}% من الـ 20`}
          </span>
        </div>

        <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${theme.meterColor}`}
            style={{ width: `${noteSyntheseRequise > 20 ? 100 : meterWidth}%` }}
          />
        </div>

        {/* Meter Reference Markers */}
        <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-0.5">
          <span>0 (مضمون)</span>
          <span>10 (المعدل)</span>
          <span>15 (حسن)</span>
          <span>20 (القمة)</span>
        </div>
      </div>

      {/* Pedagogical Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/70">
          <span className="text-[11px] text-slate-500 block font-arabic">
            في الجيب مالـ 20% مراقبة
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
              +{pointsControle.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">/ 4 pts</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            (0.20 × {noteControle.toFixed(2)})
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/70">
          <span className="text-[11px] text-slate-500 block font-arabic">
            ناقصك مالـ 80% تأليفي
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg font-bold text-amber-400 font-mono tabular-nums">
              +{pointsSyntheseRequis.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">/ 16 pts</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            (0.80 × {noteSyntheseRequise <= 0 ? '0' : noteSyntheseRequise.toFixed(2)})
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/70">
          <span className="text-[11px] text-slate-500 block font-arabic">
            قوة الضارب ({coefficient})
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg font-bold text-sky-400 font-mono tabular-nums">
              +{pointsPerSyntheseMark}
            </span>
            <span className="text-xs text-slate-500">pts / نوتة</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            كل نقطة تأليفي تعطي +{pointsPerSyntheseMark} للمجموع
          </span>
        </div>
      </div>

      {/* Derja Advice Banner */}
      <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
        <div className="mt-0.5 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
        <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed">
          <strong className="text-amber-300 ml-1">نصيحة الڨرينتة:</strong>
          {advice}
        </p>
      </div>
    </div>
  );
};
