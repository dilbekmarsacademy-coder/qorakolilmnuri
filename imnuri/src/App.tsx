import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Public layout & pages
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import ResultsPage from './pages/ResultsPage'
import TeachersPage from './pages/TeachersPage'
import ApplyPage from './pages/ApplyPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

// Admin
import AdminRoute from './admin/components/AdminRoute'
import AdminLayout from './admin/components/AdminLayout'
import LoginPage from './admin/pages/LoginPage'
import DashboardPage from './admin/pages/DashboardPage'
import ApplicationsPage from './admin/pages/ApplicationsPage'
import TeachersAdminPage from './admin/pages/TeachersAdminPage'
import SettingsPage from './admin/pages/SettingsPage'
import StatsPage from './admin/pages/StatsPage'
import CoursesAdminPage from './admin/pages/CoursesAdminPage'
import { GenericAdminPage, testimonialsConfig, galleryConfig } from './admin/pages/SimpleAdminPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:subject" element={<CourseDetailPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="apply" element={<ApplyPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin login (standalone, no public header) */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Protected admin routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard"     element={<DashboardPage />} />
              <Route path="/admin/applications"  element={<ApplicationsPage />} />
              <Route path="/admin/teachers"      element={<TeachersAdminPage />} />
              <Route path="/admin/testimonials"  element={<GenericAdminPage config={testimonialsConfig} />} />
              <Route path="/admin/gallery"       element={<GenericAdminPage config={galleryConfig} />} />
              <Route path="/admin/stats"         element={<StatsPage />} />
              <Route path="/admin/settings"      element={<SettingsPage />} />
              <Route path="/admin/courses"       element={<CoursesAdminPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
