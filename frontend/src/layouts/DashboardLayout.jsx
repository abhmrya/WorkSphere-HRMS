import { Outlet } from "react-router-dom";

import { SidebarProvider } from "../context/SidebarContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-slate-100">

        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">

          <Navbar />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>

          <Footer />

        </div>

      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;