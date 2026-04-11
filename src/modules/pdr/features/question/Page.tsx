import { Navbar } from "./shared/components/header";
import { Footer } from "./shared/components/footer";
import { useNavigate, useLocation } from "react-router-dom";

export default function LandingPage(){
  const navigate = useNavigate();
  const { state: karyawan } = useLocation();

  return(
    <div className="max-w-screen min-h-screen flex flex-col">   
      <Navbar centered name={karyawan?.name}
  position={karyawan?.position}
  photo={karyawan?.photo}/>
      <div className="max-w-screen flex flex-col flex-1 px-6 py-6 gap-4 items-center justify-center text-center">
        {/* Card Transparan */}
        <div className="border border-gray-200 rounded-xl h-auto p-4 bg-gray-200 shadow-sm w-xs">
          <p className="font-semibold text-gray-800 mb-2">Transparan</p>
          <p className="text-base font-md">Kami membantu koresponden untuk menyalurkan aspirasi kepada karyawan yang dituju.</p>
        </div>

        {/* Card Peningkatan Mutu */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-200 shadow-sm w-xs">
          <p className="font-semibold text-gray-800 mb-2">Peningkatan Mutu</p>
          <p className="text-base font-md">Meningkatkan mutu kinerja karyawan dari hasil Diagnostik secara akurat.</p>
        </div>

        {/* Teks paragraf */}
        <p className="text-sm text-gray-600 text-center leading-relaxed">
          Pastikan jawaban objektif berdasarkan pengamatan harian, bukti yang nyata, dan kasus-kasus yang telah diselesaikannya. Setiap saran yang anda berikan akan sangat berguna untuk perbaikan dan peningkatan karyawan.
        </p>

        {/* Info lewati jawaban */}
        <p className="text-sm text-gray-500 text-center">
          Lewati jawaban! Jika karyawan yang bersangkutan belum mendapatkan kesempatan / diperlukan untuk diterapkan di project yang di handle
        </p>

        {/* Tombol */}
        <button
          onClick={() => navigate("/pdr/QuestionPage", { state: karyawan })}
          className="w-full bg-cyan-600 text-white font-semibold py-3 rounded-xl mt-2"
        >
          Berikan Masukanmu
        </button>
      </div>
    </div>
  )
}