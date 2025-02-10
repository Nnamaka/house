"use client";

// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import houses from "@/data/houses";

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
    <div>
      {/* Hero Section */}
      <div className="h-[50vh] bg-gray-900 text-white flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-4xl font-bold">Find Your Perfect Tiny Home</h1>
        <p className="text-lg mt-4 max-w-xl">
          Explore our collection of modern and affordable tiny homes.
        </p>
      </div>

      {/* House Gallery */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Available Tiny Homes</h2>
        
        {
        // loading ? (
        //   <p className="text-center">Loading houses...</p>
        // ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <div
                key={house.id}
                className="border rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition"
                onClick={() => router.push(`/houses/${house.id}`)}
              >
                <Image
                  src={house.images[0] || "/placeholder.jpg"}
                  alt={house.title}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{house.title}</h3>
                  <p className="text-gray-700">Price: ${house.price.toLocaleString()}</p>
                  <Button className="mt-4 w-full">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        // )
        }
      </div>
    </div>
  );
}
