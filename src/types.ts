export interface GrinttaCalculation {
  noteControle: number;
  targetMoyenne: number;
  coefficient: number;
  noteSyntheseRequise: number;
  pointsControle: number; // 0.20 * NC
  pointsSyntheseRequis: number; // 0.80 * NS
  pointsTotauxMatiere: number; // Target * Coeff
  status: 'already_won' | 'easy' | 'moderate' | 'hard' | 'extreme' | 'impossible';
  derjaVerdict: string;
  advice: string;
  percentageSyntheseNeeded: number; // NS / 20 * 100
}

export interface MatiereItem {
  id: string;
  name: string;
  nameAr?: string;
  coefficient: number;
  noteControle: number;
  targetMoyenne: number;
  simulatedSynthese?: number;
}

export interface PresetMatiere {
  name: string;
  nameAr: string;
  defaultCoeff: number;
  category: 'scientifique' | 'litteraire' | 'technique' | 'autre';
}
