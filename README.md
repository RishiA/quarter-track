
# Fiscal Quarter Tracker

A simple, intuitive web application that tracks and displays information about the current fiscal quarter.

## Overview

This application provides at-a-glance information about the current fiscal quarter, including:

- Current quarter and fiscal year (FY format)
- Start and end dates of the current quarter
- Number of weeks into the quarter
- Days remaining in the quarter
- Completion percentage
- And more!

![Fiscal Quarter Tracker](public/og-image.png)

## Features

- **Real-time tracking**: Automatically calculates where you are in the current fiscal quarter
- **Fiscal year support**: Based on a June-May fiscal year calendar
- **Visual progress indicators**: Easy-to-read progress bars show completion percentage
- **Responsive design**: Works on desktop and mobile devices

## Fiscal Year Definition

This application uses a fiscal year that runs from June to May:

- **Q1**: June 1 - August 31
- **Q2**: September 1 - November 30
- **Q3**: December 1 - February 28/29
- **Q4**: March 1 - May 31

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn/ui component library
- date-fns for date calculations

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd fiscal-quarter-tracker
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Deployment

This project can be deployed to any static site hosting service like Netlify, Vercel, or GitHub Pages.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
