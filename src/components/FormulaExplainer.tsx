import React from 'react';
import { Calculator, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';

export const FormulaExplainer: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8">
        <span className="text-xs font-semibold text-amber-400 font-mono tracking-wider uppercase">
          دليل التلميذ الذكي
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-arabic mt-1">
          كيفاش تتحسب 20% مراقبة و 80% تأليفي في تونس؟
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-arabic mt-1">
          علاش الفرض التأليفي يسوى 4 أضعاف فرض المراقبة، وكيفاش تستغل الضارب لصالحك؟
        </p>
      </div>

      {/* Main Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: The Core Formula */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-arabic">
            <Calculator className="w-5 h-5" />
            <span>1. معادلة معدل المادة</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <div className="text-sm font-mono text-slate-400">
              Moyenne = (0.20 × Note Contrôle) + (0.80 × Note Synthèse)
            </div>
            <div className="text-xs font-arabic text-amber-300">
              المعدل = (خمس عدد المراقبة) + (أربعة أخماس عدد التأليفي)
            </div>
          </div>

          <p className="text-xs text-slate-300 font-arabic leading-relaxed">
            يعني إذا جبت <strong>10</strong> في المراقبة، ربحت في الجيب <strong>2 نقاط</strong>.
            والـ <strong>16 نقطة</strong> الباقية لكلها تتلعب في الفرض التأليفي!
          </p>
        </div>

        {/* Card 2: The Inverse Calculation (Required Synthèse) */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-arabic">
            <Lightbulb className="w-5 h-5" />
            <span>2. كيفاش نطلعو العدد المطلوب؟</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <div className="text-sm font-mono text-slate-400">
              Note Synthèse = [ Target - (0.20 × Note Contrôle) ] / 0.80
            </div>
            <div className="text-xs font-arabic text-emerald-300">
              عدد التأليفي = [ المعدل اللي تحب عليه - النقاط الرابحهم ] ÷ 0.80
            </div>
          </div>

          <p className="text-xs text-slate-300 font-arabic leading-relaxed">
            هذي المعادلة الرياضية اللي تخدم بيها تطبيق <strong>Grintta</strong> باش تعطيك بالملّي شنية النوتة اللي تحطها في بالك وتبني عليها مراجعتك.
          </p>
        </div>
      </div>

      {/* Concrete Example Walkthrough */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-5">
        <h3 className="text-lg font-bold text-white font-arabic flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          مثال حي بالفلوس والدريد:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 block font-arabic">الوضعية</span>
            <span className="text-base font-bold text-white block mt-1">تلميذ جاب 8 في المراقبة</span>
            <span className="text-xs text-amber-400 font-arabic block mt-1">ويحب يجيب 12 معدل في المادة</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 block font-arabic">الحسابات الوسيطة</span>
            <span className="text-xs font-mono text-slate-300 block mt-1">0.20 × 8 = 1.60 نقطة</span>
            <span className="text-xs font-mono text-emerald-400 block mt-1">مازال يخصو: 12 - 1.60 = 10.40</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 block font-arabic">النتيجة بالڨرينتة</span>
            <span className="text-xs font-mono text-slate-300 block mt-1">10.40 ÷ 0.80 = 13.00</span>
            <span className="text-base font-bold text-amber-400 font-arabic block mt-1">يلزمو 13.00 في التأليفي!</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200 font-arabic leading-relaxed">
          💡 <strong>السر التونسي:</strong> نقطة زايدة في التأليفي تعادل 4 نقاط في المراقبة. يعني حتى لو كان طحت في المراقبة، التأليفي قادر يقلب الطاولة بالڨرينتة!
        </div>
      </div>
    </div>
  );
};
