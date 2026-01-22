import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="h-screen bg-[#0D1018] text-white flex flex-col overflow-hidden relative">
      
      {/* Degradado circular - Esquina superior izquierda */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-[#1a2840] opacity-40 blur-[120px]"></div>
      </div>

      {/* Degradado circular - Esquina inferior derecha */}
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-[#1a2840] opacity-40 blur-[120px]"></div>
      </div>

      <Navbar />
      <main className="flex-1 flex items-center justify-center overflow-hidden relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}