"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RiTiktokLine } from "react-icons/ri";
// import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Moon, Sun, Truck } from "lucide-react";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  // const [isChatOpen, setIsChatOpen] = React.useState(false)
  const tiktokUrl =
    "https://www.tiktok.com/@quality._property?_t=ZM-8uC2Tx0BbrJ&_r=1";
  const facebookUrl =
    "https://www.facebook.com/share/14swKcbbAv/?mibextid=LQQJ4d";

  const handleTiktokClick = () => {
    window.open(tiktokUrl, "_blank"); // Opens the URL in a new tab
  };

  const handleFacebookClick = () => {
    window.open(facebookUrl, "_blank");
  };
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-lg font-semibold tracking-tight h-auto">
              Distribution & Delivery
            </h2>
            <div className="flex gap-2 items-start ">
              <Truck />
              <p className="mb-6 text-muted-foreground">
                Delivery: To all states in the US
              </p>
            </div>
            <div className="flex gap-2 items-start ">
              {/* <Map /> */}
              <p className="mb-6 text-muted-foreground">
                Distribution: Through Texas, Arkansas, California, Chicago,
                Georgia, South Carolina, North Carolina
              </p>
            </div>
            {/* <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form> */}
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#home"
                className="block transition-colors hover:text-primary"
              >
                Home
              </a>
              <a
                href="/about"
                className="block transition-colors hover:text-primary"
              >
                About Us
              </a>
              {/* <a href="#" className="block transition-colors hover:text-primary">
                Services
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Products
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Contact
              </a> */}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Sonoma Pointe Dr</p>
              <p>Columbus, GA 31909</p>
              <p>Phone: +17069065674, +15013098321</p>
              <p>Email: qualityproperty28@gmail.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={handleFacebookClick}
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={handleTiktokClick}
                    >
                      {/* <Twitter className="h-4 w-4" /> */}
                      <RiTiktokLine className="h-4 w-4" />
                      <span className="sr-only">Tiktok</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Tiktok</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2015 QualityProperty. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            {/* <a href="#" className="transition-colors hover:text-primary">
              Cookie Settings
            </a> */}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
