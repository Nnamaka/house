"use client";

// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import houses from "@/data/houses";
import NavBar from "@/components/Navbar";
import { FloatingHouses } from "@/components/FloatingHourses";
import HouseCard from "@/components/HouseCard";
import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import Footer from "@/components/Footer";

// interface House {
//   id: string;
//   title: string;
//   price: number;
//   images: string[];
// }

export default function HomePage() {
  // const [houses, setHouses] = useState<House[]>([]);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();

  const scrollToHouses = () => {
    const housesSection = document.getElementById("houses");
    if (housesSection) {
      housesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // useEffect(() => {
  //   async function fetchHouses() {
  //     const res = await fetch("/api/houses");
  //     const data = await res.json();
  //     setHouses(data);
  //     setLoading(false);
  //   }
  //   fetchHouses();
  // }, []);

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

      {/* House Gallery */}
      <div className="max-w-6xl mx-auto p-6 mt-16 z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Available Tiny Homes
        </h2>

        {
          // loading ? (
          //   <p className="text-center">Loading houses...</p>
          // ) : (
          // <div id="houses" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-100">
          //   {houses.map((house) => (
          //     <div
          //       key={house.id}
          //       className="border rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition"
          //       onClick={() => router.push(`/houses/${house.id}`)}
          //     >
          //       <Image
          //         src={house.images[0] || "/placeholder.jpg"}
          //         alt={house.title}
          //         width={400}
          //         height={300}
          //         className="w-full h-56 object-cover"
          //       />
          //       <div className="p-4">
          //         <h3 className="text-xl font-semibold">{house.title}</h3>
          //         <p className="text-gray-700">
          //           Price: ${house.price.toLocaleString()}
          //         </p>
          //         <Button className="mt-4 w-full">View Details</Button>
          //       </div>
          //     </div>
          //   ))}
          // </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {houses.map((house) => (
              <div
                key={house.id}
                onClick={() => router.push(`/houses/${house.id}`)}
                className="cursor-pointer"
              >
                <HouseCard key={house.id} {...house} />
              </div>
              // <div
              //   key={house.id}
              //   className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]"
              // >
              //   <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              //   <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              //   <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              //   <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              //   <EvervaultCard text="" />

              //   <h2 className="dark:text-white text-black mt-4 text-sm font-light">
              //     Hover over this card to reveal an awesome effect. Running out
              //     of copy here.
              //   </h2>
              //   <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
              //     Watch me hover
              //   </p>
              // </div>
            ))}
          </div>
          // )
        }
      </div>
      <Footer />
    </div>
  );
}
