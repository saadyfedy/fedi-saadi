import { GrinttaCalculation, MatiereItem } from '../types';

/**
 * Calculates the required Note de Synthèse to achieve a target subject average,
 * where:
 *   Moyenne = (0.20 * NoteControle) + (0.80 * NoteSynthese)
 *   Target = 0.20 * NC + 0.80 * NS
 *   NS = (Target - 0.20 * NC) / 0.80
 */
export function calculateRequiredSynthese(
  noteControle: number,
  targetMoyenne: number,
  coefficient: number = 1
): GrinttaCalculation {
  const nc = Math.max(0, Math.min(20, Number(noteControle) || 0));
  const target = Math.max(0, Math.min(20, Number(targetMoyenne) || 0));
  const coeff = Math.max(0.5, Number(coefficient) || 1);

  // Points already earned from CC out of 20
  const pointsControle = 0.2 * nc;
  
  // Points needed from Synthese out of 20
  const pointsSyntheseRequis = Math.max(0, target - pointsControle);
  
  // Required Note de Synthese
  const rawSynthese = (target - pointsControle) / 0.8;
  const noteSyntheseRequise = Math.round(rawSynthese * 100) / 100;
  
  // Total points for this subject in the term calculation (Target * Coeff)
  const pointsTotauxMatiere = Math.round(target * coeff * 100) / 100;

  // Percentage relative to 20
  const percentageSyntheseNeeded = Math.min(100, Math.max(0, (noteSyntheseRequise / 20) * 100));

  let status: GrinttaCalculation['status'];
  let derjaVerdict = '';
  let advice = '';

  if (rawSynthese <= 0) {
    status = 'already_won';
    derjaVerdict = 'مبروك! المعدل مضمون حتى بـ 0 فالتأليفي 🎉';
    advice = 'النقاط اللي ربحتهم في المراقبة كافيين باش تضمن معدل المادة. أما الڨرينتة تقول كمل أضرب ضربتك باش ترفع المعدل العام!';
  } else if (rawSynthese <= 10) {
    status = 'easy';
    derjaVerdict = 'ساهلة برشا! في المتناول بخدمة خفيفة 🟢';
    advice = 'مطلوب منك عدد ساهل يتجاب بالمرتاح. شوية مراجعة وتمارين وتكشخ في أسبوع المغلق!';
  } else if (rawSynthese <= 13.5) {
    status = 'moderate';
    derjaVerdict = 'ڨرينتة متوسطة! في الجيب مع شوية خدمة ⚡';
    advice = 'نحي التليفون ونظم وقتك. خدم 2 ولا 3 فروض تأليفية قديمة وتلقى روحك فايت المعدل!';
  } else if (rawSynthese <= 16.5) {
    status = 'hard';
    derjaVerdict = 'ڨرينتة حارة! تركيز 100% وأسبوع مغلق صحيح 🔥';
    advice = 'العدد هذا يطلب خدمة جدية. افهم الكور مليح وركز في التطبيقات، ما تسلّم في حتى ربع نقطة!';
  } else if (rawSynthese <= 20) {
    status = 'extreme';
    derjaVerdict = 'BEAST MODE 🦁 ڨرينتة المحاربين (تكتيك وخدمة)!';
    advice = 'صعيبة أما مباعد التعب فما الفرحة! الڨرينتة التونسية وقت الصعيب تخدم. اخدم ليل ونهار والعدد يتجاب!';
  } else {
    status = 'impossible';
    derjaVerdict = 'رياضياً تفوت الـ 20/20! أما ثمة حل تكتيكي 🧠';
    advice = `في المادة هذي وحدها لازمك ${noteSyntheseRequise.toFixed(2)}/20، لكن ما تايّسش! جيب أقصى ما تنجم فيها (مثلاً 17 ولا 18) وعوّض الباقي في مادة أخرى ضاربها قوي!`;
  }

  return {
    noteControle: nc,
    targetMoyenne: target,
    coefficient: coeff,
    noteSyntheseRequise,
    pointsControle: Math.round(pointsControle * 100) / 100,
    pointsSyntheseRequis: Math.round(pointsSyntheseRequis * 100) / 100,
    pointsTotauxMatiere,
    status,
    derjaVerdict,
    advice,
    percentageSyntheseNeeded,
  };
}

/**
 * Calculates the subject average given both Contrôle and Synthèse marks
 */
export function calculateSubjectMoyenne(noteControle: number, noteSynthese: number): number {
  const nc = Math.max(0, Math.min(20, Number(noteControle) || 0));
  const ns = Math.max(0, Math.min(20, Number(noteSynthese) || 0));
  const moy = 0.2 * nc + 0.8 * ns;
  return Math.round(moy * 100) / 100;
}

/**
 * Calculates overall term average across a list of subjects with coefficients
 */
export function calculateTermAverage(matieres: MatiereItem[]): {
  moyenneGenerale: number;
  totalPoints: number;
  totalCoeffs: number;
} {
  if (!matieres || matieres.length === 0) {
    return { moyenneGenerale: 0, totalPoints: 0, totalCoeffs: 0 };
  }

  let totalPoints = 0;
  let totalCoeffs = 0;

  for (const m of matieres) {
    const synthese = m.simulatedSynthese !== undefined ? m.simulatedSynthese : 
      calculateRequiredSynthese(m.noteControle, m.targetMoyenne, m.coefficient).noteSyntheseRequise;
    
    // clamp between 0 and 20 for real simulation
    const actualNs = Math.max(0, Math.min(20, synthese));
    const moyMatiere = calculateSubjectMoyenne(m.noteControle, actualNs);
    
    totalPoints += moyMatiere * m.coefficient;
    totalCoeffs += m.coefficient;
  }

  const moyenneGenerale = totalCoeffs > 0 ? Math.round((totalPoints / totalCoeffs) * 100) / 100 : 0;

  return {
    moyenneGenerale,
    totalPoints: Math.round(totalPoints * 100) / 100,
    totalCoeffs: Math.round(totalCoeffs * 100) / 100,
  };
}
