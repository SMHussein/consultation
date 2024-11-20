import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import ServiceItem from "../_components/ServiceItem";

const services = [
  {
    id: 1,
    name: "strategy",
    href: "#",
    src: "/service-1.webp",
    items: [
      "STRATEGY DEVELOPMENT",
      "STRATEGY IMPLEMENTATION",
      "MARKET RESEARCH & ECONOMIC STUDIES",
    ],
  },
  {
    id: 2,
    name: "OPERATIONS AND ORGANIZATIONAL EXCELLENCE",
    href: "#",
    src: "/service-2.webp",
    items: [
      "GOVERNANCE",
      "ORGANIZATIONAL DESIGN",
      "OPERATING MODEL DESIGN",
      "BUSINESS PROCESS MANAGEMENT",
      "POLICIES AND PROCEDURES",
      "PROJECT MANAGEMENT",
      "CHANGE MANAGEMENT",
      "PERFORMANCE MANAGEMENT",
      "CAPACITY BUILDING",
    ],
  },
  {
    id: 3,
    name: "MARKETING",
    href: "#",
    src: "/service-3.webp",
    items: [
      "BRAND EQUITY AND DEVELOPMENT",
      "COMMUNICATION STRATEGY",
      "MARKETING STRATEGY",
      "PRICING STRATEGY",
      "MARKETING SUPPORT",
    ],
  },
  {
    id: 4,
    name: "DIGITAL",
    href: "#",
    src: "/service-4.webp",
    items: [
      "DIGITAL STRATEGY",
      "DIGITAL TRANSFORMATION SUPPORT",
      "DATA ANALYTICS",
    ],
  },
];

export default function Services() {
  return (
    <Section classes="bg-accent-150">
      <Row grid={4}>
        <Heading classes="text-primary-100 text-center mb-6">
          Our Services
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </Row>
    </Section>
  );
}
