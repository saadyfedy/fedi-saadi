import { PresetMatiere } from '../types';

export const PRESET_MATIERES: PresetMatiere[] = [
  { name: 'Mathématiques', nameAr: 'الرياضيات', defaultCoeff: 4, category: 'scientifique' },
  { name: 'Sciences Physiques', nameAr: 'العلوم الفيزيائية', defaultCoeff: 4, category: 'scientifique' },
  { name: 'SVT', nameAr: 'علوم الحياة والأرض', defaultCoeff: 2, category: 'scientifique' },
  { name: 'Informatique & Algo', nameAr: 'الإعلامية والخوارزميات', defaultCoeff: 1.5, category: 'technique' },
  { name: 'Français', nameAr: 'الفرنسية', defaultCoeff: 2, category: 'litteraire' },
  { name: 'Anglais', nameAr: 'الإنجليزية', defaultCoeff: 1.5, category: 'litteraire' },
  { name: 'Arabe', nameAr: 'اللغة العربية', defaultCoeff: 2, category: 'litteraire' },
  { name: 'Philosophie', nameAr: 'الفلسفة', defaultCoeff: 2, category: 'litteraire' },
  { name: 'Économie & Gestion', nameAr: 'الاقتصاد والتصرف', defaultCoeff: 3, category: 'technique' },
  { name: 'Histoire & Géo', nameAr: 'التاريخ والجغرافيا', defaultCoeff: 1.5, category: 'litteraire' },
  { name: 'Technique / Génie', nameAr: 'التكنولوجيا والهندسة', defaultCoeff: 3, category: 'technique' },
  { name: 'Sport / Option', nameAr: 'التربية البدنية / مادة اختيارية', defaultCoeff: 1, category: 'autre' },
];

export const TARGET_PRESETS = [
  { label: '10.00', sub: 'المعدل والنجاح', value: 10 },
  { label: '12.00', sub: 'مستحسن (Assez Bien)', value: 12 },
  { label: '14.00', sub: 'حسن (Bien)', value: 14 },
  { label: '16.00', sub: 'جيد جداً (Très Bien)', value: 16 },
  { label: '18.00', sub: 'الامتياز (Excellence)', value: 18 },
];

export const GRINTTA_QUOTES = [
  {
    quote: "الـ 0.25 عند التلميذ التونسي تصنع الفارق بين الناجح واللي يعاود!",
    sub: "ما تسلم في حتى نقطة، كل سؤال عندو قيمتو."
  },
  {
    quote: "الأسبوع المغلق ما يتربحش بالبكا، يتربح بالڨرينتة وتنظيم الوقت!",
    sub: "ابدا بالتمارين اللي فيهم أكبر عدد نقاط."
  },
  {
    quote: "التأليفي يمثّل 80%، يعني 4 أضعاف المراقبة! اللعبة الكل مازالت بين يديك.",
    sub: "مهما كانت نوتة المراقبة، التأليفي قادر يقلب الطاولة."
  },
  {
    quote: "نحي التليفون وقت الريفيزيون، الـ Focus هو سلاحك السري.",
    sub: "ساعة تركيز صافية خير من 4 سوايع مع تيك توك وإنستغرام."
  },
  {
    quote: "الضارب الكبير هو كنزك: نقطة زايدة فيه تسوى ضوارب المواد لكل!",
    sub: "ركز مجهودك الأكبر على المواد اللي ضاربها 3 و 4."
  }
];
