"use client";

import SiteNav from "./SiteNav";
import BookingContent from "./BookingContent";

export default function BookingFlow() {
  return (
    <div className="relative min-h-screen w-full" style={{ background: "#F4F3F1" }}>
      <SiteNav />
      <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12">
        <BookingContent />
      </div>
    </div>
  );
}
