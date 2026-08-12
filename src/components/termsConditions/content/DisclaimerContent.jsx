import React from 'react';

export default function DisclaimerContent() {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 font-rubik">Disclaimer</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-8"></div>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          The information and services may contain bugs, errors, problems or other limitations. We and our affiliated
          parties have no liability whatsoever for your use of any information or service. In particular, but not as a
          limitation thereof, we are not liable for any indirect, special, incidental or consequential damages
          (including damages for loss of business, loss of profits, litigation, or the like), whether based on breach of
          contract, even if advised of the possibility of such damages. The negations of damages set forth above are
          fundamental elements of the basis of the bargain between us and you. This site and the information would not
          be provided without such limitations. No advice or information, whether oral or written, obtained by you from
          us through the site shall create any warranty, representation or guarantee not expressly stated in this
          agreement.
        </p>

        <p>
          IPS College of Technical Education is not responsible for any inadvertent error that may have crept in the
          Provisional Admission Offer being published on net. The Provisional Admission Offer is for the immediate
          information to the candidates. These cannot be treated as original. Original Provisional Admission Offers have
          been issued separately and couriered by the University.
        </p>
      </div>
    </div>
  );
}
