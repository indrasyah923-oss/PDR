import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { Navbar } from "../../shared/components/Navbar";
import { CompetencyModal } from "./components/CompetencyModal";
import type { competencyData } from "./types/types";

const CORE_SHEET_NAME = "core";
const CORE_RANGE = "A1:D14";

const competency: competencyData[] = [
  {
    group: "Operasional",
    items: ["CTO", "Accounting"],
  },
  {
    group: "Business",
    items: [
      "Marketing",
      "Multimedia",
      "Project Manager",
      "Lead Programmer",
      "Web Programmer",
      "Mobile Programmer",
    ],
  },
];

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
        <CompetencyModal
          item={modal.item}
          group={modal.group}
          sheetName={CORE_SHEET_NAME}
          range={CORE_RANGE}
          onClose={closeModal}
        />
      )}
    </div>
  );
}