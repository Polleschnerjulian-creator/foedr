import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Left side - Branding */}
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
          <p className="text-gray-400 mt-4 max-w-md">
            Die intelligente Plattform für Fördermittel im deutschen Mittelstand.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} foedr. Alle Rechte vorbehalten.
        </p>
      </div>

      {/* Right side - Sign Up */}
      <div className="w-full lg:w-1/2 bg-brand-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="text-3xl font-bold text-brand-black">
              foedr.
            </Link>
          </div>
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none p-0",
                headerTitle: "text-2xl font-bold text-brand-black",
                headerSubtitle: "text-gray-600",
                formButtonPrimary:
                  "bg-brand-black hover:bg-gray-800 text-sm font-medium",
                footerActionLink: "text-brand-black hover:text-gray-600",
              },
            }}
            routing="path"
            path="/auth/signup"
            signInUrl="/auth/login"
            forceRedirectUrl="/onboarding"
          />
        </div>
      </div>
    </div>
  );
}
