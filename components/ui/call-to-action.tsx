import Link from "next/link";
import { Button } from "./button";
import { GraduationCap } from "lucide-react";
export default function CTA() {
  return (
    <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-6 text-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Join our community of learners and take the first step towards your
            goals.
          </p>
        </div>
        <Link href="/dashboard" prefetch={null} passHref>
          <Button className="w-auto bg-white text-indigo-600  hover:bg-gray-100 transition-colors justify-start">
            <GraduationCap className="w-6 h-6 mr-2" /> Get Started Today
          </Button>
        </Link>
      </div>
    </section>
  );
}
