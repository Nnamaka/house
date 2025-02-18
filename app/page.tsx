"use client";

// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import houses from "@/data/houses";
import NavBar from "@/components/Navbar";
import { FloatingHouses } from "@/components/FloatingHourses";
import HouseCard from "@/components/HouseCard";

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
      <div id="home" className="mb-4 ">
        <NavBar />
        <div className="-z-30">
          <FloatingHouses scroll={scrollToHouses} />
        </div>
      </div>

      {/* House Gallery */}
      <div className="max-w-6xl mx-auto p-6 mt-16 z-10">
        <h2 className="text-2xl font-bold mb-6">Available Tiny Homes</h2>

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
              >
                <HouseCard key={house.id} {...house} />
              </div>
            ))}
          </div>
          // )
        }
      </div>

      {/* footer */}
      <footer id="footer" className="bg-gray-200 p-6 mt-8">
        {" "}
        {/* Added ID and margin */}
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2023 Tiny Homes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
