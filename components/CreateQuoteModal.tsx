"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type FinancingType = "CASH" | "MORTGAGE" | "LEASE_TO_OWN" | "UNDECIDED";

const quoteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  customizationRequests: z
    .string()
    .min(5, "Customization request must be at least 5 characters"),
  houseId: z.string().min(1, "House ID is required"),
  // Optional fields
  preferredFinancing: z
    .enum(["CASH", "MORTGAGE", "LEASE_TO_OWN", "UNDECIDED"])
    .optional(),
  desiredMoveInDate: z.date().optional(),
  estimatedBudget: z.number().positive().optional(),
});
type QuoteFormData = z.infer<typeof quoteSchema>;

const CreateQuoteModal = ({
  isOpen,
  api,
  houseId,
  onClose,
  price
}: {
  isOpen: boolean;
  api?: boolean;
  houseId?: string;
  onClose: () => void;
  price?: number;
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (houseId) {
      setValue("houseId", houseId); // Set houseId when modal opens
      setValue("estimatedBudget", price);
    }
  }, [houseId, setValue, price]);
  
  const onSubmit = async (data: QuoteFormData) => {
    try {
      setLoading(true);
      console.log("Submitting quote:", data);

      if (api || houseId) {
        console.log("api is active");
        // Send email to admin first
        const emailResponse = await fetch("/api/make-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (!emailResponse.ok) throw new Error("Failed to send email");
      }

      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create quote");
      toast({
        title: "Quote Created Successfully",
        description: `Quote for ${data.firstName} ${data.lastName}has been created.`,
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
  const moveInDate = watch("desiredMoveInDate");

  return (
   
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[480px] p-7">
        <DialogHeader>
          <DialogTitle>{api ? "Request Quote" : "Create Quote"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <Input
                  {...register("firstName")}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <Input
                  {...register("lastName")}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
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
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Preferred Financing (Optional)
                </label>
                <Select
                  onValueChange={(value: FinancingType) =>
                    setValue("preferredFinancing", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select financing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH">Cash</SelectItem>
                    <SelectItem value="MORTGAGE">Mortgage</SelectItem>
                    <SelectItem value="LEASE_TO_OWN">Lease to Own</SelectItem>
                    <SelectItem value="UNDECIDED">Undecided</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Desired Move-in Date (Optional)
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {moveInDate ? (
                        format(moveInDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={moveInDate}
                      onSelect={(date) => setValue("desiredMoveInDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Estimated Budget (Optional)
                </label>
                <Input
                  type="number"
                  {...register("estimatedBudget", { valueAsNumber: true })}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          {/* Full Width Fields */}
          <div>
            <label className="block text-sm font-medium">
              Customization Requests
            </label>
            <Textarea
              {...register("customizationRequests")}
              placeholder="Enter customization requests"
              className="h-32"
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {!api ? loading ? "Creating..." : "Create Quote": loading ? "Requesting..." : "Request Quote"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuoteModal;
