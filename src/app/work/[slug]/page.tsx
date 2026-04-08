import { projects, getProject, getNextProject } from "@/data/projects";
import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  return {
    title: project ? `${project.title} — Ryan Rosenthal` : "Project",
    description: project?.overview ?? "",
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) {
    return (
      <div
        style={{
          fontFamily: "var(--font-helvetica)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4F3F1",
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 700, textTransform: "uppercase" }}>
          Project not found
        </p>
      </div>
    );
  }
  const nextProject = getNextProject(params.slug);
  return <CaseStudyClient project={project} nextProject={nextProject} />;
}
