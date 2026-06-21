import {
 Award,
 Calendar,
 CheckCircle2,
 Clock,
 Eye,
 Filter,
 MapPin,
 TrendingUp,
 Trophy,
 Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
 mockTournaments,
 readRegisteredTournamentIds,
 Tournament,
 writeRegisteredTournamentIds,
} from "../data/tournaments";

export default function Tournaments() {
 const navigate = useNavigate();
 const [filter, setFilter] = useState<"all" | "open" | "registered">("all");
 const [activeTab, setActiveTab] = useState<"tournaments" | "mytournaments">("tournaments");
 const [showFilters, setShowFilters] = useState(false);
 const [selectedSport, setSelectedSport] = useState<string>("all");
 const [selectedLevel, setSelectedLevel] = useState<string>("all");
 const [selectedLocation, setSelectedLocation] = useState<string>("all");
 const [registeredIds, setRegisteredIds] = useState<number[]>(() => readRegisteredTournamentIds());

 const sports = ["Todos", "T?nis", "Futebol", "V?lei", "Basquete", "Corrida"];
 const levels = ["Todos os n?veis", "Iniciante", "Intermedi?rio", "Avan?ado"];
 const locations = ["Todas as cidades", "S?o Paulo", "Santos", "Belo Horizonte"];

 const registerTournament = (tournamentId: number) => {
  if (registeredIds.includes(tournamentId)) return;
  const nextIds = [...registeredIds, tournamentId];
  setRegisteredIds(nextIds);
  writeRegisteredTournamentIds(nextIds);
  setActiveTab("mytournaments");
  setFilter("registered");
 };

 const registeredTournaments = useMemo(
  () => mockTournaments.filter((tournament) => registeredIds.includes(tournament.id)),
  [registeredIds],
 );

 const filteredTournaments = mockTournaments.filter((tournament) => {
  if (filter === "open" && tournament.status !== "open") return false;
  if (filter === "registered" && !registeredIds.includes(tournament.id)) return false;
  if (selectedSport !== "all" && selectedSport !== "Todos" && tournament.sport !== selectedSport) return false;
  if (
   selectedLevel !== "all" &&
   selectedLevel !== "Todos os n?veis" &&
   !tournament.level.includes(selectedLevel)
  ) {
   return false;
  }
  if (
   selectedLocation !== "all" &&
   selectedLocation !== "Todas as cidades" &&
   !tournament.location.includes(selectedLocation)
  ) {
   return false;
  }
  return true;
 });

 const activeFiltersCount = [
  selectedSport !== "all" && selectedSport !== "Todos",
  selectedLevel !== "all" && selectedLevel !== "Todos os n?veis",
  selectedLocation !== "all" && selectedLocation !== "Todas as cidades",
 ].filter(Boolean).length;

 const clearFilters = () => {
  setSelectedSport("all");
  setSelectedLevel("all");
  setSelectedLocation("all");
 };

 const getStatusBadge = (status: Tournament["status"]) => {
  const badges = {
   open: { text: "Aberto", className: "bg-green-100 text-green-700" },
   full: { text: "Lotado", className: "bg-red-100 text-red-700" },
   ongoing: { text: "Em andamento", className: "bg-green-100 text-green-700" },
   finished: { text: "Finalizado", className: "bg-gray-100 text-gray-700" },
  };
  return badges[status];
 };

 const renderTournamentCard = (tournament: Tournament) => {
  const badge = getStatusBadge(tournament.status);
  const isRegistered = registeredIds.includes(tournament.id);

  return (
   <div key={tournament.id} className="bg-white rounded-md p-5 shadow-[0_1px_0_rgba(11,18,32,0.08)]">
    <div className="flex items-start justify-between mb-3">
     <div>
      <h3 className="font-semibold text-gray-900 text-lg mb-1">{tournament.name}</h3>
      <span className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-sm font-medium">
       {tournament.sport}
      </span>
     </div>
     <span className={`px-3 py-1 rounded-full font-medium ${badge.className} text-[12px]`}>
      {isRegistered ? "Inscrito" : badge.text}
     </span>
    </div>

    <div className="space-y-2 text-sm text-gray-600 mb-4">
     <div className="flex items-center gap-2">
      <Calendar size={16} />
      {new Date(tournament.date).toLocaleDateString("pt-BR", {
       day: "numeric",
       month: "long",
       year: "numeric",
      })}
     </div>
     <div className="flex items-center gap-2">
      <MapPin size={16} />
      {tournament.location}
     </div>
     <div className="flex items-center gap-2">
      <Users size={16} />
      {tournament.participants + (isRegistered ? 1 : 0)}/{tournament.maxParticipants} participantes
     </div>
     <div className="flex items-center gap-2">
      <Trophy size={16} />
      Premiação: {tournament.prize}
     </div>
     <div className="flex items-center gap-2">
      <Clock size={16} />
      N?vel: {tournament.level}
     </div>
    </div>

    <div className="flex gap-3">
     <button
      onClick={() => navigate(`/tournaments/${tournament.id}`)}
      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
     >
      <Eye size={17} />
      Detalhes
     </button>
     {tournament.status === "open" && (
      <button
       onClick={() => registerTournament(tournament.id)}
       disabled={isRegistered}
       className={`flex-1 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
        isRegistered ? "bg-[#12d875]/10 text-[#0b1220]" : "bg-[#12d875] text-white hover:bg-[#10c26a]"
       }`}
      >
       {isRegistered && <CheckCircle2 size={17} />}
       {isRegistered ? "Inscrito" : "Inscrever-se"}
      </button>
     )}
    </div>
   </div>
  );
 };

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-2xl mx-auto px-6 pt-6 pb-4">
     <div className="flex items-center justify-between mb-4">
      <div>
       <h1 className="text-2xl font-bold text-gray-900">Torneios</h1>
       <p className="text-sm text-gray-600">Competições e eventos esportivos</p>
      </div>
      <button
       onClick={() => setShowFilters(!showFilters)}
       className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
       <Filter size={24} />
       {activeFiltersCount > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#12d875] text-white rounded-full flex items-center justify-center text-xs font-semibold">
         {activeFiltersCount}
        </div>
       )}
      </button>
     </div>

     <div className="flex gap-2 mb-4">
      <button
       onClick={() => setActiveTab("tournaments")}
       className={`flex-1 py-3 rounded-md font-medium transition-colors ${
        activeTab === "tournaments" ? "bg-gray-100 text-gray-900" : "bg-transparent text-gray-600"
       }`}
      >
       Dispon?veis
      </button>
      <button
       onClick={() => setActiveTab("mytournaments")}
       className={`flex-1 py-3 rounded-md font-medium transition-colors ${
        activeTab === "mytournaments" ? "bg-gray-100 text-gray-900" : "bg-transparent text-gray-600"
       }`}
      >
       Meus Torneios
      </button>
     </div>

     {activeTab === "tournaments" && (
      <div className="flex gap-2 overflow-x-auto pb-2">
       {[
        { key: "all" as const, label: "Todos" },
        { key: "open" as const, label: "Abertos" },
        { key: "registered" as const, label: "Inscritos" },
       ].map((item) => (
        <button
         key={item.key}
         onClick={() => setFilter(item.key)}
         className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
          filter === item.key ? "bg-[#12d875] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
         }`}
        >
         {item.label}
        </button>
       ))}
      </div>
     )}
    </div>

    {showFilters && activeTab === "tournaments" && (
     <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-4">
       <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filtros avan?ados</h3>
        {activeFiltersCount > 0 && (
         <button onClick={clearFilters} className="text-sm text-[#12d875] font-medium hover:underline">
          Limpar tudo
         </button>
        )}
       </div>

       <div className="space-y-4">
        <FilterGroup
         label="Esporte"
         options={sports}
         selected={selectedSport === "all" ? "Todos" : selectedSport}
         onSelect={(sport) => setSelectedSport(sport === "Todos" ? "all" : sport)}
        />
        <FilterGroup
         label="N?vel"
         options={levels}
         selected={selectedLevel === "all" ? "Todos os n?veis" : selectedLevel}
         onSelect={(level) => setSelectedLevel(level === "Todos os n?veis" ? "all" : level)}
        />
        <FilterGroup
         label="Localização"
         options={locations}
         selected={selectedLocation === "all" ? "Todas as cidades" : selectedLocation}
         onSelect={(location) => setSelectedLocation(location === "Todas as cidades" ? "all" : location)}
        />
       </div>
      </div>
     </div>
    )}
   </div>

   <div className="max-w-2xl mx-auto p-6">
    {activeTab === "tournaments" && (
     <div>
      {(activeFiltersCount > 0 || filter === "registered") && (
       <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
        <span>{filteredTournaments.length} torneio(s) encontrado(s)</span>
       </div>
      )}
      <div className="space-y-4">{filteredTournaments.map(renderTournamentCard)}</div>
      {filteredTournaments.length === 0 && (
       <EmptyTournaments
        title={filter === "registered" ? "Nenhum torneio inscrito" : "Nenhum torneio encontrado"}
        description={
         filter === "registered"
          ? "Quando voc? se inscrever, o torneio aparece aqui."
          : "Tente ajustar os filtros para ver mais torneios."
        }
        actionLabel={filter === "registered" ? "Ver torneios abertos" : "Limpar filtros"}
        onAction={() => {
         if (filter === "registered") setFilter("open");
         clearFilters();
        }}
       />
      )}
     </div>
    )}

    {activeTab === "mytournaments" && (
     <div>
      {registeredTournaments.length === 0 ? (
       <EmptyTournaments
        title="Nenhum torneio inscrito"
        description="Inscreva-se em torneios para come?ar a competir."
        actionLabel="Explorar Torneios"
        onAction={() => setActiveTab("tournaments")}
       />
      ) : (
       <div className="space-y-4 mb-6">{registeredTournaments.map(renderTournamentCard)}</div>
      )}

      <div className="bg-white rounded-md p-6">
       <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Award size={20} className="text-[#12d875]" />
        Suas conquistas
       </h3>
       <div className="grid grid-cols-3 gap-3">
        {[
         { label: "Inscrições", value: registeredTournaments.length },
         { label: "P?dios", value: 0 },
         { label: "T?tulos", value: 0 },
        ].map((stat) => (
         <div key={stat.label} className="bg-gray-50 rounded-md p-3 text-center">
          <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-600">{stat.label}</p>
         </div>
        ))}
       </div>
      </div>
     </div>
    )}

    <div className="mt-6 bg-[#0b1220] rounded-md p-6 text-white">
     <div className="flex items-center gap-3 mb-3">
      <TrendingUp size={24} className="text-[#12d875]" />
      <h3 className="font-semibold text-lg">Competidor Premium</h3>
     </div>
     <p className="text-sm text-white/80 mb-4">
      Acesso priorit?rio a torneios exclusivos, m?tricas detalhadas e ranking competitivo completo.
     </p>
     <button
      onClick={() => navigate("/premium")}
      className="bg-white text-[#0b1220] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
     >
      Seja Premium
     </button>
    </div>
   </div>
  </div>
 );
}

function FilterGroup({
 label,
 options,
 selected,
 onSelect,
}: {
 label: string;
 options: string[];
 selected: string;
 onSelect: (value: string) => void;
}) {
 return (
  <div>
   <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
   <div className="flex flex-wrap gap-2">
    {options.map((option) => (
     <button
      key={option}
      onClick={() => onSelect(option)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
       selected === option ? "bg-[#12d875] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
     >
      {option}
     </button>
    ))}
   </div>
  </div>
 );
}

function EmptyTournaments({
 title,
 description,
 actionLabel,
 onAction,
}: {
 title: string;
 description: string;
 actionLabel: string;
 onAction: () => void;
}) {
 return (
  <div className="bg-white rounded-md p-8 text-center mb-6">
   <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-3" />
   <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
   <p className="text-gray-600 mb-4">{description}</p>
   <button onClick={onAction} className="text-[#12d875] font-medium hover:underline">
    {actionLabel}
   </button>
  </div>
 );
}
