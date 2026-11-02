import "./globals.css";

export const metadata = {
  title: "Luntian – Tele-nutrition Platform",
  description: "Meal tracking, appointments and video consultations with a dietitian.",
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
