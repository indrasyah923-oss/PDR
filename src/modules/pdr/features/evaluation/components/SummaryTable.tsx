import type { DataSummaryType } from "../types";

function getBarColor(score: number) {
  if (score === 0) return "bg-gray-400";
  if (score < 60) return "bg-red-300";
  if (score < 75) return "bg-yellow-200";
  return "bg-yellow-300";
}

interface SummaryTableProps {
  data: DataSummaryType[];
  competencyScore: number;
}

export function SummaryTable({ data, competencyScore }: SummaryTableProps) {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-sky-50">
            <th className="text-left px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-8 md:w-16">No.</th>
            <th className="text-left px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600">Competency Unit</th>
            <th className="text-center px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-16 md:w-48">Achievement</th>
            <th className="text-center px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-8 md:w-16">Bobot</th>
            <th className="text-center px-2 md:px-6 py-2 md:py-3 text-[10px] md:text-sm font-semibold text-gray-600 w-8 md:w-16">%</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row) => {
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

      <div className="flex justify-end items-center bg-sky-50 gap-3 md:gap-4 px-3 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <div className="text-right">
          <p className="text-[10px] md:text-sm text-gray-700">Skor Kompetensi</p>
          <p className="text-[9px] md:text-xs text-gray-400">(berkontribusi 30% terhadap performance score)</p>
        </div>
        <span className="text-base md:text-xl text-gray-800">{competencyScore}%</span>
      </div>
    </>
  );
}