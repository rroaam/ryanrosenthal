"use client";

import Navigation from "./Navigation";
import CustomCursor from "./CustomCursor";
import FilmGrain from "./FilmGrain";
import BookingContent from "./BookingContent";

export default function BookingFlow() {
  return (
    <>
      <CustomCursor />
      <FilmGrain opacity={0.035} />
      <div className="relative min-h-screen w-full" style={{ background: "#211F1F" }}>
        <Navigation delay={0.2} dark />
        <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12">
          <BookingContent />
        </div>
      </div>
    </>
  );
}
