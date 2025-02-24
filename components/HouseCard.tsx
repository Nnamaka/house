import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/evervault-card";
import { BedDouble, Bath, Users, PencilRuler } from "lucide-react";

interface HouseProps {
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
export default function HouseCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  price,
  images,
  // location,
  bedrooms,
  bathrooms,
  dimension,
  sleeps,
}: HouseProps) {
  function formatString(inputString: string) {
    return inputString.replace(/(\d+)([A-Za-z])(\d+)/, "$1 $2 $3");
  }
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[27rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      <h1 className="mb-8">{title}</h1>
      {/* <EvervaultCard text="" className="-z-10 h-[300px] cursor-default" /> */}
      <Card className="  left-[1px] top-[20px]">
        <div className="">
          <Image
            src={images[0]}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        </div>
      </Card>

      <div className="flex justify-end items-center gap-24 py-4">
        {/* bedroom and bathroom */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center gap-2">
            <BedDouble className="w-4 h-4" />
            <h2 className="dark:text-white text-black text-sm font-light cursor-default">
              Bedroom {bedrooms}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Bath className="w-4 h-4" />
            <h2 className="dark:text-white text-black text-sm font-light cursor-default">
              Bathroom {bathrooms}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-start">
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            <h2 className="dark:text-white text-black text-sm font-light cursor-default">
              sleep {sleeps}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <PencilRuler className="w-4 h-4" />
            <h2 className="dark:text-white text-black text-sm font-light cursor-default">
              {formatString(dimension)}
            </h2>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        <h2 className="dark:text-white text-black text-sm font-light cursor-default">
          {location}
        </h2>
      </div> */}
      {/* <a
        href={`/houses/${id}`}
        className="cursor-pointer text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5"
      >
        View Details
      </a> */}
    </div>
  );
}
