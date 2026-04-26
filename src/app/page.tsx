import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Works } from "@/components/works";
import { About } from "@/components/about";
import { CaseList } from "@/components/case-list";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <About />
        <CaseList />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
