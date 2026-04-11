import { useState } from "react";
import { IoEyeOutline, IoLinkOutline } from "react-icons/io5";
import { HiOutlineRefresh, HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {Navbar} from "./shared/components/Navbar";
import type { employeedata } from "./pdr.types";

const employeeList: employeedata[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    photo: "https://i.pravatar.cc/48?img=1",
    competency: 70,
    level: 0,
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "UI/UX Designer",
    photo: "https://i.pravatar.cc/48?img=2",
    competency: 55,
    level: 1,
  },
  {
    id: 3,
    name: "Budi Santoso",
    position: "Business Analyst",
    photo: "https://i.pravatar.cc/48?img=3",
    competency: 45,
    level: 1,
  },
  {
    id: 4,
    name: "Siti Rahayu",
    position: "Quality Assurance",
    photo: "https://i.pravatar.cc/48?img=4",
    competency: 80,
    level: 2,
  },
  {
    id: 5,
    name: "Ahmad Fauzi",
    position: "DevOps Engineer",
    photo: "https://i.pravatar.cc/48?img=5",
    competency: 60,
    level: 2,
  },
];

const indentMap: Record<number, string> = { 0: "pl-3 md:pl-6", 1: "pl-8 md:pl-18", 2: "pl-8 md:pl-18" };

function getBadgeColor(score: number) {
  if (score >= 70) return "bg-green-100";
  if (score >= 50) return "bg-yellow-100";
  return "bg-red-100";
}

function getStats(data: employeedata[]) {
  const belowStandart = data.filter((item) => item.competency < 50).length;
  const needsDevelopement = data.filter((item) => item.competency >= 50 && item.competency < 70).length;
  const goodPerformance = data.filter((item) => item.competency >= 70).length;
  return { belowStandart, needsDevelopement, goodPerformance };
}

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const stats = getStats(employeeList);

  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedEmployees = showAll ? employeeList : filteredEmployees.slice(0, 8);

  return (
    <div className="max-w-screen min-h-screen bg-gray-50">
      <Navbar activePage="karyawan" />

      <div className="px-3 md:px-8 py-3 md:py-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-6">
          <div className="bg-white border border-gray-200 rounded-xl px-2 md:px-6 py-2 md:py-4 flex items-center justify-between gap-1">
            <span className="text-[10px] md:text-sm text-gray-600 leading-tight">Dibawah Standar Yang Diharapkan</span>
            <span className="bg-red-100 text-red-600 font-bold text-sm md:text-lg px-2 md:px-3 py-1 rounded-lg shrink-0">{stats.belowStandart}</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-2 md:px-6 py-2 md:py-4 flex items-center justify-between gap-1">
            <span className="text-[10px] md:text-sm text-gray-600 leading-tight">Membutuhkan Pengembangan</span>
            <span className="bg-yellow-100 text-yellow-600 font-bold text-sm md:text-lg px-2 md:px-3 py-1 rounded-lg shrink-0">{stats.needsDevelopement}</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-2 md:px-6 py-2 md:py-4 flex items-center justify-between gap-1">
            <span className="text-[10px] md:text-sm text-gray-600 leading-tight">Pencapaian Yang Baik</span>
            <span className="bg-green-100 text-green-600 font-bold text-sm md:text-lg px-2 md:px-3 py-1 rounded-lg shrink-0">{stats.goodPerformance}</span>
          </div>
        </div>

        {/* Search + Sync */}
        <div className="flex items-center justify-between mb-3 md:mb-4 gap-2">
          <div className="flex items-center border border-gray-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2 bg-white w-40 md:w-64 gap-1 md:gap-2">
            <input
              type="text"
              placeholder="Cari Nama"
              className="text-xs md:text-sm focus:outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <HiOutlineSearch className="text-gray-400 shrink-0 text-xs md:text-base" />
          </div>
          <button className="flex items-center gap-1 md:gap-2 bg-cyan-500 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-cyan-600 transition whitespace-nowrap">
            <HiOutlineRefresh />
            <span>Sync Humanis</span>
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-2 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold bg-gray-100 text-gray-600 w-2/3">Nama Karyawan</th>
                <th className="text-center px-1 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold bg-gray-100 text-gray-600 w-1/6">Competency</th>
                <th className="text-left px-1 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold bg-gray-100 text-gray-600 w-1/6">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {displayedEmployees.map((k) => (
                <tr key={k.id} className="hover:bg-gray-50 transition">
                  <td className={`px-2 md:px-6 py-2 md:py-3 ${indentMap[k.level]}`}>
                    <div className="flex items-center gap-1.5 md:gap-3">
                      <img src={k.photo || "https://i.pravatar.cc/36"} alt={k.name} className="w-7 h-7 md:w-9 md:h-9 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="text-xs md:text-sm font-medium text-cyan-600">{k.name}</p>
                        <p className="text-[10px] md:text-xs text-gray-400">{k.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-1 md:px-6 align-middle text-center py-2 md:py-3">
                    <span className={`text-[10px] md:text-xs px-1.5 md:px-3 py-0.5 md:py-1 rounded-lg ${getBadgeColor(k.competency)}`}>
                      {k.competency}%
                    </span>
                  </td>
                  <td className="px-1 md:px-6 align-middle py-2 md:py-3">
                    <div className="flex items-center justify-start gap-1.5 md:gap-3">
                      <button
                        onClick={() => navigate(`/pdr/evaluation/${k.id}`, { state: k })}
                        className="text-gray-400 hover:text-cyan-600 transition"
                      >
                        <IoEyeOutline className="text-base md:text-xl" />
                      </button>
                      <button
                        onClick={() => navigate(`/pdr/LandingPage`, { state: k })}
                        className="text-gray-400 hover:text-cyan-600 transition"
                      >
                        <IoLinkOutline className="text-base md:text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!showAll && filteredEmployees.length > 8 && (
            <div className="text-center py-3 md:py-4 border-t border-gray-100">
              <button onClick={() => setShowAll(true)} className="text-cyan-600 text-xs md:text-sm font-medium hover:underline">
                Show More
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}