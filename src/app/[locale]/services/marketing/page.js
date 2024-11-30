import ServiceDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";

export default async function Page() {
  return (
    <main>
      <ServiceHero service="marketing" section="OurServices" />
      <ServiceDesc service="marketing" section="OurServices" />
    </main>
  );
}
