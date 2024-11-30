import Hero from "@/src/app/_sections/Hero";
import Overview from "@/src/app/_sections/Overview";
import Clients from "@/src/app/_sections/Clients";
import Services from "@/src/app/_sections/Services";
import Team from "@/src/app/_sections/Team";
import Contact from "@/src/app/_sections/Contact";
import WhyUs from "@/src/app/_sections/Whyus";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Overview />
      <Services />
      <WhyUs />
      <Team />
      <Clients />
      <Contact />
    </main>
  );
}
