import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminServices from "./pages/AdminServices";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-[#F8F6F3] flex gap-4">
        <Link to="/admin/services" className="text-[#008080] font-semibold">Admin Services</Link>
        <Link to="/test" className="text-blue-700 font-semibold">Test</Link>
      </nav>
      <Routes>
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/test" element={<div className="flex justify-center items-center h-screen text-4xl text-green-700">Hello World Test Route</div>} />
        <Route path="*" element={<div className="flex justify-center items-center h-screen text-2xl" style={{background: 'yellow'}}>Welcome to CL-ADMIN (Fallback Route)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
