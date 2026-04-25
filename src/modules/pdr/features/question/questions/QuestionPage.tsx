import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import type { Question } from "@/modules/pdr/features/question/shared/types/types";
import type { ChoosenAnswer } from "@/modules/pdr/features/question/types/types";
import { Navbar } from "@/modules/pdr/features/question/shared/components/header";
import { Footer } from "@/modules/pdr/features/question/shared/components/footer";
import { ReviewNotes } from "./components/ReviewNotes";

const QuestionList: Question[] = [
  { id: 1, Question: "Apakah dia selalu percaya diri, antusias, semangat, tidak loyo atau malas-malasan serta menggunakan intonasi yang tepat dalam berkomunikasi" },
  { id: 2, Question: "Apakah dia mampu menyelesaikan setiap tugas yang diberikan dengan hasil yang baik, tepat waktu, dan sesuai dengan standar kualitas yang telah ditetapkan oleh tim maupun perusahaan" },
  { id: 3, Question: "Apakah dia selalu bersikap proaktif dalam mengidentifikasi masalah, memberikan solusi yang tepat, dan berkontribusi secara aktif dalam setiap diskusi maupun pengambilan keputusan di dalam tim" },
];

const initialPilihan: ChoosenAnswer[] = [
  { label: "Tidak Pernah", voters: [] },
  { label: "Jarang", voters: [] },
  {
    label: "Kadang-Kadang",
    voters: [
      { nama: "Yolanda Meyer", foto: "https://i.pravatar.cc/32?img=9", catatan: "Berdasarkan pengamatan saya, perilaku ini masih perlu ditingkatkan konsistensinya.", tanggal: "13 Feb 2026" },
      { nama: "ilham ramadhan", foto: "https://i.pravatar.cc/32?img=3", catatan: "Karyawan ini kadang-kadang menunjukkan semangat yang baik.", tanggal: "14 Feb 2026" },
      { nama: "agus setiawan", foto: "https://i.pravatar.cc/32?img=3", catatan: "Karyawan ini kadang-kadang menunjukkan semangat yang baik.", tanggal: "14 Feb 2026" },
    ],
  },
  { label: "Sering", voters: [] },
  { label: "Konsisten Dan Bisa Dijadikan Contoh", voters: [] },
];

export default function QuestionPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setchoice] = useState<ChoosenAnswer[]>(initialPilihan);
  const [answer, setAnswer] = useState<string | null>(null);
  const [modalPilihan, setModalPilihan] = useState<string | null>(null);
  const [note, setnote] = useState("");
  const [noteindex, setnoteindex] = useState(0);
  const navigate = useNavigate();
  const { state: karyawan } = useLocation();
  const currentUser = { name: karyawan?.name || "User", photo: karyawan?.photo || "https://i.pravatar.cc/32?img=5" };

  function handleJawaban(label: string) {
    if (answer === label) {
      setchoice((prev) => prev.map((p) => p.label === label ? { ...p, voters: p.voters.filter((v) => v.nama !== currentUser.name) } : p));
      setAnswer(null);
      setnote("");
      setnoteindex(0);
      return;
    }
    setnote("");
    setnoteindex(0);
    setchoice((prev) => prev.map((p) => {
      if (p.label === answer) return { ...p, voters: p.voters.filter((v) => v.nama !== currentUser.name) };
      if (p.label === label) return { ...p, voters: [...p.voters, { nama: currentUser.name, foto: currentUser.photo, catatan: "", tanggal: "20 Mar 2026" }] };
      return p;
    }));
    setAnswer(label);
  }

  function handleCatatanChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setnote(val);
    if (answer) {
      setchoice((prev) => prev.map((p) => p.label === answer ? { ...p, voters: p.voters.map((v) => v.nama === currentUser.name ? { ...v, catatan: val } : v) } : p));
    }
  }

  const Voters = choice.flatMap((p) => p.voters).filter((v) => v.nama !== currentUser.name);
  const totalVoters = Voters.length;
  const pilihanModal = choice.find((p) => p.label === modalPilihan);
  const currentQuestion = QuestionList[questionIndex];
  const isLastQuestion = questionIndex === QuestionList.length - 1;

  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center">
    <div className="max-w-sm min-h-screen bg-white flex flex-col justify-center items-center justify-between px-0 py-6">
      <Navbar name={karyawan?.name} position={karyawan?.position} photo={karyawan?.photo} />

      <div className="relative w-full flex-1 flex flex-col ">
        <div className="flex flex-col px-4 py-4 ">
          <p className="text-sm  font-semibold text-gray-700 mb-6">
            {currentQuestion.Question}
          </p>

          <div className="flex flex-col gap-2 md:max-w-lg">
            {choice.map((p) => (
              <div key={p.label}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleJawaban(p.label)}
                    className={`flex justify-between items-center w-full md:max-w-md font-medium text-cyan-600 border border-cyan-600 py-2 px-4 rounded-md transition ${answer === p.label ? "bg-cyan-50" : "bg-white"}`}
                  >
                    <span className="text-sm">{p.label}</span>
                  </button>
                  {answer === p.label && (
                    <button className="hidden md:block" onClick={() => setModalPilihan(p.label)}>
                      <IoDocumentTextOutline className="text-gray-500 text-xl hover:text-cyan-600" />
                    </button>
                  )}
                </div>
                {answer === p.label && (
                  <div className="mt-2 md:hidden border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Catatan</p>
                    <textarea
                      className="w-full text-sm text-gray-600 resize-none focus:outline-none border border-gray-100 rounded-lg p-2 h-12"
                      placeholder="Tulis catatan kamu di sini..."
                      value={note}
                      onChange={handleCatatanChange}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalVoters > 0 && (
            <ReviewNotes
              voters={Voters}
              index={noteindex}
              onPrev={() => setnoteindex((prev) => Math.max(prev - 1, 0))}
              onNext={() => setnoteindex((prev) => Math.min(prev + 1, totalVoters - 1))}
            />
          )}

          <div className="flex hidden md:display gap-2 items-start mt-6 md:mt-8">
            <span className="inline-flex items-center justify-center w-4 h-4 bg-gray-700 text-white rounded-full text-xs shrink-0 mt-0.5">i</span>
            <p className="text-xs md:text-sm text-gray-500 max-w-xl">
              Lewati jawaban! Jika karyawan yang bersangkutan belum mendapatkan kesempatan / diperlukan untuk diterapkan di project yang di handle
            </p>
          </div>
        </div>
      </div>

      {modalPilihan && pilihanModal && (
        <div className="hidden md:flex fixed inset-0 bg-black/50 items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg h-auto w-xl">
            <div className="flex w-full justify-between border-b border-gray-300 items-center p-4 mb-4">
              <p className="font-semibold text-gray-800">Catatan</p>
              <button onClick={() => setModalPilihan(null)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <div className="flex flex-col p-4 pt-0 gap-4">
              {pilihanModal.voters.map((voter) => (
                <div key={voter.nama} className="flex gap-3">
                  <img src={voter.foto} alt={voter.nama} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{voter.nama}</p>
                    <p className="text-sm text-gray-500 mt-1">{voter.catatan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer
        onNext={() => { if (isLastQuestion) { navigate('/pdr/Done', { state: karyawan }); } else { setQuestionIndex((prev) => prev + 1); setAnswer(null); setnote(""); } }}
        onPrev={() => { if (questionIndex === 0) { navigate(-1); } else { setQuestionIndex((prev) => prev - 1); setAnswer(null); setnote(""); } }}
        current={questionIndex + 1}
        total={QuestionList.length}
      />
    </div>
    </div>
  );
}