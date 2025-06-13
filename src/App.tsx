import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import BusinessDashboard from "./components/business/BusinessDashboard";
import CustomerApp from "./components/customer/CustomerApp";
import AuthPage from "./components/auth/AuthPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/customer" element={<CustomerApp />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
