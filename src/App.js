import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import DashboardPage from "./pages/DashboardPage";
import WarrantWorkspace from "./pages/WarrantWorkspace";
import VerticalNavbar from "./components/VerticalNavbar";
import MyWarrants from "./pages/MyWarrants";
import { useUser } from "./context/UserContext";
function App() {
  const { auth } = useUser();
  if (!auth.isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div style={{display: "block", backgroundColor: "orange", marginRight: "100px"}}>
        <VerticalNavbar />
      </div>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/warrant" element={<WarrantWorkspace />} />
        <Route path="/my-warrants" element={<MyWarrants />} />
      </Routes>
    </Router>
  );
}

export default App;
