
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCta?: {
    text: string;
    link: string;
  };
  imagePosition?: "left" | "right";
  className?: string;
}

export const HeroSection = ({
  title,
  subtitle,
  image,
  ctaText = "Shop Now",
  ctaLink = "/products",
  secondaryCta,
  imagePosition = "right",
  className,
}: HeroSectionProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "grid items-center gap-12 py-16 md:py-24",
          "grid-cols-1 md:grid-cols-2",
          imagePosition === "left" && "md:flex-row-reverse"
        )}>
          <div className={`${imagePosition === "left" ? "md:order-2" : ""} flex flex-col items-start space-y-6 text-left`}>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="max-w-[600px] text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full bg-leafy-500 hover:bg-leafy-600">
                <Link to={ctaLink}>
                  {ctaText}
                </Link>
              </Button>
              {secondaryCta && (
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={secondaryCta.link}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className={`${imagePosition === "left" ? "md:order-1" : ""} relative h-full min-h-[300px] w-full overflow-hidden rounded-2xl`}>
            <img
              src={image}
              alt="Hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
