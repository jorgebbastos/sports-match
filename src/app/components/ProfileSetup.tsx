import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";

interface ProfileSetupProps {
 onComplete: () => void;
}

const sports = [
 "Tênis",
 "Futebol",
 "Vôlei",
 "Basquete",
 "Corrida",
 "Natação",
 "Ciclismo",
 "Padel",
];
const levels = [
 "Iniciante",
 "Intermediário",
 "Avançado",
 "Profissional",
];
const times = ["Manhã", "Tarde", "Noite", "Final de Semana"];

export default function ProfileSetup({
 onComplete,
}: ProfileSetupProps) {
 const navigate = useNavigate();
 const [selectedSports, setSelectedSports] = useState<
  string[]
 >([]);
 const [sportLevels, setSportLevels] = useState<
  Record<string, string>
 >({});
 const [location, setLocation] = useState("");
 const [preferredTimes, setPreferredTimes] = useState<
  string[]
 >([]);
 const allSelectedSportsHaveLevels =
  selectedSports.length > 0 &&
  selectedSports.every((sport) => sportLevels[sport]);

 const toggleSport = (sport: string) => {
  if (selectedSports.includes(sport)) {
   setSelectedSports((prev) =>
    prev.filter((s) => s !== sport),
   );
   setSportLevels((current) => {
    const next = { ...current };
    delete next[sport];
    return next;
   });
   return;
  }

  setSelectedSports((prev) => [...prev, sport]);
 };

 const setSportLevel = (sport: string, level: string) => {
  setSportLevels((prev) => ({
   ...prev,
   [sport]: level,
  }));
 };

 const toggleTime = (time: string) => {
  setPreferredTimes((prev) =>
   prev.includes(time)
    ? prev.filter((t) => t !== time)
    : [...prev, time],
  );
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!allSelectedSportsHaveLevels) return;
  onComplete();
  navigate("/swipe");
 };

 return (
  <div className="min-h-screen p-6 bg-white overflow-y-auto pb-24">
   <div className="max-w-2xl mx-auto">
    <button
     onClick={() => navigate(-1)}
     className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
     aria-label="Voltar"
    >
     <ArrowLeft size={24} />
    </button>

    <div className="text-center mb-8">
     <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-5xl"></span>
     </div>
     <button className="text-[#12d875] font-medium text-sm">
      Adicionar Foto
     </button>
    </div>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">
     Complete seu Perfil
    </h1>
    <p className="text-gray-600 mb-6">
     Ajude-nos a encontrar os melhores parceiros para você
    </p>

    <form onSubmit={handleSubmit} className="space-y-6">
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
       Quais esportes você pratica?
      </label>
      <div className="grid grid-cols-2 gap-3">
       {sports.map((sport) => (
        <button
         key={sport}
         type="button"
         onClick={() => toggleSport(sport)}
         className={`p-3 rounded-md border-2 transition-colors ${
          selectedSports.includes(sport)
           ? "border-[#12d875] bg-[#12d875]/10 text-[#12d875]"
           : "border-gray-300 text-gray-700 hover:border-gray-400"
         }`}
        >
         {sport}
        </button>
       ))}
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
       Qual seu nível técnico em cada esporte?
      </label>
      {selectedSports.length === 0 ? (
       <div className="p-4 rounded-md border-2 border-dashed border-gray-300 text-gray-500 text-sm">
        Selecione um esporte acima para definir seu
        nível técnico.
       </div>
      ) : (
       <div className="space-y-4">
        {selectedSports.map((sport) => (
         <div
          key={sport}
          className="bg-gray-50 rounded-md p-4"
         >
          <h3 className="font-semibold text-gray-900 mb-3">
           {sport}
          </h3>
          <div className="grid grid-cols-2 gap-2">
           {levels.map((lvl) => (
            <button
             key={lvl}
             type="button"
             onClick={() =>
              setSportLevel(sport, lvl)
             }
             className={`p-3 rounded-md border-2 transition-colors ${
              sportLevels[sport] === lvl
               ? "border-[#12d875] bg-[#12d875]/10 text-[#12d875]"
               : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
             }`}
            >
             {lvl}
            </button>
           ))}
          </div>
         </div>
        ))}
       </div>
      )}
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
       Localização
      </label>
      <div className="relative">
       <MapPin
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
       />
       <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        placeholder="São Paulo, SP"
        required
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
       Preferência de horários
      </label>
      <div className="grid grid-cols-2 gap-3">
       {times.map((time) => (
        <button
         key={time}
         type="button"
         onClick={() => toggleTime(time)}
         className={`p-3 rounded-md border-2 transition-colors ${
          preferredTimes.includes(time)
           ? "border-[#12d875] bg-[#12d875]/10 text-[#12d875]"
           : "border-gray-300 text-gray-700 hover:border-gray-400"
         }`}
        >
         <Calendar size={16} className="inline mr-2" />
         {time}
        </button>
       ))}
      </div>
     </div>

     <button
      type="submit"
      disabled={!allSelectedSportsHaveLevels}
      className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
     >
      Concluir Perfil
     </button>
    </form>
   </div>
  </div>
 );
}