
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getCurrentQuarterInfo, type QuarterInfo } from "@/utils/quarterUtils";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";

const Index = () => {
  const [quarterInfo, setQuarterInfo] = useState<QuarterInfo | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get quarter info and update state
    const info = getCurrentQuarterInfo();
    setQuarterInfo(info);
    setMounted(true);

    // Update every minute
    const interval = setInterval(() => {
      setQuarterInfo(getCurrentQuarterInfo());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!quarterInfo || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-highlight rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="quarter-heading">
            <span className="highlight-text">{quarterInfo.currentWeek} weeks</span> into{" "}
            <span className="highlight-text">
              {quarterInfo.currentQuarter}, {quarterInfo.fiscalYear}
            </span>{" "}
            <span className="text-gray-400 text-lg md:text-xl lg:text-2xl font-normal">
              (week {quarterInfo.currentWeek} of {quarterInfo.totalWeeks})
            </span>
          </h1>
          
          <h2 className="quarter-subheading">
            The quarter started{" "}
            <span className="highlight-text">
              {format(quarterInfo.startDate, "EEEE, dd MMMM")}
            </span>{" "}
            and will end{" "}
            <span className="highlight-text">
              {format(quarterInfo.endDate, "EEEE, dd MMMM")}
            </span>
          </h2>
        </header>

        {/* Progress Section */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <ProgressBar 
            percent={quarterInfo.percentComplete} 
            label="Quarter Progress" 
            height="h-4" 
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Weeks Completed"
            value={`${quarterInfo.currentWeek} of ${quarterInfo.totalWeeks}`}
            delay={1}
            highlight
          />
          
          <StatCard
            label="Days Remaining"
            value={quarterInfo.daysRemaining}
            delay={2}
          />
          
          <StatCard
            label="Quarter Completion"
            value={`${quarterInfo.percentComplete}%`}
            delay={3}
          />
          
          <StatCard
            label="Start Date"
            value={format(quarterInfo.startDate, "dd MMM, yyyy")}
            delay={4}
          />
          
          <StatCard
            label="End Date"
            value={format(quarterInfo.endDate, "dd MMM, yyyy")}
            delay={5}
          />
          
          <StatCard
            label="Fiscal Year"
            value={quarterInfo.fiscalYear}
            delay={6}
            highlight
          />
        </div>

        {/* Footer */}
        <footer className="text-center opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
          <p className="subtle-text">
            Last updated: {quarterInfo.timestamp}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
