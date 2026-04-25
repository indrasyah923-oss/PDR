import { Navbar } from "./shared/components/header";
import { useNavigate, useLocation } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { state: karyawan } = useLocation();

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        
        <div className="w-full bg-white flex flex-col px-10 py-6 gap-6 items-center justify-center text-center rounded-xl">
          
          <Navbar
            name={karyawan?.name}
            position={karyawan?.position}
            photo={karyawan?.photo}
            iscenter={true}
          />

          {/* Card Transparan */}
          <div className="border border-gray-200 rounded-lg bg-gray-200 shadow-sm w-xs px-4 py-3">
            <p className="font-semibold text-gray-800 text-lg mb-1">
              Transparan
            </p>
            <p className="text-sm">
              Kami membantu koresponden untuk menyalurkan aspirasi kepada karyawan yang dituju.
            </p>
          </div>

          {/* Card Peningkatan Mutu */}
          <div className="border border-gray-200 rounded-lg bg-gray-200 shadow-sm w-xs px-4 py-3">
            <p className="font-semibold text-gray-800 text-lg mb-1">
              Peningkatan Mutu
            </p>
            <p className="text-sm">
              Meningkatkan mutu kinerja karyawan dari hasil Diagnostik secara akurat.
            </p>
          </div>

          {/* Teks paragraf */}
          <p className="text-base text-gray-600">
            Pastikan jawaban objektif berdasarkan <br />
            <span className="font-semibold">
              pengamatan harian, bukti yang nyata, dan kasus-kasus yang telah diselesaikannya.
            </span>{" "}
            Setiap saran yang anda berikan akan sangat berguna untuk perbaikan dan peningkatan karyawan.
          </p>

          {/* Info lewati jawaban */}
          <p className="text-base text-gray-500">
            Lewati jawaban! Jika karyawan yang bersangkutan belum mendapatkan kesempatan / diperlukan untuk diterapkan di project yang di handle
          </p>

          {/* Tombol */}
          <button
            onClick={() => navigate("/pdr/QuestionPage", { state: karyawan })}
            className="w-full bg-cyan-600 text-white font-semibold py-4 rounded-xl mt-2 text-base"
          >
            Berikan Masukanmu
          </button>

        </div>
      </div>
    </div>
  );
}