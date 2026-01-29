import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mt-2">Kommt bald!</p>
      <Link href="/" className="text-black underline mt-4 block">Zurück zur Startseite</Link>
    </div>
  );
}
