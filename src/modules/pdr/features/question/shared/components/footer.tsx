
interface FooterProps {
  onNext?: () => void;
  onPrev?: () => void;
  current?: number;
  total?: number;
}

export function Footer({ onNext, onPrev, current, total }: FooterProps) {
  return (
    <div className="w-full bottom-0 sticky h-[4rem] md:h-auto bg-cyan-600">
      <div className="flex items-center h-full md:h-auto bottom-0 mx-12 justify-between">
        <div>
          <button
            onClick={onPrev}
            className="w-[4rem] h-[2rem] md:h-auto bg-white rounded-sm text-sm"
          >
            &lt;
          </button>
        </div>
        
        {current !== undefined && total !== undefined && (
          <span className="text-white text-sm">
           Pertanyaan {current} / {total}
          </span>
        )}

        <div>
          <button
            onClick={onNext}
            className="w-[4rem] h-[2rem] md:h-auto bg-white rounded-sm text-sm"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}