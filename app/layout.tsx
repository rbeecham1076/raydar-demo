import "./globals.css";
import "./inspiration.css";
import "./typography.css";
import "./library.css";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Raydar — Commerce Intelligence",
  description: "AI-assisted commerce intelligence and product decision system"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><div className="shell"><Sidebar/><main>{children}</main></div></body></html>
}
