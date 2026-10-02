import type { Metadata } from "next";
import "./globals.css";
import ScrollReveal from "./scroll-reveal";

export const metadata: Metadata = {
  title: "Mass Deportation Coalition",
  icons: { icon: "/assets/mdc-architectural-badge.png" },
  description: "The mission, principles, policy playbook, and national coalition supporting mass deportation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ScrollReveal /></body></html>;
}
