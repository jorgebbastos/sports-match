import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
 ArrowLeft,
 Calendar,
 Clock,
 Users,
 MapPin,
 Phone,
 MessageCircle,
 Navigation,
 X,
 Swords,
} from "lucide-react";

const sports = ["Tênis", "Futebol", "Vôlei", "Basquete", "Corrida", "Natação", "Padel"];

interface PartnerArena {
 id: string;
 name: string;
 address: string;
 phone: string;
 mapsUrl: string;
 hours: string;
}

const PARTNER_ARENAS: PartnerArena[] = [
 {
  id: "arena1",
  name: "Arena Esportiva Central",
  address: "R. das Palmeiras, 123 Pinheiros, SP",
  phone: "5511987654321",
  mapsUrl: "https://maps.google.com/?q=Arena+Esportiva+Central+São+Paulo",
  hours: "SegSex: 07h23h | SábDom: 07h22h",
 },
 {
  id: "arena2",
  name: "Sports Center Arena",
  address: "Av. Paulista, 2000 Bela Vista, SP",
  phone: "5511912345678",
  mapsUrl: "https://maps.google.com/?q=Sports+Center+Arena+Paulista+São+Paulo",
  hours: "Todos os dias: 06h00h",
 },
];

const individualProfiles: Record<string, { name: string; sports: { name: string; level: string }[] }> = {
 "1": { name: "Marina Costa", sports: [{ name: "Vôlei", level: "Avançado" }, { name: "Corrida", level: "Intermediário" }] },
 "3": { name: "Pedro Santos", sports: [{ name: "Futebol", level: "Intermediário" }, { name: "Corrida", level: "Iniciante" }] },
 "5": { name: "Julia Mendes", sports: [{ name: "Tênis", level: "Avançado" }, { name: "Padel", level: "Intermediário" }] },
};

const mockOpponentGroups = [
 { id: "g2", name: "Time da Quarta", sport: "Futebol", members: 18, level: "Intermediário" },
 { id: "g3", name: "Leões do Parque", sport: "Futebol", members: 14, level: "Avançado" },
 { id: "g4", name: "Grupo Vôlei de Praia", sport: "Vôlei", members: 24, level: "Avançado" },
 { id: "g5", name: "Pelada dos Amigos", sport: "Futebol", members: 12, level: "Iniciante" },
];

interface ConfirmModalProps {
 sport: string;
 date: string;
 time: string;
 opponentName: string;
 arena: PartnerArena;
 onClose: () => void;
 onConfirm: () => void;
}

function ConfirmModal({ sport, date, time, opponentName, arena, onClose, onConfirm }: ConfirmModalProps) {
 const formatDate = (d: string) => {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m} às ${time || ""}`;
 };

 const whatsappText = encodeURIComponent(
  `Olá, ${arena.name}! \nQuero agendar uma partida:\n Esporte: ${sport || ""}\n Data: ${formatDate(date)}\n Jogadores: João Silva vs ${opponentName}\nPodem confirmar disponibilidade?`
 );

 return (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-0">
   <div className="bg-white rounded-t-md w-full max-w-lg p-6 pb-8 animate-slide-up">
    <div className="flex items-center justify-between mb-5">
     <h2 className="text-lg font-bold text-gray-900">Partida Confirmada!</h2>
     <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full">
      <X size={20} />
     </button>
    </div>

    {/* Arena info */}
    <div className="bg-gradient-to-r from-[#12d875]/10 to-[#12d875]/10 rounded-md p-4 mb-5 border border-[#12d875]/20">
     <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-[#12d875] rounded-md flex items-center justify-center flex-shrink-0">
       <MapPin size={18} className="text-white" />
      </div>
      <div className="flex-1">
       <p className="font-semibold text-gray-900">{arena.name}</p>
       <p className="text-sm text-gray-600 mt-0.5">{arena.address}</p>
       <p className="text-xs text-gray-500 mt-1">{arena.hours}</p>
      </div>
     </div>
     <div className="mt-3 pt-3 border-t border-[#12d875]/10 grid grid-cols-2 gap-2 text-sm text-gray-700">
      <div className="flex items-center gap-1.5">
       <Calendar size={13} className="text-[#12d875]" />
       <span>{formatDate(date)}</span>
      </div>
      <div className="flex items-center gap-1.5">
       <Users size={13} className="text-[#12d875]" />
       <span className="truncate">{opponentName}</span>
      </div>
     </div>
    </div>

    {/* Map preview (static image via link) */}
    <a
     href={arena.mapsUrl}
     target="_blank"
     rel="noreferrer"
     className="block mb-4"
    >
     <div className="relative h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center hover:opacity-90 transition-opacity">
      <div className="text-center">
       <MapPin size={28} className="text-[#12d875] mx-auto mb-1" />
       <p className="text-sm font-medium text-gray-700">Ver no Maps</p>
       <p className="text-xs text-gray-500">{arena.address}</p>
      </div>
      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-[#12d875] shadow-[0_1px_0_rgba(11,18,32,0.08)]">
       Abrir Maps 
      </div>
     </div>
    </a>

    {/* Action buttons */}
    <div className="space-y-3">
     <a
      href={arena.mapsUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 w-full py-3 bg-[#12d875] text-white rounded-md font-semibold hover:bg-[#10c26a] transition-colors"
     >
      <Navigation size={18} />
      Abrir no Maps
     </a>
     <a
      href={`https://wa.me/${arena.phone}?text=${whatsappText}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-md font-semibold hover:bg-[#1ebe5a] transition-colors"
     >
      <MessageCircle size={18} />
      Avisar Arena pelo WhatsApp
     </a>
     <button
      onClick={onConfirm}
      className="w-full py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
     >
      Ir para Agenda
     </button>
    </div>
   </div>
  </div>
 );
}

export default function CreateMatch() {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const matchId = searchParams.get("matchId");
 const isGroupVsGroup = searchParams.get("type") === "group-vs-group";

 const isGroup = matchId === "2" || matchId === "4";
 const groupInfo =
  matchId === "2"
   ? { name: "Time da Quarta", representative: "Carlos Mendes", members: 18, sport: "Futebol", level: "Intermediário" }
   : matchId === "4"
   ? { name: "Grupo Vôlei de Praia", representative: "Ana Paula", members: 24, sport: "Vôlei", level: "Avançado" }
   : null;

 const individualProfile = individualProfiles[matchId || "5"] || individualProfiles["5"];
 const individualName = individualProfile.name;

 const [sport, setSport] = useState(isGroup && groupInfo ? groupInfo.sport : "");
 const [date, setDate] = useState("");
 const [time, setTime] = useState("");
 const [mode, setMode] = useState<"casual" | "competitive">("casual");
 const [selectedArenaId, setSelectedArenaId] = useState(PARTNER_ARENAS[0].id);
 const [location, setLocation] = useState("");
 const [selectedOpponentGroupId, setSelectedOpponentGroupId] = useState(mockOpponentGroups[0].id);
 const [showModal, setShowModal] = useState(false);

 const selectedArena = PARTNER_ARENAS.find(a => a.id === selectedArenaId) ?? PARTNER_ARENAS[0];
 const selectedOpponentGroup = mockOpponentGroups.find(g => g.id === selectedOpponentGroupId) ?? mockOpponentGroups[0];
 const finalLocation = location.trim() !== "" ? location: selectedArena.name;

 const opponentName = isGroupVsGroup
  ? selectedOpponentGroup.name
  : isGroup && groupInfo
  ? groupInfo.name
  : individualName;

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setShowModal(true);
 };

 return (
  <div className="min-h-screen bg-white p-6 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center gap-3 mb-6">
     <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <h1 className="text-2xl font-bold text-gray-900">
      {isGroupVsGroup ? "Desafiar Grupo" : "Criar Partida"}
     </h1>
    </div>

    {isGroupVsGroup && (
     <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6 flex items-center gap-3">
      <Swords size={20} className="text-orange-600 flex-shrink-0" />
      <p className="text-sm text-orange-800 font-medium">Desafio entre grupos escolha o adversário abaixo</p>
     </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
     {/* Esporte */}
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Esporte</label>
      <div className="grid grid-cols-2 gap-3">
       {sports.map((s) => (
        <button key={s} type="button" onClick={() => setSport(s)}
         className={`p-3 rounded-md border-2 transition-colors ${sport === s ? "border-[#12d875] bg-[#12d875]/10 text-[#12d875]" : "border-gray-300 text-gray-700 hover:border-gray-400"}`}>
         {s}
        </button>
       ))}
      </div>
     </div>

     {/* Data */}
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
      <div className="relative">
       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent" required />
      </div>
     </div>

     {/* Horário */}
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
      <div className="relative">
       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent" required />
      </div>
     </div>

     {/* Local */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Local
  </label>

  <div className="relative mb-5">
    <MapPin
      size={20}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Digite qualquer local ou selecione uma arena abaixo"
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
    />
  </div>

  <div className="flex items-center gap-3 mb-4">
    <div className="flex-1 h-px bg-gray-200"></div>

    <span className="text-xs uppercase tracking-wide text-gray-400">
      Arenas Parceiras
    </span>

    <div className="flex-1 h-px bg-gray-200"></div>
  </div>

  <div className="space-y-2">

    {PARTNER_ARENAS.map((arena) => (

      <button
        key={arena.id}
        type="button"
        onClick={() => {
          setSelectedArenaId(arena.id);
          setLocation(arena.name);
        }}
        className={`w-full p-3 rounded-md border-2 transition-all text-left ${
          selectedArenaId === arena.id
            ? "border-[#12d875] bg-[#12d875]/5"
            : "border-gray-200 hover:border-[#12d875]/50"
        }`}
      >

        <div className="flex items-start gap-3">

          <MapPin
            size={17}
            className={`mt-0.5 ${
              selectedArenaId === arena.id
                ? "text-[#12d875]"
                : "text-gray-400"
            }`}
          />

          <div className="flex-1">

            <p
              className={`font-semibold ${
                selectedArenaId === arena.id
                  ? "text-[#12d875]"
                  : "text-gray-900"
              }`}
            >
              {arena.name}
            </p>

            <p className="text-xs text-gray-500">
              {arena.address}
            </p>

          </div>

          <Phone
            size={14}
            className="text-gray-400"
          />

        </div>

      </button>

    ))}

  </div>
</div>

     {/* Modo de Jogo */}
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">Modo de Jogo</label>
      <div className="grid grid-cols-2 gap-3">
       <button type="button" onClick={() => setMode("casual")}
        className={`p-4 rounded-md border-2 transition-colors ${mode === "casual" ? "border-[#12d875] bg-[#12d875]/10 text-[#12d875]" : "border-gray-300 text-gray-700 hover:border-gray-400"}`}>
        <div className="text-2xl mb-1"></div>
        <div className="font-semibold">Casual</div>
        <div className="text-xs opacity-70">Jogo descontraído</div>
       </button>
       <button type="button" onClick={() => setMode("competitive")}
        className={`p-4 rounded-md border-2 transition-colors ${mode === "competitive" ? "border-[#12d875] bg-[#12d875]/10 text-[#12d875]" : "border-gray-300 text-gray-700 hover:border-gray-400"}`}>
        <div className="text-2xl mb-1"></div>
        <div className="font-semibold">Competitivo</div>
        <div className="text-xs opacity-70">Resultado registrado</div>
       </button>
      </div>
     </div>

     {/* Adversário */}
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
       {isGroupVsGroup ? "Grupo Adversário" : isGroup ? "Marcar com Grupo" : "Convidar Jogador"}
      </label>

      {isGroupVsGroup ? (
       <div className="space-y-2">
        {mockOpponentGroups.map((g) => (
         <button key={g.id} type="button" onClick={() => setSelectedOpponentGroupId(g.id)}
          className={`w-full p-3 rounded-md border-2 text-left transition-colors ${selectedOpponentGroupId === g.id ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="flex items-center gap-3">
           <div className="w-9 h-9 bg-[#12d875]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Swords size={16} className="text-[#12d875]" />
           </div>
           <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">{g.name}</p>
            <p className="text-xs text-gray-500">{g.members} membros · {g.level}</p>
           </div>
           <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{g.sport}</span>
          </div>
         </button>
        ))}
       </div>
      ) : matchId ? (
       <div className="bg-gray-50 p-4 rounded-md">
        <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
          {isGroup ? <Users size={20} className="text-white" /> : <Calendar size={20} className="text-white" />}
         </div>
         <div className="flex-1">
          {isGroup && groupInfo ? (
           <>
            <div className="flex items-center gap-2">
             <p className="font-semibold text-gray-900">{groupInfo.name}</p>
             <span className="px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">Grupo</span>
            </div>
            <p className="text-xs text-gray-600">Representante: {groupInfo.representative}</p>
            <div className="flex flex-wrap gap-2 mt-2">
             <span className="px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">{groupInfo.sport} · {groupInfo.level}</span>
            </div>
           </>
          ) : (
           <>
            <p className="font-semibold text-gray-900">{individualName}</p>
            <div className="flex flex-wrap gap-2 mt-2">
             {individualProfile.sports.map((item) => (
              <span key={item.name} className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.name === sport ? "bg-[#12d875] text-white" : "bg-[#12d875]/10 text-[#12d875]"}`}>
               {item.name} · {item.level}
              </span>
             ))}
            </div>
           </>
          )}
         </div>
        </div>
       </div>
      ) : (
       <button type="button" className="w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-[#12d875] hover:text-[#12d875] transition-colors">
        Selecionar da lista de conversas
       </button>
      )}
     </div>

     <button type="submit" className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors">
      {isGroupVsGroup ? "Enviar Desafio" : "Criar Partida"}
     </button>
    </form>
   </div>

   {showModal && (
    <ConfirmModal
     sport={sport}
     date={date}
     time={time}
     opponentName={opponentName}
     arena={selectedArena}
     onClose={() => setShowModal(false)}
     onConfirm={() => { setShowModal(false); navigate("/agenda"); }}
    />
   )}
  </div>
 );
}
