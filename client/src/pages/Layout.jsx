import {useState}from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
  {/* Sidebar */}
  <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

  {/* Content Area */}
  <div className="flex flex-1 flex-col overflow-hidden">
    
    {/* Top Navbar */}
      <button
        className="md:hidden text-gray-700 text-xl"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>
    

    {/* Page Content */}
    <main className="mt-4">
      <Outlet />
    </main>
  </div>
</div>

  );
}

export default Layout;
