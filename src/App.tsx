import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./shared/layouts/dashboardLayout";
import { FilterProvider } from "./shared/context/filterContext";
import Revenue from "./pages/revenuePage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FilterProvider>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/revenue" element={<Revenue />} />
            </Route>
          </Routes>
        </FilterProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
