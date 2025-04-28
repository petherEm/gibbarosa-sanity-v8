"use client";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <AppProgressBar
      height="4px"
      color="#0070f3" // Brighter blue color for better visibility
      options={{
        showSpinner: false,
        minimum: 0.3, // Start at 30% visibility
        easing: "ease",
        speed: 500,
      }}
      shallowRouting
    />
  );
}
