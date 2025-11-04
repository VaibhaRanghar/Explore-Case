import { Mail, RefreshCw } from "lucide-react";
import React from "react";

function Refund() {
  return (
    <main className="max-w-4xl mx-auto px-6 mb-12 py-12 pb-72">
      <div className="animate-fade-in  translate-y-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6"
            style={{
              animation: "bounce 2s infinite",
            }}
          >
            <div className="text-white">
              {<RefreshCw className="w-8 h-8" />}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
            {"Refund & Cancellation Policy"}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <p className="text-emerald-800 leading-relaxed">
              At Explore Case, we understand that cancellations are sometimes
              unavoidable and often due to genuine reasons. However, managing
              cancellations involves administrative costs, dedicated staff time,
              and communication expenses. Therefore, the following charges will
              apply to all cancellations:
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>

            <div className="space-y-6 pl-12">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  Cancellation Charges
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong className="text-emerald-700">
                        INR 1,000 per person per tour
                      </strong>{" "}
                      – Applicable on all cancellations.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong className="text-emerald-700">
                        45–30 days prior to tour start date
                      </strong>{" "}
                      – 25% of the total tour cost.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong className="text-emerald-700">
                        29–20 days prior to tour start date
                      </strong>{" "}
                      – 50% of the total tour cost.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong className="text-emerald-700">
                        19–10 days prior to tour start date
                      </strong>{" "}
                      – 75% of the total tour cost.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      <strong className="text-emerald-700">
                        08 days or less / No Show
                      </strong>{" "}
                      – 100% of the total tour cost.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  Refund Policy
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Refunds, if applicable, will be processed within 30 days
                      after receiving your written cancellation request via
                      email.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      We will make every effort to maximize your refund.
                      However, in cases where the circumstances are beyond our
                      control (such as third-party bookings, hotel or transport
                      policies, or force majeure situations), refunds may be
                      limited.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  How to Cancel a Booking
                </h3>
                <p className="text-gray-700 mb-4">
                  If you wish to cancel your tour package or reservation, please
                  send us a written cancellation request at:
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 flex items-center">
                  <Mail className="w-5 h-5 text-emerald-600 mr-3" />
                  <span className="text-emerald-800 font-semibold">
                    [Your Official Email – e.g., info@explorecase.in]
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
                  Important Note
                </h3>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Cancellation policies may vary for certain special
                      packages, peak season bookings, or international tours. In
                      such cases, the policy communicated at the time of booking
                      will apply.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Explore Case reserves the right to amend or update this
                      policy at any time.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Refund;
