import React from 'react';

export default function RefundContent() {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 font-rubik">Refund & Cancellation Policy</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-8"></div>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-xl font-semibold text-gray-900">Fee is Non Refundable & Non Transferable.</p>

        <p>If the transaction fails and money deducted from the account, then Bank Refund Policy will be applicable.</p>
      </div>
    </div>
  );
}
