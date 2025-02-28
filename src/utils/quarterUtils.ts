
import { addDays, differenceInCalendarDays, differenceInWeeks, format, getMonth, getYear, isAfter, isBefore, startOfDay } from "date-fns";

export interface QuarterInfo {
  currentQuarter: string;
  currentYear: number;
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  totalWeeks: number;
  currentWeek: number;
  daysRemaining: number;
  percentComplete: number;
  percentRemaining: number;
  timestamp: string;
}

export function getCurrentQuarterInfo(): QuarterInfo {
  const today = startOfDay(new Date());
  const currentYear = getYear(today);
  
  // Define quarters
  const q1Start = new Date(currentYear, 0, 1); // Jan 1
  const q1End = new Date(currentYear, 2, 31); // Mar 31
  
  const q2Start = new Date(currentYear, 3, 1); // Apr 1
  const q2End = new Date(currentYear, 5, 30); // Jun 30
  
  const q3Start = new Date(currentYear, 6, 1); // Jul 1
  const q3End = new Date(currentYear, 8, 30); // Sep 30
  
  const q4Start = new Date(currentYear, 9, 1); // Oct 1
  const q4End = new Date(currentYear, 11, 31); // Dec 31
  
  // Determine current quarter
  let currentQuarter = "Q1";
  let startDate = q1Start;
  let endDate = q1End;
  
  if (isAfter(today, q1End)) {
    if (isBefore(today, q3Start)) {
      currentQuarter = "Q2";
      startDate = q2Start;
      endDate = q2End;
    } else if (isBefore(today, q4Start)) {
      currentQuarter = "Q3";
      startDate = q3Start;
      endDate = q3End;
    } else {
      currentQuarter = "Q4";
      startDate = q4Start;
      endDate = q4End;
    }
  }
  
  // Calculate weeks
  const totalWeeks = Math.ceil(differenceInCalendarDays(endDate, startDate) / 7);
  const currentWeek = Math.min(
    totalWeeks,
    Math.ceil(differenceInWeeks(today, startDate) + 1)
  );
  
  // Calculate days remaining
  const daysRemaining = Math.max(0, differenceInCalendarDays(endDate, today));
  
  // Calculate quarter completion percentage
  const totalDays = differenceInCalendarDays(endDate, startDate) + 1;
  const daysPassed = differenceInCalendarDays(today, startDate);
  const percentComplete = Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100)));
  const percentRemaining = 100 - percentComplete;
  
  // Generate timestamp
  const timestamp = format(new Date(), "EEE, dd MMM yyyy HH:mm:ss xxxx");
  
  return {
    currentQuarter,
    currentYear,
    currentDate: today,
    startDate,
    endDate,
    totalWeeks,
    currentWeek,
    daysRemaining,
    percentComplete,
    percentRemaining,
    timestamp
  };
}
