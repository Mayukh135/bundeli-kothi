import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  centered = true,
  className,
  light = false
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "max-w-3xl mb-10",
      centered && "mx-auto text-center",
      className
    )}>
      <span className={cn(
        "text-xs font-bold uppercase tracking-[0.2em] mb-3 block text-accent",
      )}>
        {subtitle}
      </span>
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-serif mb-5 leading-tight",
        light ? "text-white" : "text-foreground"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-lg leading-relaxed",
          light ? "text-white/80" : "text-muted-foreground"
        )}>
          {description}
        </p>
      )}
      <div className={cn(
        "w-20 h-1 bg-accent mt-6",
        centered && "mx-auto"
      )} />
    </div>
  );
}
