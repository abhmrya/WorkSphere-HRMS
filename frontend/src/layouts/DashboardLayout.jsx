import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function DashboardLayout() {

    return (

        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 bg-slate-100 p-6">

                    <Outlet />

                </main>

            </div>

            <Footer />

        </div>

    );

}

export default DashboardLayout;