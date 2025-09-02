import { useEffect, useRef, useState } from "react";
import "./styles/Team.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  skills: string[];
  image: string;
  linkedin?: string;
  github?: string;
}

const Team = () => {
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Enes Coşkun",
      role: "Team Lead",
      description: "10+ yıl yazılım geliştirme deneyimi ile Misgibi Software'in kurucusu. React, Node.js ve cloud teknolojileri konusunda uzman. Müşteri odaklı çözümler geliştirmeye odaklanıyor.",
      skills: ["React", "Node.js", "AWS", "Leadership", "Strategy", "Frontend", "Backend", "Full-Stack"],
      image: "/teams/teams1.avif",
      linkedin: "https://linkedin.com/in/enscskn",
      github: "https://github.com/enscskn"
    },
    {
      id: 2,
      name: "Ahmetcan Altıntaş",
      role: "Senior Full-Stack Developer",
      description: "Kullanıcı deneyimi ve arayüz tasarımında 8+ yıl deneyim. Figma, Adobe Creative Suite ve kullanıcı araştırması konularında uzman. Kullanıcı odaklı tasarım yaklaşımı ile projeleri yönetiyor.",
      skills: ["React", "PHP", "Laravel", "MySQL", "AWS", "Leadership", "Strategy", "Frontend", "Backend", "Full-Stack"],
      image: "/teams/teams2.avif",
      linkedin: "https://linkedin.com/in/ahmetcanaltintas",
      github: "https://github.com/ahmetcanaltintas"
    },
    {
      id: 3,
      name: "Enes Balcı",
      role: "Project Manager",
      description: "Full-stack geliştirme konusunda 6+ yıl deneyim. React, Next.js, TypeScript ve backend teknolojilerinde uzman. Performanslı ve ölçeklenebilir uygulamalar geliştiriyor.",
      skills: ["Leadership", "Strategy", "Project Management", "Team Management", "Communication", "Problem Solving"],
      image: "/teams/teams3.avif",
      linkedin: "https://linkedin.com/in/enesbalci",
      github: "https://github.com/enesbalci"
    },
    {
      id: 4,
      name: "Ahmet Harun Şimşek",
      role: "Backend Developer",
      description: "iOS ve Android platformları için 5+ yıl mobil uygulama geliştirme deneyimi. React Native ve native geliştirme konularında uzman. Kullanıcı dostu mobil deneyimler yaratıyor.",
      skills: ["Python", "AI", "Data Science"],
      image: "/teams/teams4.avif",
      linkedin: "https://linkedin.com/in/ahmetharunsimsek",
      github: "https://github.com/ahmetharunsimsek"
    },
    {
      id: 5,
      name: "Yunus Eren Bilici",
      role: "Frontend Developer",
      description: "iOS ve Android platformları için 5+ yıl mobil uygulama geliştirme deneyimi. React Native ve native geliştirme konularında uzman. Kullanıcı dostu mobil deneyimler yaratıyor.",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      image: "/teams/teams5.avif",
      linkedin: "https://linkedin.com/in/yunuserenbilici",
      github: "https://github.com/yunuserenbilici"
    },
    {
      id: 6,
      name: "Sıraç Alp Özkan",
      role: "Project Manager",
      description: "iOS ve Android platformları için 5+ yıl mobil uygulama geliştirme deneyimi. React Native ve native geliştirme konularında uzman. Kullanıcı dostu mobil deneyimler yaratıyor.",
      skills: ["Leadership", "Strategy", "Project Management", "Team Management"],
      image: "/teams/teams6.avif",
      linkedin: "https://linkedin.com/in/sircalp",
      github: "https://github.com/sircalp"
    }
  ];

  const setRef = (el: HTMLDivElement | null, index: number) => {
    memberRefs.current[index] = el;
  };

  useEffect(() => {
    const containers = memberRefs.current.filter(Boolean);
    
    containers.forEach((container, index) => {
      if (container) {
        container.addEventListener("click", () => handleMemberClick(index));
      }
    });

    return () => {
      containers.forEach((container, index) => {
        if (container) {
          container.removeEventListener("click", () => handleMemberClick(index));
        }
      });
    };
  }, []);

  const handleMemberClick = (index: number) => {
    if (activeMember === index) {
      setActiveMember(null);
    } else {
      setActiveMember(index);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".team-member",
        { 
          y: 100, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className="team-section section-container" id="team">
      <div className="team-container">
        <h2>
          Takımımız <span>&</span>
          <br /> uzmanları
        </h2>
        
        <div className="team-grid" ref={containerRef}>
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-member ${activeMember === index ? 'team-member-active' : ''}`}
              ref={(el) => setRef(el, index)}
            >
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
                <div className="team-member-overlay">
                  <div className="team-member-social">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
                
                <div className="team-member-skills">
                  <h5>Uzmanlık Alanları</h5>
                  <div className="team-skills-tags">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="team-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
