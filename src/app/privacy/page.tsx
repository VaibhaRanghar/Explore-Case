import React from "react";
import { Lock, Shield } from "lucide-react";
function Privacy() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 mb-12 py-12">
        <div className="animate-fade-in  translate-y-8">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6"
              style={{
                animation: "bounce 2s infinite",
              }}
            >
              <div className="text-white">{<Shield className="w-8 h-8" />}</div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
              {"Privacy & Security Policy"}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
              <p className="text-emerald-800 leading-relaxed">
                At Explore Case – A Complete Travel House, we value the trust
                you place in us and are committed to protecting your privacy and
                personal information. This policy explains how we handle, use,
                and safeguard your data.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>

              <div className="space-y-6 pl-12">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    1. Privacy Commitment
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        We respect your privacy and ensure that the personal
                        information you provide to us is kept safe and secure.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Your information may be used to enhance our services,
                        generate awareness for tourism, and promote Explore
                        Case.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        We may share personal information only with law
                        enforcement authorities in cases involving suspected
                        illegal activities, fraud, abusive communications, or to
                        protect the rights of Explore Case.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    2. Data Security
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Lock className="w-4 h-4 text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        Our website is secured for all online transactions.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="w-4 h-4 text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        When you begin the booking process, you are transferred
                        into a secure zone, which remains active throughout your
                        entire transaction.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="w-4 h-4 text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        We maintain encrypted records of your booking and
                        associated data for security and future reference.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    3. Usage Restrictions
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        The content, information, and materials available on
                        Explore Case&apos;s website are owned and operated
                        exclusively by Explore Case.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        No individual or organization is permitted to use, copy,
                        or reproduce any part of this website&apos;s content for
                        commercial purposes without prior written consent.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    4. Policy Updates
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Explore Case reserves the right to update or modify this
                        Privacy & Security Policy at any time.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Any changes will be posted on this page, and continued
                        use of the website implies your agreement with the
                        updated policy.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Privacy;
