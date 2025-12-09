import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      {/* Redirecionar raiz para dashboard */}
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>

      {/* Rotas do Dashboard */}
      <Route path="/dashboard">
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </Route>
      
      <Route path="/dashboard/upload">
        <DashboardLayout>
          <UploadPage />
        </DashboardLayout>
      </Route>
      
      <Route path="/dashboard/results">
        <DashboardLayout>
          <ResultsPage />
        </DashboardLayout>
      </Route>
      
      <Route path="/dashboard/admin">
        <DashboardLayout>
          <AdminPage />
        </DashboardLayout>
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
