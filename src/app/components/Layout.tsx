import Link from "next/link";
import React from "react";

const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1>My Website</h1>
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-auto">
    <p>&copy; 2025 NextJS codebase</p>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
