import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import MyTrips from './pages/MyTrips'
import ItineraryBuilder from './pages/ItineraryBuilder'
import ItineraryView from './pages/ItineraryView'
import CitySearch from './pages/CitySearch'
import ActivitySearch from './pages/ActivitySearch'
import Budget from './pages/Budget'
import PackingChecklist from './pages/PackingChecklist'
import Community from './pages/Community'
import TripNotes from './pages/TripNotes'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Invoice from './pages/Invoice'
import AITripPlanner from './pages/AITripPlanner'
import Navbar from './components/Navbar'

function App() {
  return (
    <AppProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
          <Route path="/itinerary-view" element={<ItineraryView />} />
          <Route path="/city-search" element={<CitySearch />} />
          <Route path="/activity-search" element={<ActivitySearch />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/packing-checklist" element={<PackingChecklist />} />
          <Route path="/community" element={<Community />} />
          <Route path="/trip-notes" element={<TripNotes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/ai-planner" element={<AITripPlanner />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App