import Image from "next/image";
import Heading from "../_components/Heading";
import Section from "../_components/Section";
import Row from "../_components/Row";

const categories = [
  "Commerce",
  "Finance",
  "Housing",
  "Sports",
  "Labor Market",
  "Energy",
  "Hajj & Umrah",
  "Service Private Sector",
  "Cybersecurity",
  "Education",
  "Healthcare",
  "Information",
  "Technology",
  "Judiciary",
  "Transportation",
  "Retail",
  "Entertainment",
  "Tourism",
  "Hospitality",
];

export default function Global() {
  return (
    <Section classes="relative text-white">
      <Image fill src="/map.webp" alt="map" className=" -z-10 object-cover" />
      <Row
        grid={2}
        classes="flex justify-between flex-col md:flex-row md:items-center gap-y-12"
      >
        <div className="absolute inset-0 bg-black/30 -z-10"></div>
        <div className="max-w-[400px] flex flex-col gap-6">
          <Heading type="secondary">
            STRATEGIC GEARS OFFERS SERVICES IN 21+ SECTORS
          </Heading>
          <p>
            Strategic Gears delivered more than 100 multidisciplinary projects
            during the course of the last seven years, to a wide range of
            clients.
          </p>
        </div>
        <div>
          <ul>
            {categories.map((category, i) => (
              <li key={i}>{category}</li>
            ))}
          </ul>
        </div>
      </Row>
    </Section>
  );
}
