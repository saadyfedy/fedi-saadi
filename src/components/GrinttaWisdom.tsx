import React, { useState } from 'react';
import { GRINTTA_QUOTES } from '../data/presets';
import { Flame, Sparkles, BookCheck, Clock, Award } from 'lucide-react';
import { playGrinttaBoostSound } from '../utils/audio';

interface GrinttaWisdomProps {
  soundEnabled: boolean;
}

export const GrinttaWisdom: React.FC<GrinttaWisdomProps> = ({ soundEnabled }) => {
  const [currentBoost, setCurrentBoost] = useState<number>(0);

  const triggerNextBoost = () => {
    setCurrentBoost((prev) => (prev + 1) % GRINTTA_QUOTES.length);
    if (soundEnabled) playGrinttaBoostSound();
  };

  const activeQuote = GRINTTA_QUOTES[currentBoost];

  return (
    <div className="space-y-8">
      {/* Interactive Motivational Boost Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-1 shadow-2xl">
        <div className="rounded-[22px] bg-slate-950 p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-amber-400 font-mono flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-amber-400" />
              جرعة ڨرينتة يومية
            </span>
            <button
              onClick={triggerNextBoost}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-arabic flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>زيدني ڨرينتة!</span>
            </button>
          </div>

          <div className="space-y-3">
            <blockquote className="text-xl sm:text-3xl font-extrabold text-white font-arabic leading-snug">
              « {activeQuote.quote} »
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-400 font-arabic">
              {activeQuote.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Battle-Tested Rules for Semaine Bloquée */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white font-arabic flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-amber-400" />
          قواعد الأسبوع المغلق التونسي (Semaine Bloquée)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold font-mono">
              01
            </div>
            <h4 className="text-base font-bold text-white font-arabic">
              الضوارب الكبار أولاً
            </h4>
            <p className="text-xs text-slate-400 font-arabic leading-relaxed">
              إذا عندك مادة ضارب 4 ومادة ضارب 1، 70% من وقتك يمشيو للمادة ضارب 4. نقطة فيها تسوى 4 نقاط في الأخرى!
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold font-mono">
              02
            </div>
            <h4 className="text-base font-bold text-white font-arabic">
              اخدم الدوار السابقة (Devoirs de Synthèse)
            </h4>
            <p className="text-xs text-slate-400 font-arabic leading-relaxed">
              الكور وحدو ما يكفيش. اخدم الفروض القديمة بالكرونو باش تتعود على نسق الامتحان وتفهم صيغة الأسئلة.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold font-mono">
              03
            </div>
            <h4 className="text-base font-bold text-white font-arabic">
              النوم والتنظيم قبل ليلة الفرض
            </h4>
            <p className="text-xs text-slate-400 font-arabic leading-relaxed">
              السهرية الصباحية تطيح التركيز بنسبة 40%. ارقد 6 إلى 7 سوايع باهيين باش مخك يرجع المعلومات في قاعة الامتحان.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
