
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
  delay?: number;
  highlight?: boolean;
}

const StatCard = ({ label, value, className, delay = 0, highlight = false }: StatCardProps) => {
  return (
    <div 
      className={cn(
        "stat-card opacity-0 animate-slide-up",
        highlight && "border-highlight/30",
        className
      )} 
      style={{ animationDelay: `${0.3 + delay * 0.1}s` }}
    >
      <div className="stat-label">{label}</div>
      <div className={cn("stat-value", highlight && "text-highlight")}>{value}</div>
    </div>
  );
};

export default StatCard;
