import React from "react";
import { Routes, Route } from "react-router-dom";

// PUBLIC PAGES
import PortfolioPage from "./pages/PortfolioPage";
import Certificates from "./components/Certificates";
import WebsiteLayout from "./components/WebsiteLayout";

// ADMIN PAGES
import Login from "./components/Login";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminProjects from "./components/AdminProjects";
import AdminMessages from "./components/AdminMessages";
import AdminCertificates from "./components/AdminCertificates";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <WebsiteLayout>
            <PortfolioPage />
          </WebsiteLayout>
        }
      />

      <Route
        path="/certificates"
        element={
          <WebsiteLayout>
            <Certificates />
          </WebsiteLayout>
        }
      />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* 🔐 PROTECTED ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="certificates" element={<AdminCertificates />} />
      </Route>

    </Routes>
  );
}
