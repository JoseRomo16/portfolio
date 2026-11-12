"use client";

import { useEffect, useState } from "react";

/**
 * Índice "En esta página" de los casos de estudio (solo escritorio, lo oculta el padre).
 * Fijo al hacer scroll; marca con aria-current la sección que ocupa la franja superior de la pantalla.
 */
export function CaseToc({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    // Se observa el contenedor de cada título: la <section>, o la tarjeta en "aprendí" / "siguiente".
    const boxes = new Map<Element, string>();
    for (const it of items) {
      const h = document.getElementById(it.id);
      if (h) boxes.set(h.closest("section, [role=region]") ?? h, it.id);
    }
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = boxes.get(e.target);
          if (!id) continue;
          if (e.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        // Si hay varias en la franja, gana la primera en el orden de la página.
        const first = items.find((it) => visible.has(it.id));
        if (first) setActive(first.id);
      },
      // Franja entre el 20 % y el 35 % de la altura de la pantalla.
      { rootMargin: "-20% 0px -65% 0px" },
    );
    boxes.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className="sticky top-24">
      <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-sub">{title}</p>
      <ol className="mt-4 space-y-0.5 border-l border-hair">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "location" : undefined}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-snug text-sub transition-colors hover:text-ink aria-[current]:border-ink aria-[current]:font-medium aria-[current]:text-ink"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
