import Header from "./_sections/Header";
import Footer from "./_sections/Footer";
import Hero from "./_sections/Hero";
import Overview from "./_sections/Overview";
import Clients from "./_sections/Clients";
import Services from "./_sections/Services";
import Global from "./_sections/Globals";
import Team from "./_sections/Team";
import Contact from "./_sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Clients />
        <Services />
        <Global />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
