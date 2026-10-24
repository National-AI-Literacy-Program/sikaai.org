"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";


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
    <div className="group w-full perspective-[1000px]">
      <div className="relative w-full rounded-2xl transition-transform duration-1000 ease-in-out transform-3d group-hover:transform-[rotateY(180deg)]">
        
        {/* FRONT SIDE */}
        <div className="relative flex flex-col items-center rounded-2xl border border-border bg-background p-5 text-center shadow-sm backface-hidden">
          
      
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
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-5 text-center shadow-sm backface-hidden transform-[rotateY(180deg)]">
      

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
                  <path d="…(unchanged LinkedIn path)…" />
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
                  <path d="…(unchanged GitHub path)…" />
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
  const t = useTranslations("Team");
  const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
  const eyebrow =
    "text-[11px] font-extrabold uppercase tracking-[0.18em] text-(--blue-deep)";
  const h2 =
    "text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl";

    const team: TeamMember[] = [
    {
      name: t("members.komalhari.name"),
      role: t("members.komalhari.role"),
      skills: t("members.komalhari.skills"),
      image: "/team/komalhari.jpg",
      linkedin: "https://www.linkedin.com/in/komalhari-shrestha-43599432b",
      github: "https://github.com/komalhari",
    },
    {
      name: t("members.mandeep.name"),
      role: t("members.mandeep.role"),
      skills: t("members.mandeep.skills"),
      image: "/team/mandeep.jpg",
      linkedin: "https://www.linkedin.com/in/mandeep-bhandari-6a58312a6/",
      github: "https://github.com/mandeep-bhandari123",
    },
    {
      name: t("members.pranjal.name"),
      role: t("members.pranjal.role"),
      skills: t("members.pranjal.skills"),
      image: "/team/pranjal.jpg",
      linkedin: "https://www.linkedin.com/in/pranja7l",
      github: "https://github.com/Pranja7l",
    },
    {
      name: t("members.mandip.name"),
      role: t("members.mandip.role"),
      skills: t("members.mandip.skills"),
      image: "/team/mandip.jpg",
      linkedin: "https://www.linkedin.com/in/mandipsapkota/",
      github: "https://github.com/mandipsapkota",
    },
    {
      name: t("members.himalhari.name"),
      role: t("members.himalhari.role"),
      skills: t("members.himalhari.skills"),
      image: "/team/himalhari.jpg",
      linkedin: "https://www.linkedin.com/in/himalhari-shrestha-b22829406/",
    },
  ];

  return (
    <>
      <section id="aboutus" className="bg-(--crimson-pale) border-b border-border" >
      <div className={`${wrap} py-20 sm:py-28 `}>
        <div className="mx-auto max-w-2xl text-center">
          <p className={eyebrow}>{t("eyebrow")}</p>
          <h2 className={`${h2} mt-4`}>{t("title")}</h2>
         
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
            {team.map((member) => (
            <TeamCard key={member.image} member={member} />
          ))}
        </div>
        </div>
      </section>
    </>
  );
}