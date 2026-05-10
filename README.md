# ✈️ Traveloop — Personalized Travel Planning Made Easy

A full-featured travel planning web application built with **React + Vite**, powered by **GroqCloud AI** for intelligent trip planning.

---

## 🚀 Features

| Feature               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| ✨ AI Trip Planner     | Enter city, days, budget — GroqCloud AI generates full itinerary |
| 🗺️ Itinerary Builder | Build day-wise trip plans manually                               |
| 🔍 City Search        | Discover destinations with filters                               |
| 🎯 Activity Search    | Browse activities by category & cost                             |
| 💰 Budget Planner     | Track expenses with visual breakdown                             |
| 🎒 Packing Checklist  | Manage packing list by category                                  |
| 📝 Trip Notes         | Add notes per trip/stop                                          |
| 👥 Community          | Explore trips shared by other travelers                          |
| 🧾 Invoice            | Generate expense invoice per trip                                |
| 📊 Admin Dashboard    | Platform analytics (admin only)                                  |

---

## 🤖 AI Trip Planner

The flagship feature powered by **GroqCloud API**:

* Enter **destination city** (e.g. Ahmedabad, Mumbai, Jaipur)
* Select **number of days** (1–14)
* Pick **start date**
* Set **total budget** in ₹
* Choose **number of travelers**
* Select **preferences** (Culture, Food, Adventure, etc.)

**AI generates:**

* ⏰ Time-slot based itinerary (e.g. 8:00 AM – 10:00 AM: Sabarmati Riverfront)
* 🍽️ Meal recommendations with restaurant names
* 🚗 Transport suggestions with cost
* 🏨 3 hotel options (Budget / Mid-range / Luxury) with prices
* 💰 Full budget breakdown
* 💡 Travel tips
* ⚠️ If budget too low → tells you minimum required budget

---

## 🛠️ Tech Stack

* **Frontend:** React 18, React Router DOM v6
* **Build Tool:** Vite 5
* **AI:** GroqCloud API (`llama3-70b-8192`)
* **Styling:** Inline CSS (no external UI library)
* **State:** React Context API

---

## 📁 Project Structure

```bash
traveloop/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── AITripPlanner.jsx     ← NEW (GroqCloud AI)
│   │   ├── ActivitySearch.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Budget.jsx
│   │   ├── CitySearch.jsx
│   │   ├── Community.jsx
│   │   ├── CreateTrip.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Invoice.jsx
│   │   ├── ItineraryBuilder.jsx
│   │   ├── ItineraryView.jsx
│   │   ├── Login.jsx
│   │   ├── MyTrips.jsx
│   │   ├── PackingChecklist.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   └── TripNotes.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/traveloop.git
cd traveloop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your GroqCloud API Key

Create a `.env` file in the root folder:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Then use it in `AITripPlanner.jsx`:

```js
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
```

### 4. Run the app

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 🔑 Getting GroqCloud API Key (Free)

1. Go to 👉 [GroqCloud Console](https://console.groq.com/keys?utm_source=chatgpt.com)
2. Sign in
3. Create API Key
4. Copy and paste into `.env`

> **Note:** Keep your API key private and never upload `.env` to GitHub.

---

## 🗺️ App Routes

| Route                | Page              |
| -------------------- | ----------------- |
| `/login`             | Login Screen      |
| `/register`          | Register Screen   |
| `/dashboard`         | Home Dashboard    |
| `/ai-planner`        | ✨ AI Trip Planner |
| `/create-trip`       | Create New Trip   |
| `/my-trips`          | All Trips List    |
| `/itinerary-builder` | Build Itinerary   |
| `/itinerary-view`    | View Itinerary    |
| `/city-search`       | Search Cities     |
| `/activity-search`   | Search Activities |
| `/budget`            | Budget Planner    |
| `/packing-checklist` | Packing List      |
| `/community`         | Community Feed    |
| `/trip-notes`        | Trip Notes        |
| `/profile`           | User Profile      |
| `/invoice`           | Expense Invoice   |
| `/admin`             | Admin Dashboard   |

---

## 📱 Pages Overview

### 🏠 Dashboard

* Welcome banner with user name
* AI Planner promo banner
* Stats: Total trips, upcoming, budget
* Recent trips list
* Top destinations grid
* Quick action buttons

### ✨ AI Trip Planner

* 2-step form (Details → Preferences)
* GroqCloud AI generates complete plan
* Day-wise timeline with time slots
* Hotel recommendations (3 options)
* Budget summary with breakdown
* Travel tips

### 🗺️ Itinerary Builder

* Add multiple sections/stops
* Set dates and budget per section
* Save and view itinerary

### 💰 Budget Planner

* 6 expense categories
* Editable amounts
* Progress bar (over/under budget alert)
* Grand total with breakdown

---

## 🎨 Design System

| Property      | Value                  |
| ------------- | ---------------------- |
| Primary Color | `#6366f1` (Indigo)     |
| Accent Color  | `#06b6d4` (Cyan)       |
| Background    | `#f8fafc`              |
| Text          | `#1e293b`              |
| Border        | `#e2e8f0`              |
| Font          | Segoe UI, system fonts |
| Theme         | Light                  |

---

## 👥 Team / Hackathon

Built for **hackathon** — Traveloop aims to become a personalized, intelligent travel planning platform.

---

## 📄 License

MIT License — free to use and modify.

---

## 🙏 Acknowledgements

* [GroqCloud API](https://console.groq.com/keys?utm_source=chatgpt.com)
* [React](https://react.dev/?utm_source=chatgpt.com)
* [Vite](https://vitejs.dev/?utm_source=chatgpt.com)
* [React Router](https://reactrouter.com/?utm_source=chatgpt.com)
