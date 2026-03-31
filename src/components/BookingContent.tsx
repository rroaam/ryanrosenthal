"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Colors (dark theme) ────────────────────────────────────────────

const BG = "#211F1F";
const FG = "#CECED0";
const FG_MUTED = "rgba(206,206,208,0.35)";
const FG_DIM = "rgba(206,206,208,0.15)";
const ACCENT = "#E5000A";

// ─── Types ──────────────────────────────────────────────────────────

type SessionType = "discovery" | "kickoff";

interface FormData {
  name: string;
  email: string;
  company: string;
  note: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

// ─── Constants ──────────────────────────────────────────────────────

const AVAILABLE_TIMES = [
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const SESSION_LABELS: Record<SessionType, { title: string; duration: string; price: string }> = {
  discovery: { title: "DISCOVERY CALL", duration: "30 min", price: "Free" },
  kickoff: { title: "PROJECT KICKOFF", duration: "60 min", price: "Free" },
};

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Animation Helpers ──────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const slideUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -30, opacity: 0 },
  transition: { duration: 0.5, ease: EASE },
};

const springUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -40, opacity: 0 },
  transition: { type: "spring" as const, stiffness: 300, damping: 30 },
};

// ─── Utilities ──────────────────────────────────────────────────────

function getNext14Weekdays(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() + 1);

  while (dates.length < 14) {
    const day = start.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(start));
    }
    start.setDate(start.getDate() + 1);
  }
  return dates;
}

function formatDateLong(date: Date): string {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function buildGcalUrl(
  session: SessionType,
  date: Date,
  time: string,
  name: string,
  email: string,
  note: string,
): string {
  const duration = session === "discovery" ? 30 : 60;
  const [rawTime, period] = time.split(" ");
  const [hourStr, minStr] = rawTime.split(":");
  let hour = parseInt(hourStr, 10);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const start = new Date(date);
  start.setHours(hour, parseInt(minStr, 10), 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + duration);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const title = encodeURIComponent(`Ryan Rosenthal x ${name} — ${SESSION_LABELS[session].title}`);
  const details = encodeURIComponent(
    `Contact: ${email}\n${note ? `Note: ${note}` : ""}`,
  );

  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=Zoom+(link+TBD)`;
}

function buildIcs(
  session: SessionType,
  date: Date,
  time: string,
  name: string,
  email: string,
  note: string,
): string {
  const duration = session === "discovery" ? 30 : 60;
  const [rawTime, period] = time.split(" ");
  const [hourStr, minStr] = rawTime.split(":");
  let hour = parseInt(hourStr, 10);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const start = new Date(date);
  start.setHours(hour, parseInt(minStr, 10), 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + duration);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Ryan Rosenthal x ${name} — ${SESSION_LABELS[session].title}`,
    `DESCRIPTION:Contact: ${email}${note ? `\\nNote: ${note}` : ""}`,
    "LOCATION:Zoom (link TBD)",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

// ─── Progress Dots ──────────────────────────────────────────────────

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2.5">
      {[1, 2, 3, 4].map((s) => (
        <motion.div
          key={s}
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            background: s <= step ? ACCENT : FG_DIM,
          }}
          animate={{
            background: s <= step ? ACCENT : FG_DIM,
            scale: s === step ? 1.3 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}

// ─── Step 1: Session Type ───────────────────────────────────────────

function SessionTypeStep({
  selected,
  onSelect,
}: {
  selected: SessionType | null;
  onSelect: (s: SessionType) => void;
}) {
  return (
    <motion.div {...slideUp} className="w-full">
      <h2
        className="text-center tracking-[0.2em] uppercase mb-8"
        style={{
          fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
          fontWeight: 400,
          color: FG_MUTED,
          fontFamily: "var(--font-helvetica)",
        }}
      >
        Select a Session
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(["discovery", "kickoff"] as SessionType[]).map((type) => {
          const info = SESSION_LABELS[type];
          const isSelected = selected === type;
          return (
            <motion.button
              key={type}
              onClick={() => onSelect(type)}
              className="relative rounded-full px-8 py-5 text-left transition-colors duration-200"
              style={{
                background: isSelected ? FG : "transparent",
                border: `1.5px solid ${isSelected ? FG : FG_DIM}`,
                fontFamily: "var(--font-helvetica)",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              layout
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[13px] sm:text-sm font-medium tracking-[0.08em] uppercase"
                  style={{ color: isSelected ? BG : FG }}
                >
                  {info.title}
                </span>
                <span
                  className="text-[11px] tracking-[0.06em]"
                  style={{
                    color: isSelected ? "rgba(33,31,31,0.6)" : FG_MUTED,
                  }}
                >
                  {info.duration} &mdash; {info.price}
                </span>
              </div>
              {isSelected && (
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-[2px]"
                  style={{ background: ACCENT }}
                  layoutId="session-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Step 2: Date Strip ─────────────────────────────────────────────

function DateStrip({
  dates,
  selected,
  onSelect,
}: {
  dates: Date[];
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -200 : 200;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <motion.div {...slideUp} className="w-full">
      <h2
        className="text-center tracking-[0.2em] uppercase mb-6"
        style={{
          fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
          fontWeight: 400,
          color: FG_MUTED,
          fontFamily: "var(--font-helvetica)",
        }}
      >
        Pick a Date
      </h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center"
          style={{ color: FG_MUTED }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3L5 8L10 13" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto px-10 pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dates.map((date) => {
            const isSelected = selected?.toDateString() === date.toDateString();
            return (
              <motion.button
                key={date.toISOString()}
                onClick={() => onSelect(date)}
                className="flex-shrink-0 flex flex-col items-center rounded-2xl px-4 py-3 transition-colors duration-150"
                style={{
                  minWidth: 64,
                  background: isSelected ? FG : "transparent",
                  border: `1.5px solid ${isSelected ? FG : FG_DIM}`,
                  fontFamily: "var(--font-helvetica)",
                }}
                whileHover={!isSelected ? { borderColor: FG_MUTED } : {}}
                whileTap={{ scale: 0.96 }}
              >
                <span
                  className="text-[10px] tracking-[0.12em] uppercase font-medium"
                  style={{
                    color: isSelected ? "rgba(33,31,31,0.6)" : FG_MUTED,
                  }}
                >
                  {DAYS[date.getDay()]}
                </span>
                <span
                  className="text-lg font-medium mt-0.5"
                  style={{ color: isSelected ? BG : FG }}
                >
                  {date.getDate()}
                </span>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center"
          style={{ color: FG_MUTED }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3L11 8L6 13" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Time Slots ─────────────────────────────────────────────

function TimeSlots({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (t: string) => void;
}) {
  return (
    <motion.div {...slideUp} className="w-full">
      <h2
        className="text-center tracking-[0.2em] uppercase mb-6"
        style={{
          fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
          fontWeight: 400,
          color: FG_MUTED,
          fontFamily: "var(--font-helvetica)",
        }}
      >
        Pick a Time
      </h2>
      <div className="flex flex-wrap justify-center gap-2.5">
        {AVAILABLE_TIMES.map((time, i) => {
          const isSelected = selected === time;
          return (
            <motion.button
              key={time}
              onClick={() => onSelect(time)}
              className="rounded-full px-5 py-2.5 transition-colors duration-150"
              style={{
                background: isSelected ? ACCENT : "transparent",
                border: `1.5px solid ${isSelected ? ACCENT : FG_DIM}`,
                fontFamily: "var(--font-helvetica)",
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
              whileHover={!isSelected ? { borderColor: FG_MUTED } : {}}
              whileTap={{ scale: 0.96 }}
            >
              <span
                className="text-[12px] sm:text-[13px] font-medium tracking-[0.06em]"
                style={{ color: isSelected ? "#E6E6E6" : FG }}
              >
                {time}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Step 4: Booking Form ───────────────────────────────────────────

function BookingForm({
  form,
  errors,
  onChange,
  onSubmit,
  submitting,
}: {
  form: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const inputStyle = (hasError: boolean) => ({
    background: "transparent",
    border: `1.5px solid ${hasError ? ACCENT : FG_DIM}`,
    color: FG,
    fontFamily: "var(--font-helvetica)",
    fontSize: "13px",
    outline: "none",
  });

  return (
    <motion.div {...springUp} className="w-full">
      <h2
        className="text-center tracking-[0.2em] uppercase mb-8"
        style={{
          fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
          fontWeight: 400,
          color: FG_MUTED,
          fontFamily: "var(--font-helvetica)",
        }}
      >
        Your Details
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full rounded-full px-5 py-3 transition-colors dark-input"
            style={inputStyle(!!errors.name)}
          />
          {errors.name && (
            <p className="text-[11px] mt-1.5 ml-5" style={{ color: ACCENT }}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full rounded-full px-5 py-3 transition-colors dark-input"
            style={inputStyle(!!errors.email)}
          />
          {errors.email && (
            <p className="text-[11px] mt-1.5 ml-5" style={{ color: ACCENT }}>
              {errors.email}
            </p>
          )}
        </div>
        <input
          type="text"
          placeholder="Company / Project (optional)"
          value={form.company}
          onChange={(e) => onChange("company", e.target.value)}
          className="w-full rounded-full px-5 py-3 transition-colors dark-input"
          style={inputStyle(false)}
        />
        <textarea
          placeholder="Note for Ryan (optional)"
          rows={3}
          value={form.note}
          onChange={(e) => onChange("note", e.target.value)}
          className="w-full rounded-2xl px-5 py-3 transition-colors resize-none dark-textarea"
          style={inputStyle(false)}
        />
        <motion.button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full rounded-full px-5 py-3.5 mt-2 transition-all duration-200"
          style={{
            background: ACCENT,
            fontFamily: "var(--font-helvetica)",
            opacity: submitting ? 0.6 : 1,
          }}
          whileHover={{ scale: 1.01, filter: "brightness(1.15)" }}
          whileTap={{ scale: 0.99 }}
        >
          <span
            className="text-[11px] sm:text-[12px] font-medium tracking-[0.18em] uppercase"
            style={{ color: "#E6E6E6" }}
          >
            {submitting ? "Booking..." : "Confirm Booking \u2192"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Step 5: Confirmation ───────────────────────────────────────────

function Confirmation({
  session,
  date,
  time,
  email,
  name,
  note,
  onReset,
}: {
  session: SessionType;
  date: Date;
  time: string;
  email: string;
  name: string;
  note: string;
  onReset: () => void;
}) {
  const gcalUrl = buildGcalUrl(session, date, time, name, email, note);

  const downloadIcs = () => {
    const content = buildIcs(session, date, time, name, email, note);
    const blob = new Blob([content], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-8">
        <motion.circle cx="32" cy="32" r="28" stroke={ACCENT} strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.path d="M20 33L28 41L44 25" stroke={ACCENT} strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        />
      </motion.svg>

      <motion.h2 className="mb-3" style={{
        fontFamily: "var(--font-helvetica)", fontWeight: 700,
        fontSize: "clamp(1.5rem, 5vw, 2.5rem)", letterSpacing: "-0.04em", color: FG,
      }} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}>
        YOU&apos;RE BOOKED.
      </motion.h2>

      <motion.p className="text-sm mb-1"
        style={{ color: FG, fontFamily: "var(--font-helvetica)", fontWeight: 400 }}
        initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}>
        See you {formatDateLong(date)} at {time}.
      </motion.p>

      <motion.p className="text-xs mb-8"
        style={{ color: FG_MUTED, fontFamily: "var(--font-helvetica)" }}
        initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}>
        A confirmation has been sent to {email}
      </motion.p>

      <motion.div className="flex flex-col sm:flex-row items-center gap-3"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}>
        <a href={gcalUrl} target="_blank" rel="noopener noreferrer"
          className="rounded-full px-6 py-3 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-200 hover:scale-[1.02]"
          style={{ background: FG, color: BG, fontFamily: "var(--font-helvetica)" }}>
          Add to Google Calendar
        </a>
        <button onClick={downloadIcs}
          className="rounded-full px-6 py-3 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-200 hover:scale-[1.02]"
          style={{ background: "transparent", border: `1.5px solid ${FG_DIM}`, color: FG, fontFamily: "var(--font-helvetica)" }}>
          Download .ics
        </button>
      </motion.div>

      <motion.button onClick={onReset}
        className="mt-6 text-[11px] tracking-[0.08em] uppercase group relative"
        style={{ color: FG_MUTED, fontFamily: "var(--font-helvetica)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}>
        Book another
        <span className="absolute left-0 -bottom-[2px] h-[1px] w-full origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{ background: ACCENT }} />
      </motion.button>
    </motion.div>
  );
}

// ─── BookingContent (reusable core) ─────────────────────────────────

interface BookingContentProps {
  onClose?: () => void;
}

export default function BookingContent({ onClose }: BookingContentProps) {
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [dates] = useState(getNext14Weekdays);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: "", email: "", company: "", note: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSessionSelect = (s: SessionType) => {
    setSessionType(s);
    setTimeout(() => setStep(2), 400);
  };

  const handleDateSelect = (d: Date) => {
    setSelectedDate(d);
    setTimeout(() => setStep(3), 300);
  };

  const handleTimeSelect = (t: string) => {
    setSelectedTime(t);
    setTimeout(() => setStep(4), 300);
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const gcalUrl = buildGcalUrl(
      sessionType!, selectedDate!, selectedTime!,
      form.name, form.email, form.note,
    );
    window.open(gcalUrl, "_blank");

    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form, sessionType,
        date: formatDateLong(selectedDate!),
        time: selectedTime,
      }),
    }).catch(() => {});

    setSubmitting(false);
    setStep(5);
  };

  const resetFlow = () => {
    setStep(1);
    setSessionType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", company: "", note: "" });
    setErrors({});
  };

  if (!mounted) return null;

  return (
    <div className="w-full">
      {/* Placeholder input styles */}
      <style>{`
        .dark-input::placeholder { color: ${FG_MUTED}; }
        .dark-input:focus { border-color: ${FG} !important; }
        .dark-textarea::placeholder { color: ${FG_MUTED}; }
        .dark-textarea:focus { border-color: ${FG} !important; }
      `}</style>

      <div className="flex flex-col items-center px-6 py-8">
        {/* Close button (modal only) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-7 sm:right-8 z-10 transition-transform duration-200 hover:scale-110"
            style={{ color: FG_MUTED }}
            data-cursor-label="CLOSE"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          </button>
        )}

        <div className="w-full max-w-[680px] flex flex-col items-center">
          {step < 5 && (
            <motion.div className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <ProgressDots step={step} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <SessionTypeStep key="session" selected={sessionType} onSelect={handleSessionSelect} />
            )}
            {step === 2 && (
              <motion.div key="date" className="w-full flex flex-col gap-8" {...slideUp}>
                <SessionTypeStep selected={sessionType} onSelect={(s) => {
                  setSessionType(s); setSelectedDate(null); setSelectedTime(null);
                }} />
                <DateStrip dates={dates} selected={selectedDate} onSelect={handleDateSelect} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="time" className="w-full flex flex-col gap-8" {...slideUp}>
                <SessionTypeStep selected={sessionType} onSelect={(s) => {
                  setSessionType(s); setSelectedDate(null); setSelectedTime(null); setStep(2);
                }} />
                <DateStrip dates={dates} selected={selectedDate} onSelect={(d) => {
                  setSelectedDate(d); setSelectedTime(null);
                }} />
                <TimeSlots selected={selectedTime} onSelect={handleTimeSelect} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="form" className="w-full flex flex-col gap-8" {...slideUp}>
                <SessionTypeStep selected={sessionType} onSelect={(s) => {
                  setSessionType(s); setSelectedDate(null); setSelectedTime(null); setStep(2);
                }} />
                <DateStrip dates={dates} selected={selectedDate} onSelect={(d) => {
                  setSelectedDate(d); setSelectedTime(null); setStep(3);
                }} />
                <TimeSlots selected={selectedTime} onSelect={(t) => setSelectedTime(t)} />
                <BookingForm form={form} errors={errors} onChange={handleFormChange}
                  onSubmit={handleSubmit} submitting={submitting} />
              </motion.div>
            )}
            {step === 5 && (
              <Confirmation key="confirm" session={sessionType!} date={selectedDate!}
                time={selectedTime!} email={form.email} name={form.name} note={form.note}
                onReset={resetFlow} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
