"use client";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 mt-16">
        <h1 className="text-3xl font-bold text-center mb-6">About QualityProperty</h1>
        <p className="text-lg text-gray-700 text-center">
          At <strong>QualityProperty</strong>, we believe in redefining modern living through 
          sustainable, affordable, and beautifully designed movable homes. Our mission is to 
          provide high-quality, energy-efficient, and innovative housing solutions that cater 
          to a variety of lifestyles.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>🌿 **Sustainable & Eco-Friendly** – Our homes are designed with energy efficiency in mind.</li>
            <li>🏡 **Variety of Homes** – From tiny homes to log cabins, we have something for every lifestyle.</li>
            <li>🛠 **Customizable Designs** – Personalize your home to match your needs.</li>
            <li>🚚 **Movable & Convenient** – Enjoy the freedom of mobility with our portable homes.</li>
            <li>💰 **Affordable Solutions** – Experience homeownership at a fraction of traditional costs.</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="mt-4 text-gray-700">
            We envision a future where homes are not just structures but lifestyles. Whether 
            you seek an off-grid retreat, a compact city home, or a portable business space, 
            **QualityProperty** is here to turn your dreams into reality.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
