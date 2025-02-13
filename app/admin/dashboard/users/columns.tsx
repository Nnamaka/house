"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type QuoteRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customizationRequests: string;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<QuoteRequest>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "customizationRequests",
    header: "Customization Requests",
    cell: ({ row }) => (
      <div className="truncate w-48">
        {row.getValue("customizationRequests")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const quoteRequest = row.original;
      // const router = useRouter();

    //   const handleDeleteQuote = async (id: string) => {
    //     if (confirm("Are you sure you want to delete this quote request?")) {
    //       try {
    //         await fetch(`/api/quote-requests/${id}`, { method: "DELETE" });
    //         alert("Quote request deleted successfully.");
    //       } catch (error) {
    //         console.error("Error deleting quote request:", error);
    //         alert("Failed to delete quote request.");
    //       }
    //     }
    //   };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(quoteRequest.id)}
            >
              Copy Quote ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Customer</DropdownMenuItem>
            <DropdownMenuItem>View Quote Details</DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Chat with Customer */}
            <DropdownMenuItem
            // onClick={() => router.push(`/chat/${quoteRequest.id}`)}
            >
              <Link href={`/chat/${quoteRequest.id}`}>Chat with Customer</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Delete Quote Request */}
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                // handleDeleteQuote(quoteRequest.id)
                console.log("clicked on delete post")
              }}
            >
              Delete Quote Request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
