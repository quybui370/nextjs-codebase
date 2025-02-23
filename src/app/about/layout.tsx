import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Us',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}