# AdlaWatt: IoT-Based Portable Off-Grid Solar Energy Harvesting System

An IoT-based mobile application developed using Ionic React and Supabase for monitoring a portable off-grid solar energy harvesting system. The application allows users to monitor real-time solar energy generation, battery status, and energy consumption through a user-friendly mobile interface.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build for Production](#build-for-production)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Changelog](#changelog)

---

## Features

- **User Authentication** — Secure login and user authentication using Supabase.
- **Real-Time Dashboard** — Displays live solar energy generation, battery status, and energy consumption.
- **Battery Monitoring** — Monitor battery percentage and charging status.
- **Energy Monitoring** — View current energy generation and consumption data.
- **Activity Logs** — Displays recent monitoring activities and system events.
- **Notifications** — Receive important system alerts and notifications.
- **Responsive Mobile Interface** — Optimized for Android devices using Ionic Framework.
- **IoT Integration** *(Prototype)* — Connects with the AdlaWatt hardware prototype for real-time monitoring.

> **Note:** Some features may still be under development and are subject to change.

---

## Tech Stack

### Frontend

- Ionic React
- React 18
- TypeScript
- Vite
- CSS

### Backend

- Supabase
- Supabase Authentication
- Supabase Database

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Vercel

---

## Project Structure

```text
AdlaWatt-IoT-AppDev/
├── public/
├── src/
│   ├── components/
│   │   ├── AppHeader.tsx
│   │   ├── AppHeader.css
│   │   ├── BatteryGauge.tsx
│   │   ├── BatteryGauge.css
│   │   ├── SideMenu.tsx
│   │   └── SideMenu.css
│   ├── context/
│   │   ├── AppDataContext.tsx
│   │   └── SettingsContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── pages/
│   │   ├── AboutUs.tsx
│   │   ├── ActivityLog.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Notifications.tsx
│   │   ├── OpeningPage.tsx
│   │   └── Settings.tsx
│   ├── theme/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Database Setup

This project uses **Supabase** as its backend service.

### Requirements

- Supabase Project
- Database Tables *(to be documented)*
- Authentication Enabled

### Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/FrancisAdrianIdul33/AdlaWatt-IoT-AppDev.git
```

Go inside the project.

```bash
cd AdlaWatt-IoT-AppDev
```

Install dependencies.

```bash
npm install
```

---

## Running the Application

Start the development server.

```bash
ionic serve
```

or

```bash
npm run dev
```

The application will be available at

```
http://localhost:8100
```

or

```
http://localhost:5173
```

depending on the selected development mode.

---

## Build for Production

Generate the production build.

```bash
npm run build
```

The compiled files will be generated inside the `dist/` directory.

---

## Deployment

The project is configured for deployment using **Vercel**.

To deploy manually:

```bash
vercel --prod
```

or connect the GitHub repository directly to Vercel for automatic deployments.

---

## Future Improvements

- Real-time IoT communication
- Push notifications
- Energy usage analytics
- Battery health monitoring
- Historical energy reports
- Offline data synchronization
- Multiple device support
- Dark mode
- User profile management

---

## Changelog

### Current Version

- Initial Ionic React project setup
- Dashboard interface
- Battery Gauge component
- Activity Log page
- Notifications page
- Settings page
- About Us page
- Responsive side navigation
- Context API implementation
- Supabase integration *(ongoing)*

---

## Developers

- **Francis Adrian Idul**
- **Troy M. Rojo**
- **Rhics T. Geonzon**

Bachelor of Science in Information Technology

Northern Bukidnon State College

---

## License

This project was developed as an undergraduate capstone project for academic purposes.

Commercial use is prohibited without permission from the authors.