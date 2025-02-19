"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateQuoteModal from "@/components/CreateQuoteModal";
import { houses1 } from "@/data/houses";
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

export default function HouseDetailPage() {
  const { id } = useParams();
  // const [house, setHouse] = useState<House | null>(null);
  // const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const house = houses1.find((h) => h.id === id);

  if (!house)
    return <p className="text-center mt-10 text-xl">🏠 House not found</p>;

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
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-14">
      
        <NavBar/>
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

        {/* Details Section */}
        <section className="mb-12">
          <p className="mt-6 text-lg">{house.description}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="list-disc pl-5">
              {house.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>
        <Button className="mt-6 mb-5" onClick={() => setShowModal(true)}>
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

// const galleryImages = [
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Modern tiny home interior with white walls and wooden accents",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Exterior view of gray manufactured home",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Interior entrance view",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Exterior side view",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Modern kitchen with dark cabinets",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Living area with kitchen view",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Entrance hallway",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Walk-in shower",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Empty room with windows",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Bedroom with ceiling fan",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Bathroom with shower",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Master bathroom with tub",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Glass shower enclosure",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Bathroom vanity",
//   },
//   {
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-bettertinyhouses-store-details-php-2025-02-19-09_24_25-nKTRB35iLmHRdLRB1o23wJdt4tLA0s.png",
//     alt: "Empty bedroom",
//   },
// ]
