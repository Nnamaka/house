"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const quoteSchema = z.object({
  customerName: z
    .string()
    .min(3, "Customer name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  customizationRequests: z
    .string()
    .min(5, "Customization request must be at least 5 characters"),
  houseId: z.string().min(1, "House ID is required"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const CreateQuoteModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: QuoteFormData) => {
    console.log("Form submitted with data:", data);
    try {
      setLoading(true);
      console.log("Submitting quote:", data);

      const formattedData = {
        firstName: data.customerName.split(" ")[0] || "Unknown",
        lastName: data.customerName.split(" ")[1] || "Unknown",
        email: data.email,
        phone: data.phone,
        customizationRequests: data.customizationRequests,
        houseId: data.houseId,
      };

      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to create quote");
      toast({
        title: "Quote Created Successfully",
        description: `Quote for ${formattedData.firstName} has been created.`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      reset();
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Failed to create quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <Input
              {...register("customerName")}
              placeholder="Enter full name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-xs">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <Input
              type="tel"
              {...register("phone")}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium">Description</label>
            <Input
              {...register("description")}
              placeholder="Enter customization request"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div> */}

          <div>
            <label className="block text-sm font-medium">
              Customization Requests
            </label>
            <Input
              {...register("customizationRequests")}
              placeholder="Enter customization request"
            />
            {errors.customizationRequests && (
              <p className="text-red-500 text-xs">
                {errors.customizationRequests.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">House ID</label>
            <Input {...register("houseId")} placeholder="Enter House ID" />
            {errors.houseId && (
              <p className="text-red-500 text-xs">{errors.houseId.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Quote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuoteModal;
