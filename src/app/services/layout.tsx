import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}