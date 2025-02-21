import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

function Feature() {
  return (
    <div className="relative w-full pb-20 lg:pb-40 px-2">
      <DotPattern
        width={20}
        height={20}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "absolute"
        )}
      ></DotPattern>
      <div className="container mx-auto">
        <div className="flex gap-4 pt-20 lg:pt-30 flex-col items-center">
          <div className="flex flex-col items-center gap-9">
            <div>
              <Badge>QualityProperty</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-center">
                Our Services!
              </h2>
              <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground text-center">
                At QualityProperty, we offer sustainable, modern homes for every
                lifestyle—whether mobile, compact, or cozy. Find your perfect
                space and live intentionally!
              </p>
            </div>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Tiny Homes</p>
                  <p className="text-muted-foreground text-sm">
                    Experience the freedom of minimalist living with our
                    beautifully designed tiny homes—efficient, stylish, and
                    built for modern comfort
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Mobile Homes</p>
                  <p className="text-muted-foreground text-sm">
                    Take your home wherever life takes you! Our mobile homes
                    offer flexibility, affordability, and all the comforts of a
                    traditional home on wheels.
                  </p>
                </div>
              </div>
           
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Manufactured Homes</p>
                  <p className="text-muted-foreground text-sm">
                    High-quality, factory-built homes designed for durability
                    and efficiency. Enjoy affordable homeownership with modern
                    designs and smart layouts.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Prefab Homes</p>
                  <p className="text-muted-foreground text-sm">
                    Fast, affordable, and eco-friendly! Our prefab homes are
                    built off-site and assembled quickly, providing a seamless
                    home-buying experience.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Capsule Homes</p>
                  <p className="text-muted-foreground text-sm">
                    Innovative, compact, and futuristic. Our capsule homes
                    maximize space with smart designs, perfect for urban
                    dwellers or eco-conscious homeowners.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Farm Houses</p>
                  <p className="text-muted-foreground text-sm">
                    Spacious and serene, our farmhouses bring you closer to
                    nature with rustic charm and modern amenities for peaceful
                    country living.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Log Cabins</p>
                  <p className="text-muted-foreground text-sm">
                    Cozy, timeless, and built to last. Our log cabins offer the
                    perfect escape for those who love a warm, rustic lifestyle
                    surrounded by nature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
