import ServiceDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";

export default async function Page() {
  return (
    <main>
      <ServiceHero service="strategies" section="OurServices" />
      <ServiceDesc service="strategies" section="OurServices" />
    </main>
  );
}
