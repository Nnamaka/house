
import { QuoteRequest, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): QuoteRequest[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      firstName: "Michael",
      lastName: "Smith",
      email: "michael@example.com",
      phone: "+1 555-1234",
      customizationRequests: "I want a bigger kitchen with modern cabinets.",
      status: "pending",
    },
    {
      id: "489e1d42",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@gmail.com",
      phone: "+1 555-5678",
      customizationRequests: "Can I get solar panels added?",
      status: "processing",
    },
    {
      id: "m5gr84i9",
      firstName: "Kevin",
      lastName: "Williams",
      email: "kevin@yahoo.com",
      phone: "+1 555-8765",
      customizationRequests: "Please add an extra bathroom.",
      status: "success",
    },
    {
      id: "3u1reuv4",
      firstName: "Emily",
      lastName: "Brown",
      email: "emily@gmail.com",
      phone: "+1 555-1122",
      customizationRequests: "I need a home office space with soundproofing.",
      status: "success",
    },
    {
      id: "derv1ws0",
      firstName: "Daniel",
      lastName: "Martinez",
      email: "daniel44@gmail.com",
      phone: "+1 555-3344",
      customizationRequests: "Custom wood flooring and smart home automation.",
      status: "processing",
    },
    {
      id: "5kma53ae",
      firstName: "Sophia",
      lastName: "Garcia",
      email: "sophia@gmail.com",
      phone: "+1 555-5566",
      customizationRequests:
        "Would like a walk-in closet in the master bedroom.",
      status: "success",
    },
    {
      id: "bhqecj4p",
      firstName: "David",
      lastName: "Miller",
      email: "david@hotmail.com",
      phone: "+1 555-7788",
      customizationRequests: "Extra large patio for entertaining guests.",
      status: "failed",
    },
    {
      id: "q1a2b3c4",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8901",
      customizationRequests:
        "Need a bigger kitchen space and an extra bedroom.",
      status: "pending",
    },
    {
      id: "x9y8z7w6",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+44 1234 567890",
      customizationRequests:
        "Prefer wooden flooring and modern lighting setup.",
      status: "processing",
    },
    {
      id: "m5gr84i9",
      firstName: "Ken",
      lastName: "Adams",
      email: "ken99@yahoo.com",
      phone: "+33 765 432 198",
      customizationRequests: "Want a garden space with a small fountain.",
      status: "success",
    },
    {
      id: "3u1reuv4",
      firstName: "Abe",
      lastName: "Martin",
      email: "Abe45@gmail.com",
      phone: "+49 123 456 7890",
      customizationRequests: "Would like solar panels installed.",
      status: "success",
    },
    {
      id: "derv1ws0",
      firstName: "Monserrat",
      lastName: "Brown",
      email: "Monserrat44@gmail.com",
      phone: "+1 987 654 3210",
      customizationRequests: "Interested in a smart home system.",
      status: "processing",
    },
    {
      id: "5kma53ae",
      firstName: "Silas",
      lastName: "Johnson",
      email: "Silas22@gmail.com",
      phone: "+61 456 789 123",
      customizationRequests: "Would like an underground wine cellar.",
      status: "success",
    },
    {
      id: "bhqecj4p",
      firstName: "Carmella",
      lastName: "Hernandez",
      email: "carmella@hotmail.com",
      phone: "+81 789 456 123",
      customizationRequests: "Needs extra security features.",
      status: "failed",
    },
    {
      id: "q1a2b3c4",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8901",
      customizationRequests: "Need a bigger kitchen space and an extra bedroom.",
      status: "pending",
    },
    {
      id: "x9y8z7w6",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+44 1234 567890",
      customizationRequests: "Prefer wooden flooring and modern lighting setup.",
      status: "processing",
    },
    {
      id: "m5gr84i9",
      firstName: "Ken",
      lastName: "Adams",
      email: "ken99@yahoo.com",
      phone: "+33 765 432 198",
      customizationRequests: "Want a garden space with a small fountain.",
      status: "success",
    },
    {
      id: "3u1reuv4",
      firstName: "Abe",
      lastName: "Martin",
      email: "Abe45@gmail.com",
      phone: "+49 123 456 7890",
      customizationRequests: "Would like solar panels installed.",
      status: "success",
    },
    {
      id: "derv1ws0",
      firstName: "Monserrat",
      lastName: "Brown",
      email: "Monserrat44@gmail.com",
      phone: "+1 987 654 3210",
      customizationRequests: "Interested in a smart home system.",
      status: "processing",
    },
    {
      id: "5kma53ae",
      firstName: "Silas",
      lastName: "Johnson",
      email: "Silas22@gmail.com",
      phone: "+61 456 789 123",
      customizationRequests: "Would like an underground wine cellar.",
      status: "success",
    },
    {
      id: "bhqecj4p",
      firstName: "Carmella",
      lastName: "Hernandez",
      email: "carmella@hotmail.com",
      phone: "+81 789 456 123",
      customizationRequests: "Needs extra security features.",
      status: "failed",
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Requested Quotes</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
