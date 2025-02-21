"use client";

// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import houses from "@/data/houses";
import NavBar from "@/components/Navbar";
import HouseCard from "@/components/HouseCard";
import React, { useEffect, useState } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import Footer from "@/components/Footer";
import { TestimonialsList } from "@/components/Testimonials";
import Services from "@/components/Services";

interface House {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  dimension: string;
}

export default function HomePage() {
  const [houses, setHouses] = useState<House[]>([]);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const scrollToHouses = () => {
  //   const housesSection = document.getElementById("houses");
  //   if (housesSection) {
  //     housesSection.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  useEffect(() => {
    async function fetchHouses() {
      const res = await fetch("/api/houses");
      const data = await res.json();
      setHouses(data);
      // setLoading(false);
    }
    fetchHouses();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <NavBar />
      <div id="home" className="mb-4 relative ">
        {/* <div className="-z-30">
          <FloatingHouses scroll={scrollToHouses} />
          </div> */}
        <HeroGeometric
          badge="The Future of Home is Tiny"
          title1="Tiny Homes"
          title2="Limitless Living"
        />
      </div>
      <Services />

      {/* House Gallery */}
      <div className="max-w-6xl mx-auto p-6 mt-16 z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Available Homes
        </h2>

        {
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {houses.map((house) => (
              <div
                key={house.id}
                onClick={() => router.push(`/houses/${house.id}`)}
                className="cursor-pointer"
              >
                <HouseCard key={house.id} {...house} />
              </div>
            ))}
          </div>
        }
      </div>
      <div className="flex flex-col items-center my-24">
        <TestimonialsList />
      </div>
      <Footer />
    </div>
  );
}
