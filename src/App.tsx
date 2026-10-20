/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WhiteSimpleCalculator } from './components/WhiteSimpleCalculator';

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf8fd] text-slate-900 flex flex-col justify-center items-center py-10 px-4 sm:px-6">
      <WhiteSimpleCalculator />
    </div>
  );
}
