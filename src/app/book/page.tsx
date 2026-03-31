import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book — Ryan Rosenthal",
  description: "Book a discovery call or project kickoff with Ryan Rosenthal.",
};

export default function BookPage() {
  return <BookingFlow />;
}
