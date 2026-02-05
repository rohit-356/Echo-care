
import TeamSection from "./components/TeamSection";
import { SoundToggle } from "./components/SoundToggle";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import InsightsPage from "./pages/InsightsPage";
import CarePage from "./pages/CarePage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/care" element={<CarePage />} />
          <Route path="/team" element={<TeamSection />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SoundToggle />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
