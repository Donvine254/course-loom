import { Testimonial } from "@/constants/testimonials";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-card backdrop-blur-sm rounded-xl p-6 shadow dark:shadow-indigo-500 hover:shadow-xl transition-all duration-300 border border-input animate-fade-in">
      <div className="flex items-start gap-4">
        <Image
          width={48}
          height={48}
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1.5em"
                height="1.5em"
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}>
                <path
                  fill="currentColor"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        {testimonial.description}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        {new Date(testimonial.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};
