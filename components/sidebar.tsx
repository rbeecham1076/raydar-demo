"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, BriefcaseBusiness, FileText, Gauge, Images, Radar, Workflow } from "lucide-react";

const nav = [
  ["/","Overview",Gauge],
  ["/signals","Signals",Radar],
  ["/opportunities","Opportunities",Activity],
  ["/inspiration","Inspiration Library",Images],
  ["/decision-brief","Decision Brief",BriefcaseBusiness],
  ["/pipeline","Pipeline",Workflow],
  ["/performance","Performance",BarChart3],
  ["/case-study","Case Study",FileText],
] as const;

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandmark">R</div>
        <div><strong>RAYDAR</strong><span>Commerce Intelligence</span></div>
      </div>
      <nav>
        {nav.map(([href,label,Icon]) => (
          <Link key={href} href={href} className={path===href ? "active" : ""}>
            <Icon size={17}/><span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebarFoot">
        <span className="eyebrow">DEMO ENVIRONMENT</span>
        <p>Sanitized synthetic data.</p>
      </div>
    </aside>
  )
}
