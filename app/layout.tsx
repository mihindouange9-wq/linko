import type { Metadata, Viewport } from "next";
import "@fontsource-variable/mona-sans/wdth.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "LINKO — Un besoin. La bonne compétence.",
  description:
    "LINKO met en relation les personnes et les entreprises qui ont un besoin avec les professionnels capables d'y répondre : plombiers, électriciens, frigoristes, techniciens et bien d'autres.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f5f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
