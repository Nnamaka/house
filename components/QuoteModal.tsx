"use client";

import { useState } from "react";
// DialogClose can be added in the future if needed
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuoteModalProps {
  houseId: string;
  onClose: () => void;
}

export function QuoteModal({ houseId, onClose }: QuoteModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/houses/getquote", {
      method: "POST",
      body: JSON.stringify({ houseId, email, message }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      alert("Quote request sent!");
      onClose();
    } else {
      alert("Error sending quote");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogTitle>Request a Quote</DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Additional Details"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Submit"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
