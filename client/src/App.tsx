import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LenisProvider } from "./contexts/LenisContext";
import { PageTransitionProvider } from "./contexts/PageTransitionContext";
import { SplashScreen } from "./components/SplashScreen";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if user has already seen splash screen in this session
    return !sessionStorage.getItem('splashScreenSeen');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashScreenSeen', 'true');
    setShowSplash(false);
  };

  return (
    <ErrorBoundary>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <PageTransitionProvider>
        <LenisProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </LenisProvider>
      </PageTransitionProvider>
    </ErrorBoundary>
  );
}

export default App;
