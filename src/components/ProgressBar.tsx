
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percent: number;
  label?: string;
  className?: string;
  height?: string;
}

const ProgressBar = ({ 
  percent, 
  label, 
  className,
  height = "h-2"
}: ProgressBarProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <div className="flex justify-between items-center text-sm">
        <span>{label}</span>
        <span className="font-medium">{percent}%</span>
      </div>}
      <div className={cn("progress-bar", height)}>
        <div 
          className="progress-fill animate-pulse-slow" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
