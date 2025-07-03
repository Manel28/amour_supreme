import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import EditDate from "./pages/EditDate"; 
import ProtectedRoute from "./components/PrivateRoute";
import AddDate from "./pages/AddDate"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
<Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddDate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditDate />
            </ProtectedRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
