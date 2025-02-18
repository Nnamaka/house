import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedIcon, BathIcon, RulerIcon, UsersRound } from "lucide-react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

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
    // <Card className="shadow-lg  overflow-hidden border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
    //   <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
    //     <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
    //     <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
    //     <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
    //     <EvervaultCard text="hover" />

    //   <div className="absolute">
    //     <Image
    //       src={images[0]}
    //       alt={title}
    //       width={400}
    //       height={250}
    //       className="w-full h-48 object-cover"
    //     />
    //     <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
    //       Featured
    //     </Badge>
    //   </div>
    //   <CardContent className="p-4">
    //     <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    //     <p className="text-sm text-gray-600">
    //       Starting at ${price.toLocaleString()}
    //     </p>
    //     <p className="text-sm font-medium text-gray-700 mt-1">
    //       📍 <span className="text-blue-600">{location}</span>
    //     </p>
    //     <div className="flex items-center justify-between mt-3 text-gray-600">
    //       <div className="flex items-center gap-1">
    //         <BedIcon className="text-blue-500" /> {bedrooms} Bedroom
    //       </div>
    //       <div className="flex items-center gap-1">
    //         <BathIcon className="text-blue-500" /> {bathrooms} Bath
    //       </div>
    //     </div>
    //     <div className="flex items-center justify-between mt-2 text-gray-600">
    //       <div className="flex items-center gap-1">
    //         <RulerIcon className="text-blue-500" /> {dimensions}
    //       </div>
    //       <div className="flex items-center gap-1">
    //         <UsersRound className="text-blue-500" /> Sleeps {sleeps}
    //       </div>
    //     </div>
    //     <Button variant="default" className="w-full mt-4" asChild>
    //       <a href={`/houses/${id}`}>View Details</a>
    //     </Button>
    //   </CardContent>
    //   {/* <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]"> */}
    //     {/* <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
    //     <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
    //     <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
    //     <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" /> */}

    //     {/* <EvervaultCard text="hover" /> */}

    //     {/* <h2 className="dark:text-white text-black mt-4 text-sm font-light">
    //       Hover over this card to reveal an awesome effect. Running out of copy
    //       here.
    //     </h2>
    //     <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
    //       Watch me hover
    //     </p> */}
    //   {/* </div> */}
    // </Card>
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[27rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="" className="-z-10 h-[300px] cursor-default" />
      <Card className=" absolute left-[1px] top-[20px]">
        <div className="">
          <Image
            src={images[0]}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
            Featured
          </Badge>
        </div>
      </Card>

      <h2 className="dark:text-white text-black mt-4 text-sm font-light cursor-default">
        {/* Hover over this card to reveal an awesome effect. Running out of copy
        here. */}
        {location}
      </h2>
      <h2 className="dark:text-white text-black mt-2 text-sm font-light cursor-default">
        {dimensions}
      </h2>
      <a
        href={`/houses/${id}`}
        className="cursor-pointer text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5"
      >
        View Details
      </a>
    </div>
  );
}
