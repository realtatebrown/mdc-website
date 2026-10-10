import { socialMetadata } from "./social-metadata";
import type { Metadata } from "next";
import "./globals.css";
import ScrollReveal from "./scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
 const social = await socialMetadata("Mass Deportation Coalition", "The coalition’s Playbook, member directory, news, and research.", "/", "/assets/share-home.png", "Mass Deportation Coalition");
 return {...social, icons:{icon:"/assets/mdc-map-logo-transparent.png"}};
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ScrollReveal /></body></html>;
}
