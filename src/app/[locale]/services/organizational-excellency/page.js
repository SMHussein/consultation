import ServiceDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";

export default async function Page() {
  return (
    <main>
      <ServiceHero service="organizationalExcellency" section="OurServices" />
      <ServiceDesc service="organizationalExcellency" section="OurServices" />
    </main>
  );
}
