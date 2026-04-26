import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Works } from "@/components/works";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
