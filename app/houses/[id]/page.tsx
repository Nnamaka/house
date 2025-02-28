"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateQuoteModal from "@/components/CreateQuoteModal";
// import { houses1 } from "@/data/houses";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import {
  BedDouble,
  Bath,
  Users,
  PencilRuler,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface HouseSection {
  name: string;
  features: string[];
}

interface House {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  sections: HouseSection[];
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  dimension: string;
}

interface FormattedFeature {
  heading: string;
  content: string;
}

export default function HouseDetailPage() {
  const { id } = useParams();
  const [house, setHouse] = useState<House | null>(null);
  // const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function formatString(inputString: string) {
    return inputString.replace(/(\d+)([A-Za-z])(\d+)/, "$1 $2 $3");
  }

  function parseFeatureText(featureText: string): FormattedFeature[] {
    // Split the text by commas to get individual sections
    const sections = featureText
      .split(",")
      .map((section) => section.trim())
      .filter((section) => section);

    return sections.map((section) => {
      // Find the first colon which indicates the end of a heading
      const colonIndex = section.indexOf(":");

      if (colonIndex !== -1) {
        const heading = section.substring(0, colonIndex + 1).trim();
        const content = section.substring(colonIndex + 1).trim();
        return { heading, content };
      }

      // If no colon is found, treat the whole section as content with no heading
      return { heading: "", content: section };
    });
  }

  // Handle image navigation
  const showNextImage = () => {
    if (!house) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === house.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevImage = () => {
    if (!house) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? house.images.length - 1 : prevIndex - 1
    );
  };

  // Open image viewer with specific image
  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showImageViewer) return;

      if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "Escape") {
        setShowImageViewer(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when modal is open
    if (showImageViewer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [showImageViewer]);

  useEffect(() => {
    async function fetchHouse() {
      const res = await fetch(`/api/houses/${id}`);
      const data = await res.json();
      setHouse(data);

      // Set the first section as active tab if available
      if (data.sections && data.sections.length > 0) {
        setActiveTab(data.sections[0].name);
      }
    }

    if (id) fetchHouse();
  }, [id]);

  if (!house) return <p className="text-center mt-2">loading House</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-14">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <h1 className="text-3xl font-bold mb-4">{house.title}</h1>

        <div
          className="relative w-full h-[60vh] mb-8 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openImageViewer(0)}
        >
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
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openImageViewer(i + 1)}
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

        {/* Image Viewer Modal */}
        {showImageViewer && house.images.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={() => setShowImageViewer(false)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main image */}
              <div className="relative w-4/5 h-4/5">
                <Image
                  src={house.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={showPrevImage}
                className="absolute left-4 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={showNextImage}
                className="absolute right-4 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-40 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {house.images.length}
              </div>
            </div>
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-semibold">SPECIFICATIONS</h2>
          <div className="mt-4 border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-blue-600 font-medium">Square Feet</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {formatString(house.dimension)}
                  </span>
                  <PencilRuler className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-blue-600 font-medium">Sleeps</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{house.sleeps}</span>
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">Bedrooms</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{house.bedrooms}</span>
                  <BedDouble className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">Bathrooms</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{house.bathrooms}</span>
                  <Bath className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="mb-12">
          {/* <p className="mt-6 text-lg">{house.description}</p> */}

          {/* <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">FEATURES</h2>
            <ul className=" ">
              {house.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div> */}
          {/* Sections Tabs - New Addition */}
          {house.sections && house.sections.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">HOUSE SECTIONS</h2>
              <Tabs defaultValue={activeTab} className="w-full">
                <TabsList className="w-full flex flex-wrap mb-8">
                  {house.sections.map((section, index) => (
                    <TabsTrigger
                      key={index}
                      value={section.name}
                      className="flex-grow"
                    >
                      {section.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* {house.sections.map((section, index) => (
                  <TabsContent key={index} value={section.name} className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">{section.name} Features</h3>
                    <ul className="space-y-1">
                      {section.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                ))} */}
                {house.sections.map((section, index) => (
                  <TabsContent
                    key={index}
                    value={section.name}
                    className="border rounded-md p-4"
                  >
                    <h3 className="text-lg font-medium mb-4">
                      {section.name} Features
                    </h3>
                    <div className="space-y-4">
                      {section.features.map((feature, featureIndex) => {
                        const formattedFeatures = parseFeatureText(feature);

                        return (
                          <div key={featureIndex} className="space-y-2">
                            {formattedFeatures.map(
                              (formattedFeature, subIndex) => (
                                <div key={subIndex} className="mb-3">
                                  {formattedFeature.heading && (
                                    <p className="font-bold">
                                      {formattedFeature.heading}
                                    </p>
                                  )}
                                  <p className="ml-4">
                                    {formattedFeature.content}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
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
          price={house.price}
        />
      )}
      <Footer />
    </div>
  );
}
