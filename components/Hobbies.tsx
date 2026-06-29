"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/SectionLabel";
import { hobbiesIntro, hobbyImages } from "@/data/portfolio";

export default function Hobbies() {
  const scroller = useRef<HTMLDivElement>(null);
  // Duplicate the set so the auto-scroll can loop seamlessly (reset at the half mark).
  const loop = [...hobbyImages, ...hobbyImages];

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    // Respect users who asked for less motion — no auto-scroll, manual still works.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    // Only the active drag pauses the drift — released = it resumes on the very next frame.
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const SPEED = 0.5; // px per frame — gentle drift

    const tick = () => {
      if (!dragging) {
        el.scrollLeft += SPEED;
        // The first copy of the set ends at half the scroll width; loop back seamlessly.
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    // Click-and-drag to scroll on desktop. (Two-finger / touch scroll works natively.)
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("hobby-grabbing");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false; // drift resumes on the next animation frame — no lag
      el.classList.remove("hobby-grabbing");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <section id="hobbies" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 lg:px-16">
      <SectionLabel>hobbies</SectionLabel>

      <p className="max-w-3xl leading-relaxed text-muted">{hobbiesIntro}</p>

      {/* Auto-scrolling strip — drifts on its own; drag or two-finger scroll also
          works. Images keep their full original aspect ratio. */}
      <div ref={scroller} className="hobby-scroller mt-12">
        {loop.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="hobby-item"
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
}
