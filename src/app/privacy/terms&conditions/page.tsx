import { FileText, Scale } from "lucide-react";
import React from "react";

function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-6 mb-12 py-12">
      <div className="animate-fade-in  translate-y-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6"
            style={{
              animation: "bounce 2s infinite",
            }}
          >
            <div className="text-white">{<FileText className="w-8 h-8" />}</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
            {"Terms & Conditions"}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <p className="text-emerald-800 leading-relaxed">
              Welcome to Explore Case – A Complete Travel House. By booking with
              us or using our services, you agree to the following terms and
              conditions:
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>

            <div className="space-y-6 pl-12">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  1. General Information
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      The information provided on the Explore Case website is
                      for general purposes only.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      While we make every effort to keep the details accurate
                      and up to date, Explore Case does not guarantee the
                      completeness or reliability of the information provided.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  2. Role of Explore Case
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Explore Case acts solely as a booking agent for services
                      arranged for individuals or groups.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      We are not liable for any loss, damage, injury, accident,
                      delay, or other issues caused by third-party providers
                      (e.g., hotels, transport operators, airlines, guides).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      This includes damages arising from the ownership,
                      maintenance, use, or operation of vehicles,
                      accommodations, or other service providers, whether or not
                      negligence is involved.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  3. Liability Disclaimer
                </h3>
                <p className="text-gray-700 mb-3">
                  Explore Case shall not be responsible for any loss, injury, or
                  damage resulting from circumstances beyond our control,
                  including but not limited to:
                </p>
                <ul className="space-y-2 text-gray-700 mb-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Acts of God</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Fire, accidents, breakdown of machinery or equipment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Government restrictions or regulations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>War, riots, civil disturbances</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Epidemics, quarantines</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Theft, pilferage, or unforeseen delays</span>
                  </li>
                </ul>
                <p className="text-gray-700">
                  Any extra expenses caused by such situations will be borne by
                  the booking holder.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  4. Itinerary & Service Changes
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Explore Case reserves the right to alter, amend, or omit
                      any part of the itinerary or change accommodations,
                      transport, or other arrangements without prior notice.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      No refunds or rebates will be given for such changes, but
                      any additional costs must be paid by the booking holder.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      We will make every effort to inform guests of such changes
                      in advance or during the tour.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  5. Cancellation by Explore Case
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Explore Case reserves the right to cancel any booking or
                      service if it becomes impracticable to operate, for
                      reasons beyond our control.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      In such cases, the booking holder will receive a refund of
                      the booking amount paid.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      No further claims or compensation will be entertained.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  6. Jurisdiction
                </h3>
                <p className="text-gray-700 flex items-start">
                  <Scale className="w-4 h-4 text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <span>
                    In case of any disputes between Explore Case and the booking
                    holder (or agent), the matter shall be subject to the
                    jurisdiction of Dehradun Court, India.
                  </span>
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                  7. Our Commitment
                </h3>
                <ul className="space-y-3 text-emerald-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      At Explore Case, we believe our service is our true
                      introduction.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      We are committed to building lasting relationships with
                      our clients by delivering excellent travel experiences and
                      the highest level of satisfaction.
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

export default Terms;
