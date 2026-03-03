import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { IBM_Plex_Serif, Noto_Sans_Bengali, Tiro_Bangla } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
    title: "S Rafiul Hasan | Software Engineer",
    description:
        "Portfolio of S Rafiul Hasan — Software Engineer building clean, performant, and scalable systems.",
};

const ibm = IBM_Plex_Serif({
    weight: ["400", "700", "600", "500"]
})

const notoBangla = Noto_Sans_Bengali({
    weight: ["400", "500", "600", "700"],
    subsets: ["bengali"],
    variable: "--font-noto-bangla",
})

const tiroBangla = Tiro_Bangla({
    weight: ["400"],
    subsets: ["bengali"],
    variable: "--font-tiro-bangla",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`antialiased dark ${ibm.className} ${notoBangla.variable} ${tiroBangla.variable} selection:bg-primary selection:text-black`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
