import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
export default function MobileDone() {
    const { state: karyawan } = useLocation();
    const navigate = useNavigate();
    return(
        <div className="w-screen h-screen md:max-w-md md:mx-auto flex flex-col items-center justify-center px-8 text-center gap-6">
            
            {/* Logo + User */}
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">venturo</h1>
                <div className="flex items-center gap-3 mt-2">
                    <img 
                        src={karyawan?.photo || "https://i.pravatar.cc/48?img=1"}
                        alt={karyawan?.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-left">
                        <span className="font-semibold text-gray-900">{karyawan?.name || "Nama Karyawan"}</span>
                        <span className="text-sm text-gray-500">{karyawan?.position || "Jabatan"}</span>
                    </div>
                </div>
            </div>

            {/* Teks */}
            <p className="text-sm text-gray-600 leading-relaxed">
                Terima kasih atas waktu, komitmen, dan kerja keras yang telah Anda berikan. Mari terus berkembang dan memberikan kontribusi terbaik bagi tim dan perusahaan.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
                Tim HRD akan segera menghubungi Anda untuk penjadwalan sesi PDR berikutnya.
            </p>
            <button
          onClick={() => navigate("/pdr/landing")}
          className="w-full bg-cyan-600 text-white font-semibold py-3 rounded-xl mt-2"
        >
          selesai
        </button>
        </div>
    )
}