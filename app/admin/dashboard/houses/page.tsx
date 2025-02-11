import houses from "@/data/houses";

export default function HousesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Houses</h1>
      <ul className="space-y-4">
        {houses.map((house) => (
          <li key={house.id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">{house.title}</h3>
            <p>Price: ${house.price.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
