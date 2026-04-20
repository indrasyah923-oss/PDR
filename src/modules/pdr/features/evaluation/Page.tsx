import { IoEyeOutline, IoPeopleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { SummaryTable } from "./components/SummaryTable";
import { CompetencyList } from "./components/CompetencyList";
import type { DataSummaryType, CompetencyDataType } from "./types";

const DataSummary: DataSummaryType[] = [
  { no: 1, unit: "Technical", achievement: 58, bobot: 20 },
  { no: 3, unit: "Efective Solution", achievement: 0, bobot: 30 },
  { no: 4, unit: "Agility", achievement: 75, bobot: 20 },
  { no: 6, unit: "Leadership", achievement: 62, bobot: 20 },
];

const competencyData: CompetencyDataType[] = [
  { label: "(Cloud Enginer Overview | Technical)", score: 50 },
  { label: "(database advanced | Technical)", score: 0 },
  { label: "(Sprint Plan | Technical)", score: 0 },
  { label: "(Sprint Review | Technical)", score: 50 },
  { label: "(Risk (hidden cost) Project Management | Technical)", score: 75 },
  { label: "(Restropective | Leadership)", score: 75 },
  { label: "(Coaching | Leadership)", score: 50 },
];

function hitungSkorKompetensi(data: DataSummaryType[]) {
  const totalBobot = data.reduce((acc, d) => acc + d.bobot, 0);
  const totalNilai = data.reduce((acc, d) => acc + (d.achievement * d.bobot) / 100, 0);
  return Math.round((totalNilai / totalBobot) * 100);
}

export default function RingkasanPage() {
  const navigate = useNavigate();
  const { state: karyawan } = useLocation();
  const skorKompetensi = hitungSkorKompetensi(DataSummary);

  return (
    <div className="max-w-screen min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center gap-3 md:gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 text-lg md:text-xl">←</button>
        <img
          src={karyawan?.photo || "https://i.pravatar.cc/48?img=1"}
          alt=""
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm md:text-base text-gray-800">{karyawan?.name || "M Rizki Masjahri Putra"}</p>
          <p className="text-xs md:text-sm text-gray-500">{karyawan?.position || "Lead web programmer"}</p>
        </div>
      </div>

      <div className="px-3 md:px-8 py-4 md:py-6">
        <div className="bg-white border-l border-r border-b border-gray-50">

          <div className="border-t-4 border-cyan-500" />

          <div className="px-3 md:px-6 py-4">
            <p className="font-semibold pb-4 text-xs md:text-base text-gray-700">
              Ringkasan Diagnosa dari Semua Pertanyaan
            </p>
            <SummaryTable data={DataSummary} competencyScore={skorKompetensi} />
          </div>

          <div className="px-3 md:px-6 py-4">
            <div className="flex gap-2 md:gap-3 py-2">
              <button className="flex items-center gap-1 md:gap-2 bg-cyan-600 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-medium">
                <IoEyeOutline className="text-sm md:text-base" /> Tampilkan semua pertanyaan
              </button>
              <button className="flex items-center gap-1 md:gap-2 bg-cyan-600 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-medium">
                <IoPeopleOutline className="text-sm md:text-base" /> Koresponden (1)
              </button>
            </div>
            <CompetencyList data={competencyData} />
          </div>
        </div>
      </div>
    </div>
  );
}