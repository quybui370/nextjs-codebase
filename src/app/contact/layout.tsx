import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}