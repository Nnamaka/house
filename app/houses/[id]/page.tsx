"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateQuoteModal from "@/components/CreateQuoteModal";
import { houses1 } from "@/data/houses";

// interface House {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   images: string[];
//   features: string[];
// }

export default function HouseDetailPage() {
  const { id } = useParams();
  // const [house, setHouse] = useState<House | null>(null);
  // const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const house = houses1.find((h) => h.id === id);

  if (!house) return <p className="text-center mt-10 text-xl">🏠 House not found</p>;

  // useEffect(() => {
  //   async function fetchHouse() {
  //     const res = await fetch(`/api/houses/${id}`);
  //     const data = await res.json();
  //     setHouse(data);
  //     setLoading(false);
  //   }

  //   if (id) fetchHouse();
  // }, [id]);

  // if (loading) return <p className="text-center">Loading...</p>;
  if (!house) return <p className="text-center">House not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{house.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {house.images.map((img, index) => (
          <Image key={index} src={img} alt="House Image" width={600} height={400} className="rounded-lg" />
        ))}
      </div>

      <p className="mt-6 text-lg">{house.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc pl-5">
          {house.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <p className="text-xl font-bold mt-4">Price: ${house.price.toLocaleString()}</p>

      <Button className="mt-6" onClick={() => setShowModal(true)}>Get Quote</Button>

      {showModal && <CreateQuoteModal api={true} isOpen={showModal} houseId={house.id} onClose={() => setShowModal(false)} />}
    </div>
  );
}
