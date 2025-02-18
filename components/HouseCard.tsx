import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  price,
  images,
  location,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bedrooms,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bathrooms,
  dimensions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sleeps,
}: HouseProps) {
  return (
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
