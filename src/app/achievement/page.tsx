import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Achievement — Leejeongmin",
};

export default function AchievementPage() {
  return (
    <>
      <Header />
      <main className="px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="font-display text-[clamp(56px,12vw,200px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--color-fg)]">
            Achievement
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
