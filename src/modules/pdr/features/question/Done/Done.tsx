import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/modules/pdr/features/question/shared/components/header";
export default function MobileDone() {
    const { state: karyawan } = useLocation();
    const navigate = useNavigate();
    return(
        <div className="w-screen h-screen md:max-w-md md:mx-auto flex flex-col items-center justify-center px-8 text-center gap-6">
            
           <Navbar mobileCentered desktopCentered name={karyawan?.name}
             position={karyawan?.position}
             photo={karyawan?.photo}/>

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