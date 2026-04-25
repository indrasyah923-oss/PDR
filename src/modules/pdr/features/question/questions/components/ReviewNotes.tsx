import type { Voter } from "@/modules/pdr/features/question/types/types";

interface ReviewNotesProps {
  voters: Voter[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
}

export function ReviewNotes({ voters, index, onPrev, onNext }: ReviewNotesProps) {
  const total = voters.length;
  const current = voters[index];

  return (
    <div className="mt-4 border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-bold text-gray-800">Review Notes</p>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-500 disabled:opacity-30"
          >
            &lt;
          </button>
          <span className="text-sm text-gray-600">{index + 1}/{total}</span>
          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-500 disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{current?.catatan}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={current?.foto} alt={current?.nama} className="w-7 h-7 rounded-full object-cover" />
          <p className="text-xs font-semibold text-gray-700">{current?.nama}</p>
        </div>
        <p className="text-xs text-gray-400">{current?.tanggal}</p>
      </div>
    </div>
  );
}