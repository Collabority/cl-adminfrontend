import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Applications from "./pages/Applications";
import CreateJob from "./pages/CreateJob";

function App() {
  return (
        <BrowserRouter>
      <div className="flex flex-col min-h-screen font-poppins">
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Applications />} />
            <Route path="/create-job" element={<CreateJob />} />
            
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
