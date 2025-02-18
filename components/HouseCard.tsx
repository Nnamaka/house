import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedIcon, BathIcon, RulerIcon, UsersRound } from "lucide-react";

interface HouseProps {
  id: string;
  title: string;
  price: number;
  images: string[];
  location: string;
  bedrooms: number;
  bathrooms: number;
  dimensions: string;
  sleeps: number;
}

export default function HouseCard({
  id,
  title,
  price,
  images,
  location,
  bedrooms,
  bathrooms,
  dimensions,
  sleeps,
}: HouseProps) {
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden border">
      <div className="relative">
        <Image
          src={images[0]}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-blue-500 text-white">Featured</Badge>
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">Starting at ${price.toLocaleString()}</p>
        <p className="text-sm font-medium text-gray-700 mt-1">
          📍 <span className="text-blue-600">{location}</span>
        </p>
        <div className="flex items-center justify-between mt-3 text-gray-600">
          <div className="flex items-center gap-1">
            <BedIcon className="text-blue-500" /> {bedrooms} Bedroom
          </div>
          <div className="flex items-center gap-1">
            <BathIcon className="text-blue-500" /> {bathrooms} Bath
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-gray-600">
          <div className="flex items-center gap-1">
            <RulerIcon className="text-blue-500" /> {dimensions}
          </div>
          <div className="flex items-center gap-1">
            <UsersRound className="text-blue-500" /> Sleeps {sleeps}
          </div>
        </div>
        <Button variant="default" className="w-full mt-4" asChild>
          <a href={`/houses/${id}`}>View Details</a>
        </Button>
      </CardContent>
    </Card>
  );
}
