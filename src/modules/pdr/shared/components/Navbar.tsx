import { useNavigate } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi";
import { IoGridOutline } from "react-icons/io5";

interface NavbarProps {
  activePage?: "karyawan" | "competency";
}

export function Navbar({ activePage = "karyawan" }: NavbarProps) {
  const Navigate = useNavigate();
  return (
    <>
      {/* Desktop & Mobile Top Navbar */}
      <div className="max-w-screen bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
            venturo
          </h1>
          {/* Navigasi teks — hanya desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => Navigate("/pdr/landing")}
              className={`font-semibold cursor-pointer ${activePage === "karyawan" ? "text-cyan-600" : "text-gray-400"}`}
            >
              Karyawan
            </button>
            <button
              onClick={() => Navigate("/pdr/competency")}
              className={`font-semibold cursor-pointer ${activePage === "competency" ? "text-cyan-600" : "text-gray-400"}`}
            >
              Competency
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <img src="https://i.pravatar.cc/36?img=10" alt="" className="w-9 h-9 rounded-full object-cover" />
          <span className=" font-medium text-gray-700">Super Administrator</span>
          <span className="hidden md:block text-gray-400">▼</span>
        </div>
      </div>

      {/* Bottom Navigation — hanya mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex md:hidden">
        <button
          onClick={() => Navigate("/pdr/landing")}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition ${
            activePage === "karyawan" ? "text-cyan-600" : "text-gray-400"
          }`}
        >
          <HiOutlineUsers className="text-xl" />
          <span className="text-[10px] font-medium">Karyawan</span>
        </button>
        <button
          onClick={() => Navigate("/pdr/competency")}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition ${
            activePage === "competency" ? "text-cyan-600" : "text-gray-400"
          }`}
        >
          <IoGridOutline className="text-xl" />
          <span className="text-[10px] font-medium">Competency</span>
        </button>
      </div>

      {/* Spacer agar konten tidak tertutup bottom nav di mobile */}
    </>
  );
}