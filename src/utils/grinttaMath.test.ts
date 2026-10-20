import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRequiredSynthese, calculateSubjectMoyenne, calculateTermAverage } from './grinttaMath.ts';

test('calculates correct synthese when target is 14 and controle is 10', () => {
  const result = calculateRequiredSynthese(10, 14, 2);
  // NC=10 -> 0.2 * 10 = 2
  // Needed: 14 - 2 = 12
  // NS = 12 / 0.8 = 15
  assert.equal(result.noteSyntheseRequise, 15);
  assert.equal(result.pointsControle, 2);
  assert.equal(result.pointsSyntheseRequis, 12);
  assert.equal(result.pointsTotauxMatiere, 28);
  assert.equal(result.status, 'hard');
});

test('calculates correct synthese when target is 10 and controle is 15', () => {
  const result = calculateRequiredSynthese(15, 10, 3);
  // NC=15 -> 0.2 * 15 = 3
  // Needed: 10 - 3 = 7
  // NS = 7 / 0.8 = 8.75
  assert.equal(result.noteSyntheseRequise, 8.75);
  assert.equal(result.status, 'easy');
});

test('handles already achieved target', () => {
  const result = calculateRequiredSynthese(18, 3, 1);
  assert.ok(result.noteSyntheseRequise <= 0);
  assert.equal(result.status, 'already_won');
});

test('handles target exceeding 20', () => {
  const result = calculateRequiredSynthese(5, 19, 4);
  // NC=5 -> 0.2*5 = 1
  // Needed: 19 - 1 = 18
  // NS = 18 / 0.8 = 22.5
  assert.equal(result.noteSyntheseRequise, 22.5);
  assert.equal(result.status, 'impossible');
});

test('verifies calculateSubjectMoyenne is inverse of calculateRequiredSynthese', () => {
  const nc = 12;
  const target = 15;
  const { noteSyntheseRequise } = calculateRequiredSynthese(nc, target);
  const calculatedMoyenne = calculateSubjectMoyenne(nc, noteSyntheseRequise);
  assert.equal(calculatedMoyenne, target);
});

test('calculates term average with coefficients accurately', () => {
  const matieres = [
    { id: '1', name: 'Math', coefficient: 4, noteControle: 10, targetMoyenne: 15, simulatedSynthese: 15 },
    { id: '2', name: 'Physique', coefficient: 4, noteControle: 12, targetMoyenne: 12, simulatedSynthese: 12 },
  ];
  // Math: 0.2*10 + 0.8*15 = 2 + 12 = 14. Points = 14 * 4 = 56
  // Physique: 0.2*12 + 0.8*12 = 12. Points = 12 * 4 = 48
  // Total Points = 104, Total Coeffs = 8
  // Moyenne Generale = 104 / 8 = 13.00
  const result = calculateTermAverage(matieres);
  assert.equal(result.moyenneGenerale, 13);
  assert.equal(result.totalCoeffs, 8);
  assert.equal(result.totalPoints, 104);
});
