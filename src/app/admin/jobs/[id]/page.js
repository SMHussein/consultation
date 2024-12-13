import { getApplicants } from "@/src/app/_api/services";
import ApplicantCard from "@/src/app/_components/ApplicantCard";
import Heading from "@/src/app/_components/Heading";
import Row from "@/src/app/_components/Row";
import Section from "@/src/app/_components/Section";

export default async function JobApplicants({ params }) {
  const { id } = await params;
  const applicants = await getApplicants(id);

  if (!applicants.length)
    return (
      <Section>
        <Row grid={2}>
          <Heading type="primary" classes="mb-8">
            Applicants
          </Heading>
          <p>No Applicats for this job yet!</p>
        </Row>
      </Section>
    );

  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary" classes="mb-8">
          Applicants
        </Heading>

        <div className="grid grid-cols-1 gap-12">
          {applicants.map((item) => (
            <ApplicantCard applicant={item} key={item.id} />
          ))}
        </div>
      </Row>
    </Section>
  );
}
