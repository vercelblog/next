import { Anek_Tamil } from "next/font/google";
import "./globals.css";

const AnekTamil = Anek_Tamil({
  variable: "--font-Anek-Tamil",
  subsets: ["latin"],
});

// ✅ Add metadata section here
export const metadata = {
  title: "JavaBro", // You can change this
  description: "java bro",
  verification: {
    google: "e646Y3CvAN53USI2OXIOt6rYqff6zrInfFwDgy3ejLA", // 👈 Your code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        {/* This will add the Google site verification meta tag */}
        <meta
          name="google-site-verification"
          content={metadata.verification.google}
        />
    </head>
      <body className={`${AnekTamil.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
