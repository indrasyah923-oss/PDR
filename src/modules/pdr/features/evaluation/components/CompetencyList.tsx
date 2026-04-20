import { IoLinkOutline } from "react-icons/io5";
import type { CompetencyDataType } from "../types";

function getScoreBadge(score: number) {
  if (score === 0) return "text-gray-500";
  if (score < 60) return "bg-red-100";
  return "bg-yellow-100";
}

interface CompetencyListProps {
  data: CompetencyDataType[];
}

export function CompetencyList({ data }: CompetencyListProps) {
  return (
    <div className="flex gap-2 flex-col">
      {data.map((p, i) => (
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
  );
}