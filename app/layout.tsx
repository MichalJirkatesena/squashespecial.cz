import type { Metadata } from "next";
import { Big_Shoulders, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getContact } from "@/lib/content";

const bigShoulders = Big_Shoulders({
  variable: "--font-display",
  weight: "variable",
  axes: ["opsz"],
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-body",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SquashEspecial",
  description: "Squashový klub SquashEspecial — kurty, junioři, trenéři, týmy a akce.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const contact = await getContact();

  return (
    <html
      lang="cs"
      className={`${bigShoulders.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer contact={contact} />
      </body>
    </html>
  );
}
