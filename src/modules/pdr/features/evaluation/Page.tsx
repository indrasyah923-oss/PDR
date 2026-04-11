import { IoLinkOutline, IoEyeOutline, IoPeopleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
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

function getBarColor(score: number) {
  if (score === 0) return "bg-gray-400";
  if (score < 60) return "bg-red-300";
  if (score < 75) return "bg-yellow-200";
  return "bg-yellow-300";
}

function getScoreBadge(score: number) {
  if (score === 0) return "text-gray-500";
  if (score < 60) return "bg-red-100";
  return "bg-yellow-100";
}

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

            {/* Tabel */}
            <table className="w-full">
              <thead>
                <tr className="bg-sky-50">
                  <th className="text-left px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-8 md:w-16">No.</th>
                  <th className="text-left px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600">Competency Unit</th>
                  <th className="text-center px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600">Achievement</th>
                  <th className="text-center px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-12 md:w-24">Bobot</th>
                  <th className="text-center px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-8 md:w-16">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DataSummary.map((row) => {
                  const persen = row.achievement === 0 ? "-" : `${Math.round((row.achievement * row.bobot) / 100)}%`;
                  const barWidth = row.achievement === 0 ? 100 : row.achievement;
                  return (
                    <tr key={row.no}>
                      <td className="px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm text-gray-500">{row.no}.</td>
                      <td className="px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm text-gray-700">{row.unit}</td>
                      <td className="px-2 md:px-6 py-2 md:py-3">
                        <div className="relative w-full h-4 md:h-6 bg-gray-100 rounded-full">
                          <div className={`h-full rounded ${getBarColor(row.achievement)}`} style={{ width: `${barWidth}%` }} />
                          <span className="absolute top-0 flex items-center justify-center h-full text-[10px] md:text-xs font-semibold text-gray-700" style={{ width: `${barWidth}%` }}>
                            {row.achievement}%
                          </span>
                        </div>
                      </td>
                      <td className="px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm text-center text-gray-600">{row.bobot}</td>
                      <td className="px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm text-center text-gray-600">{persen}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Skor Kompetensi */}
            <div className="flex justify-end items-center bg-sky-50 gap-3 md:gap-4 px-3 md:px-6 py-3 md:py-4 border-b border-gray-200">
              <div className="text-right">
                <p className="text-[10px] md:text-sm text-gray-700">Skor Kompetensi</p>
                <p className="text-[9px] md:text-xs text-gray-400">(berkontribusi 30% terhadap performance score)</p>
              </div>
              <span className="text-base md:text-xl text-gray-800">{skorKompetensi}%</span>
            </div>
          </div>

          <div className="px-3 md:px-6 py-4">
            {/* Tombol */}
            <div className="flex gap-2 md:gap-3 py-2">
              <button onClick={() => navigate('/pertanyaan')} className="flex items-center gap-1 md:gap-2 bg-cyan-600 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-medium">
                <IoEyeOutline className="text-sm md:text-base" /> Tampilkan semua pertanyaan
              </button>
              <button className="flex items-center gap-1 md:gap-2 bg-cyan-600 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-medium">
                <IoPeopleOutline className="text-sm md:text-base" /> Koresponden (1)
              </button>
            </div>

            {/* List Pertanyaan */}
            <div className="flex gap-2 flex-col">
              {competencyData.map((p, i) => (
                <div key={i} className="bg-sky-50 border-b rounded border-gray-200 px-3 md:px-6 py-2 md:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 md:gap-2 min-w-0">
                    <span className="text-[10px] md:text-sm text-gray-600 truncate">{p.label}</span>
                    <IoLinkOutline className="text-gray-400 shrink-0 text-xs md:text-base" />
                  </div>
                  <span className={`text-[10px] md:text-xs font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded shrink-0 ml-2 ${getScoreBadge(p.score)}`}>
                    {p.score === 0 ? "0%" : `${p.score}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}