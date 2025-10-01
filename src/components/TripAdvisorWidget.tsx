"use client";

import { useEffect } from "react";

export default function TripAdvisorWidget() {
  useEffect(() => {
    // Create the TripAdvisor script
    const script = document.createElement("script");
    script.src =
      "https://www.jscache.com/wejs?wtype=selfserveprop&uniq=911&locationId=33738258&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=false&border=true&display_version=2";
    script.async = true;
    script.dataset.loadtrk = "true";

    // Append script to body
    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="TA_selfserveprop911"
      className="TA_selfserveprop flex justify-center items-center"
    >
      <ul id="sI41tV" className="TA_links">
        <li id="T4DKZzOSoQ7q">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tripadvisor.com/Attraction_Review-g297687-d33738258-Reviews-Explore_Case-Dehradun_Dehradun_District_Uttarakhand.html"
          >
            <img
              src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
              alt="TripAdvisor"
              className="w-48 h-auto"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
