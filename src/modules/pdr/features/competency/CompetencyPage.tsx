import { useState, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { Navbar } from "../../shared/components/Navbar";
import type { competencyData } from "./types/types";

const CORE_SHEET_NAME = "core";
const CORE_RANGE = "A1:D14";

const competency: competencyData[] = [
  {
    group: "Software",
    items: ["Project Manager", "Tech Lead", "Programmer", "QA Engineer"],
  },
  {
    group: "Business",
    items: [
      "BA",
      "UI/UX",
      "Sales",
      "Multimedia",
    ],
  },
];

type SheetData = string[][];

async function fetchSheetData(sheetName: string, range: string): Promise<SheetData> {
  const res = await fetch(`/api/sheets?sheet=${sheetName}&range=${range}`);
  if (!res.ok) throw new Error("Gagal mengambil data");
  const json = await res.json();
  return json.values || [];
}

function SheetTable({ sheetName, range }: { sheetName: string; range: string }) {
  const [data, setData] = useState<SheetData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSheetData(sheetName, range)
      .then((data) => {
      console.log("data:", JSON.stringify(data));
      setData(data);
    })
      .catch(() => setError("Gagal memuat data. Periksa konfigurasi API Key atau Range."))
      .finally(() => setLoading(false));
  }, [sheetName, range]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-[10px] md:text-sm text-gray-400">
        Memuat data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-[10px] md:text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-[10px] md:text-sm text-gray-400">
        Tidak ada data.
      </div>
    );
  }

  const [header, ...rows] = data;

  return (
    <div className="overflow-auto h-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {header.map((col, i) => (
              <th
                key={i}
                className="bg-teal-600 text-white text-left px-4 py-2 border border-teal-700 whitespace-nowrap text-[10px] md:text-sm"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {header.map((_, ci) => (
                <td key={ci} className="px-4 py-2 border border-gray-200 align-top text-[10px] md:text-sm whitespace-pre-wrap">
                  {row[ci] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ModalState {
  item: string;
  group: string;
}

export default function CompetencyPage() {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (item: string, group: string) => setModal({ item, group });
  const closeModal = () => setModal(null);

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <Navbar activePage="competency" />

      <div className="px-3 md:px-8 py-3 md:py-6">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-200">
            <span className="text-[10px] md:text-sm font-semibold text-gray-700">Competency Matrix</span>
            <HiOutlineRefresh className="text-gray-500 cursor-pointer hover:text-cyan-600" />
          </div>

          {competency.map((group) => (
            <div key={group.group}>
              <div className="px-6 py-2 bg-white border-b border-gray-100">
                <span className="text-[10px] md:text-sm font-semibold text-gray-700">{group.group}</span>
              </div>

              {group.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-10 py-3 border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <span className="text-[10px] md:text-sm text-gray-600">{item}</span>
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-cyan-600 transition">
                      <HiOutlineRefresh className="text-xl" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-cyan-600 transition"
                      onClick={() => openModal(item, group.group)}
                    >
                      <IoEyeOutline className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-5xl h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="text-base font-semibold text-gray-800">
                Competency Matrix {modal.group} —{" "}
                <span>{modal.item}</span>
              </span>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition text-2xl"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <SheetTable
                sheetName={CORE_SHEET_NAME}
                range={CORE_RANGE}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}