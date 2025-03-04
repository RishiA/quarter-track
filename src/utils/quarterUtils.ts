
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
  fiscalYear: string;
}

export function getCurrentQuarterInfo(): QuarterInfo {
  const today = startOfDay(new Date());
  const currentMonth = getMonth(today);
  const calendarYear = getYear(today);
  
  // Determine fiscal year
  // If we're in Jan-May, we're in the previous calendar year's fiscal year
  // If we're in Jun-Dec, we're in the current calendar year's fiscal year
  const fiscalYearStart = currentMonth < 5 ? calendarYear - 1 : calendarYear;
  const fiscalYearEnd = fiscalYearStart + 1;
  const fiscalYear = `FY${fiscalYearStart}-${fiscalYearEnd.toString().slice(2)}`;
  
  // Define quarters based on fiscal year (June to May)
  const q1Start = new Date(fiscalYearStart, 5, 1); // Jun 1
  const q1End = new Date(fiscalYearStart, 7, 31); // Aug 31
  
  const q2Start = new Date(fiscalYearStart, 8, 1); // Sep 1
  const q2End = new Date(fiscalYearStart, 10, 30); // Nov 30
  
  const q3Start = new Date(fiscalYearStart, 11, 1); // Dec 1
  const q3End = new Date(fiscalYearEnd, 1, 28); // Feb 28/29
  // Adjust for leap years - simplified approach
  if (fiscalYearEnd % 4 === 0 && (fiscalYearEnd % 100 !== 0 || fiscalYearEnd % 400 === 0)) {
    q3End.setDate(29);
  }
  
  const q4Start = new Date(fiscalYearEnd, 2, 1); // Mar 1
  const q4End = new Date(fiscalYearEnd, 4, 31); // May 31
  
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
    currentYear: calendarYear,
    currentDate: today,
    startDate,
    endDate,
    totalWeeks,
    currentWeek,
    daysRemaining,
    percentComplete,
    percentRemaining,
    timestamp,
    fiscalYear
  };
}

/**
 * Simple helper to pluralize words based on count.
 */
export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}
