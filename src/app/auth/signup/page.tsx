import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
        <Link href="/" className="text-3xl font-bold text-white">
          foedr.
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Fördermittel.
            <br />
            <span className="text-gray-500">Automatisiert.</span>
          </h1>
        </div>
        <p className="text-gray-600 text-sm">© 2026 foedr.</p>
      </div>
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-md">
          <h2 className="text-2xl font-bold mb-6">Registrieren</h2>
          <p className="text-gray-600">Auth kommt bald!</p>
          <Link href="/" className="text-black underline mt-4 block">Zurück</Link>
        </div>
      </div>
    </div>
  );
}
