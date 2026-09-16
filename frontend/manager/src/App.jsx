import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@shared/layouts/MainLayout';
import ErrorBoundary from '@shared/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  PlusCircle,
  Layers,
  Calendar,
  CalendarDays,
  MessageSquare,
  Globe,
  Briefcase,
  User,
  Bell,
  Camera,
  FileText,
  TrendingUp,
  Settings as SettingsIcon
} from 'lucide-react';

const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard'));
const Employees = lazy(() => import('./pages/Employees'));
const EmployeeDetail = lazy(() => import('./pages/EmployeeDetail'));
const Attendance = lazy(() => import('./pages/Attendance'));
const DailyReport = lazy(() => import('./pages/DailyReport'));
const ManagerTasks = lazy(() => import('./pages/ManagerTasks'));
const TaskCreate = lazy(() => import('./pages/TaskCreate'));
const ManagerProjects = lazy(() => import('./pages/ManagerProjects'));
const LeaveManagement = lazy(() => import('./pages/LeaveManagement'));
const Holidays = lazy(() => import('./pages/Holidays'));
const MyEvents = lazy(() => import('./pages/MyEvents'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Screenshots = lazy(() => import('./pages/Screenshots'));
const Profile = lazy(() => import('@shared/pages/Profile'));
const Settings = lazy(() => import('@shared/pages/Settings'));
const Chat = lazy(() => import('@shared/pages/Chat'));

const RouteLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a76b]"></div>
  </div>
);

function App() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const token = sessionStorage.getItem('token');

  React.useEffect(() => {
    if (!token) {
      window.location.href = '/';
    }
  }, [token]);

  if (!token) return null;

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'My Team', icon: Users, path: '/employees' },
    { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { label: 'Create Task', icon: PlusCircle, path: '/tasks/create' },
    { label: 'Daily Work Report', icon: FileText, path: '/daily-report' },
    { label: 'Projects', icon: Layers, path: '/projects' },
    { label: 'Team Attendance', icon: CalendarDays, path: '/attendance' },
    { label: 'Leave Management', icon: Calendar, path: '/leave' },
    { label: 'Team Chat', icon: MessageSquare, path: '/chat' },
    { label: 'Company Holidays', icon: Globe, path: '/holidays' },
    { label: 'Events', icon: Briefcase, path: '/events' },
    { label: 'Activity Logs', icon: Camera, path: '/screenshots' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
    { label: 'My Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: SettingsIcon, path: '/settings' }
  ];

  return (
    <ErrorBoundary>
      <Toaster
        position="top-right"
        containerStyle={{ top: 24, right: 24, zIndex: 99999 }}
        toastOptions={{
          duration: 4500,
          style: {
            background: '#111827',
            color: '#f9fafb',
            padding: '14px 18px',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            maxWidth: '440px'
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff'
            },
            style: {
              background: '#064e3b',
              color: '#ecfdf5',
              border: '1px solid #059669'
            }
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff'
            },
            style: {
              background: '#450a0a',
              color: '#fef2f2',
              border: '1px solid #991b1b'
            }
          }
        }}
      />
      <MainLayout
        navItems={navItems}
        userRole="manager"
        userName={user?.name || user?.email || 'Manager'}
        onLogout={handleLogout}
      >
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/dashboard" element={<Employees />} />
            <Route path="/manager" element={<Employees />} />
            <Route path="/manager/dashboard" element={<Employees />} />

            <Route path="/employees" element={<Employees />} />
            <Route path="/manager/employees" element={<Employees />} />
            <Route path="/employees/view/:id" element={<EmployeeDetail />} />
            <Route path="/manager/employees/view/:id" element={<EmployeeDetail />} />
            <Route path="/manager/manager/employees/view/:id" element={<EmployeeDetail />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/manager/attendance" element={<Attendance />} />
            <Route path="/daily-report" element={<DailyReport />} />
            <Route path="/manager/daily-report" element={<DailyReport />} />
            <Route path="/tasks" element={<ManagerTasks />} />
            <Route path="/manager/tasks" element={<ManagerTasks />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/manager/tasks/create" element={<TaskCreate />} />
            <Route path="/projects" element={<ManagerProjects />} />
            <Route path="/manager/projects" element={<ManagerProjects />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/manager/leave" element={<LeaveManagement />} />
            <Route path="/leaves" element={<LeaveManagement />} />
            <Route path="/manager/leaves" element={<LeaveManagement />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/manager/holidays" element={<Holidays />} />
            <Route path="/events" element={<MyEvents />} />
            <Route path="/manager/events" element={<MyEvents />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/manager/notifications" element={<Notifications />} />
            <Route path="/screenshots" element={<Screenshots />} />
            <Route path="/manager/screenshots" element={<Screenshots />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/manager/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manager/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/manager/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;
