"use client";

import Image from "next/image";
import { RotateCw } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  skills: string;
  image: string;
  linkedin?: string;
  github?: string;
};

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group w-full [perspective:1000px]">
      <div className="relative w-full rounded-2xl transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* FRONT SIDE */}
        <div className="relative flex flex-col items-center rounded-2xl border border-border bg-background p-5 text-center shadow-sm [backface-visibility:hidden]">
          <span className="absolute right-3 top-3 text-(--muted) transition-transform duration-500 group-hover:rotate-45">
            <RotateCw size={16} />
          </span>

          {/* Removed bg-(--crimson-pale) so no background color shows around image edges */}
          <div className="mx-auto relative size-20 overflow-hidden rounded-full mb-4 mt-2">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-base font-bold tracking-tight text-foreground">
            {member.name}
          </h3>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            {member.role}
          </p>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-5 text-center shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="absolute right-3 top-3 text-(--muted) transition-transform duration-500 group-hover:-rotate-45">
            <RotateCw size={16} />
          </span>

          <h3 className="text-sm font-bold text-foreground">{member.name}</h3>
          <p className="mt-1 text-[11px] font-semibold text-(--muted)">
            {member.skills}
          </p>

          <div className="mt-4 flex flex-col gap-2 w-full px-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-3 py-2 text-xs font-bold text-white transition hover:opacity-95"
              >
                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                LinkedIn ↗
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-foreground px-3 py-2 text-xs font-bold text-background transition hover:opacity-90"
              >
                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Team() {
  const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
  const eyebrow =
    "text-[11px] font-extrabold uppercase tracking-[0.18em] text-(--blue-deep)";
  const h2 =
    "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";

  const team: TeamMember[] = [
    {
      name: "Komalhari Shrestha",
      role: "FOUNDER | PROGRAM DIRECTOR",
      skills: "Project Management, Frontend Dev & Curriculum Design",
      image: "/team/komal.png",
      linkedin: "https://www.linkedin.com/in/komalhari-shrestha-43599432b",
      github: "https://github.com/komalhari",
    },
    {
      name: "Mandeep Bhandari",
      role: "BACKEND DESIGN | DEVELOPMENT",
      skills: "Backend Architecture & Development",
      image: "/team/mandeep-b.jpg",
      linkedin: "https://www.linkedin.com/in/mandeep-bhandari-6a58312a6/",
      github: "https://github.com/mandeep-bhandari123",
    },
    {
      name: "Pranjal Panthi",
      role: "Frontend DEVELOPMENT",
      skills: "Frontend Development & UI Integration",
      image: "/team/pranjal.jpg",
      linkedin: "https://www.linkedin.com/in/pranja7l",
      github: "https://github.com/Pranja7l",
    },
    {
      name: "Mandeep Sapkota",
      role: "System | Media Management",
      skills: "System Design & Media Management",
      image: "/team/mandeep-s.jpg",
      linkedin: "https://www.linkedin.com/in/mandipsapkota/",
      github: "https://github.com/mandipsapkota",
    },
    {
      name: "Himalhari Shrestha",
      role: "CURRICULUM DEVELOPMENT",
      skills: "Curriculum Development & Revision",
      image: "/team/himal.png",
      linkedin: "https://www.linkedin.com/in/himalhari-shrestha-b22829406/",

    },
  ];

  return (
    <>
      <section id="aboutus" className={`${wrap} py-20 sm:py-28`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={eyebrow}>THE PEOPLE BEHIND SIKAAI</p>
          <h2 className={`${h2} mt-4`}>Our core team</h2>
          <p className="mt-2 text-xs font-semibold text-(--muted)">
            Hover over any card to connect
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </>
  );
}