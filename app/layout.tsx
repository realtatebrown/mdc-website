import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mass Deportation Coalition — Campaign Portfolio",
  icons: { icon: "/assets/mdc-seal-transparent.png" },
  description: "The mission, principles, policy playbook, and national coalition supporting mass deportation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
