import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shows | Retyped",
  description: "Discover and explore all available podcast shows",
};

export default function ShowsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Hello World - Shows Page</h1>
    </div>
  );
}