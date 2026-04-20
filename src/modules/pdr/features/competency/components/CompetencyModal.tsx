import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;

type SheetData = string[][];

async function fetchSheetData(sheetName: string, range: string): Promise<SheetData> {
  const fullRange = `${sheetName}!${range}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(fullRange)}?key=${API_KEY}`;
  const res = await fetch(url);
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
      .then(setData)
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
                <td key={ci} className="px-4 py-2 border border-gray-200 align-top text-[10px] md:text-sm">
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

interface CompetencyModalProps {
  item: string;
  group: string;
  sheetName: string;
  range: string;
  onClose: () => void;
}

export function CompetencyModal({ item, group, sheetName, range, onClose }: CompetencyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-5xl h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <span className="text-base font-semibold text-gray-800">
            Competency Matrix {group} —{" "}
            <span>{item}</span>
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition text-2xl"
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <SheetTable sheetName={sheetName} range={range} />
        </div>
      </div>
    </div>
  );
}