import {
 ArrowLeft,
 Calendar,
 CheckCircle2,
 Clock,
 MapPin,
 ShieldCheck,
 Trophy,
 Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
 mockTournaments,
 readRegisteredTournamentIds,
 writeRegisteredTournamentIds,
} from "../data/tournaments";

export default function TournamentDetails() {
 const navigate = useNavigate();
 const { tournamentId } = useParams();
 const tournament = mockTournaments.find((item) => String(item.id) === tournamentId);
 const [registeredIds, setRegisteredIds] = useState<number[]>(() => readRegisteredTournamentIds());

 if (!tournament) {
  return (
   <div className="min-h-screen bg-gray-50 p-6">
    <button onClick={() => navigate("/tournaments")} className="p-2 hover:bg-gray-100 rounded-full mb-6">
     <ArrowLeft size={24} />
    </button>
    <div className="bg-white rounded-md p-8 text-center">
     <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-3" />
     <h1 className="text-xl font-bold text-gray-900 mb-2">Torneio n?o encontrado</h1>
     <p className="text-gray-600 mb-4">Volte para a lista e escolha outro torneio.</p>
     <button
      onClick={() => navigate("/tournaments")}
      className="bg-[#12d875] text-white px-6 py-3 rounded-md font-semibold"
     >
      Ver torneios
     </button>
    </div>
   </div>
  );
 }

 const isRegistered = registeredIds.includes(tournament.id);
 const canRegister = tournament.status === "open";

 const registerTournament = () => {
  if (isRegistered || !canRegister) return;
  const nextIds = [...registeredIds, tournament.id];
  setRegisteredIds(nextIds);
  writeRegisteredTournamentIds(nextIds);
 };

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-2xl mx-auto p-4 flex items-center gap-3">
     <button onClick={() => navigate("/tournaments")} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <div>
      <h1 className="font-bold text-gray-900 leading-tight">{tournament.name}</h1>
      <p className="text-sm text-gray-600">{tournament.sport}</p>
     </div>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 space-y-4">
    <div className="bg-[#0b1220] text-white rounded-md p-6">
     <div className="flex items-center justify-between gap-3 mb-4">
      <span className="px-3 py-1 bg-[#12d875] text-[#0b1220] rounded-full text-sm font-semibold">
       {isRegistered ? "Inscrito" : tournament.status === "open" ? "Inscrições abertas" : "Inscrições fechadas"}
      </span>
      <span className="text-sm text-white/70">{tournament.registrationFee}</span>
     </div>
     <h2 className="text-2xl font-bold mb-3">{tournament.name}</h2>
     <p className="text-white/80 leading-relaxed">{tournament.description}</p>
    </div>

    <div className="grid grid-cols-2 gap-3">
     <InfoTile icon={Calendar} label="Data" value={new Date(tournament.date).toLocaleDateString("pt-BR")} />
     <InfoTile icon={MapPin} label="Local" value={tournament.location} />
     <InfoTile icon={Users} label="Vagas" value={`${tournament.participants + (isRegistered ? 1 : 0)}/${tournament.maxParticipants}`} />
     <InfoTile icon={Trophy} label="Premiação" value={tournament.prize} />
    </div>

    <section className="bg-white rounded-md p-5">
     <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <Clock size={18} className="text-[#12d875]" />
      Informações do torneio
     </h3>
     <div className="space-y-3 text-sm text-gray-700">
      <p><span className="font-semibold text-gray-900">Organizador:</span> {tournament.organizer}</p>
      <p><span className="font-semibold text-gray-900">N?vel:</span> {tournament.level}</p>
      <p><span className="font-semibold text-gray-900">Formato:</span> {tournament.format}</p>
     </div>
    </section>

    <section className="bg-white rounded-md p-5">
     <h3 className="font-semibold text-gray-900 mb-3">Programação</h3>
     <div className="space-y-2">
      {tournament.schedule.map((item) => (
       <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
        <div className="w-2 h-2 rounded-full bg-[#12d875]" />
        {item}
       </div>
      ))}
     </div>
    </section>

    <section className="bg-white rounded-md p-5">
     <h3 className="font-semibold text-gray-900 mb-3">Regras e benef?cios</h3>
     <div className="space-y-4">
      <Checklist items={tournament.rules} />
      <div className="border-t border-gray-100 pt-4">
       <Checklist items={tournament.perks} iconColor="text-[#12d875]" />
      </div>
     </div>
    </section>

    <button
     onClick={registerTournament}
     disabled={!canRegister || isRegistered}
     className={`w-full py-4 rounded-md font-semibold transition-colors flex items-center justify-center gap-2 ${
      isRegistered
       ? "bg-[#12d875]/10 text-[#0b1220]"
       : canRegister
       ? "bg-[#12d875] text-white hover:bg-[#10c26a]"
       : "bg-gray-200 text-gray-500"
     }`}
    >
     {isRegistered && <CheckCircle2 size={20} />}
     {isRegistered ? "Inscrição confirmada" : canRegister ? "Inscrever-se" : "Torneio lotado"}
    </button>

    <button
     onClick={() => navigate("/premium")}
     className="w-full bg-white border border-gray-200 text-gray-900 py-4 rounded-md font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
    >
     <ShieldCheck size={20} className="text-[#12d875]" />
     Ver vantagens Premium
    </button>
   </div>
  </div>
 );
}

function InfoTile({
 icon: Icon,
 label,
 value,
}: {
 icon: typeof Calendar;
 label: string;
 value: string;
}) {
 return (
  <div className="bg-white rounded-md p-4">
   <Icon size={18} className="text-[#12d875] mb-2" />
   <p className="text-xs text-gray-500 mb-1">{label}</p>
   <p className="font-semibold text-gray-900">{value}</p>
  </div>
 );
}

function Checklist({ items, iconColor = "text-gray-500" }: { items: string[]; iconColor?: string }) {
 return (
  <div className="space-y-2">
   {items.map((item) => (
    <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
     <CheckCircle2 size={16} className={`${iconColor} mt-0.5 flex-shrink-0`} />
     <span>{item}</span>
    </div>
   ))}
  </div>
 );
}
