import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="space-y-4 animate-fade-in [animation-delay:200ms]">
        <div className="inline-block px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-600 mb-4">
          404 Error
        </div>

        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h1>

        <p className="text-gray-600 max-w-md mx-auto mb-8">
          It seems you&apos;ve wandered into uncharted territory. Let&apos;s get
          you back on track.
        </p>

        <div className="animate-fade-in [animation-delay:400ms]">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors h-12">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
      <Image
        src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737404563/illustrations/undraw_taken_mshk_emnw1v.svg"
        width={300}
        height={300}
        alt="illustration"
      />
    </div>
  );
}
