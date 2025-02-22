"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateQuoteModal from "@/components/CreateQuoteModal";
// import { houses1 } from "@/data/houses";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";

// interface House {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   images: string[];
//   features: string[];
// }

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

export default function HouseDetailPage() {
  const { id } = useParams();
  const [house, setHouse] = useState<House | null>(null);
  // const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // const house = houses1.find((h) => h.id === id);

  // if (!house)
  //   return <p className="text-center mt-10 text-xl">🏠 House not found</p>;
  function formatString(inputString: string) {
    return inputString.replace(/(\d+)([A-Za-z])(\d+)/, '$1 $2 $3');
  }
  useEffect(() => {
    async function fetchHouse() {
      const res = await fetch(`/api/houses/${id}`);
      const data = await res.json();
      setHouse(data);
      // setLoading(false);
    }

    if (id) fetchHouse();
  }, [id]);

  // if (loading) return <p className="text-center">Loading...</p>;
  if (!house) return <p className="text-center">House loading</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-14">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-4">{house.title}</h1>

        <div className="relative w-full h-[60vh] mb-8 rounded-lg overflow-hidden">
          <Image
            src={house.images[0] || "/placeholder.svg"}
            alt={house.images[0]}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {house.images.slice(1).map((image, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={image}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold">SPECIFICATIONS</h2>
          <div className="mt-4 border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* <div className="flex justify-between border-b pb-2">
                <span className="text-blue-600 font-medium">
                  BASE PRICE (USD)
                </span>
                <span className="font-semibold">
                  ${house.price.toLocaleString()}
                </span>
              </div> */}
              <div className="flex justify-between border-b pb-2">
                <span className="text-blue-600 font-medium">Square Feet</span>
                <span className="font-semibold">{formatString(house.dimension)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-blue-600 font-medium">Sleeps</span>
                <span className="font-semibold">{house.sleeps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">Bedrooms</span>
                <span className="font-semibold">{house.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">Bathrooms</span>
                <span className="font-semibold">{house.bathrooms}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="mb-12">
          {/* <p className="mt-6 text-lg">{house.description}</p> */}

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">FEATURES</h2>
            <ul className=" ">
              {house.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
        <Button className=" mb-5" onClick={() => setShowModal(true)}>
          Get Quote
        </Button>
      </main>

      {showModal && (
        <CreateQuoteModal
          api={true}
          isOpen={showModal}
          houseId={house.id}
          onClose={() => setShowModal(false)}
        />
      )}
      <Footer />
    </div>
  );
}
