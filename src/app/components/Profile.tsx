import {
 MapPin,
 Trophy,
 Star,
 Calendar as CalendarIcon,
 Settings,
 Edit,
 TrendingUp,
 Award,
 Users,
 Plus,
 Phone,
 Clock,
 Building2,
 Dumbbell,
 CalendarPlus,
 User,
 Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useUserType } from "../App";

function ArenaProfile() {
 const navigate = useNavigate();
 const { currentProfile } = useUserType();

 return (
  <div className="min-h-screen p-6 bg-gray-50 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
     <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
      <Settings size={20} />
     </button>
    </div>

    {/* Arena Header Card */}
    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] overflow-hidden mb-6">
     <div className="h-32 bg-gradient-to-r from-[#12d875] to-[#12d875]" />
     <div className="px-6 pb-6">
      <div className="flex items-end justify-between -mt-16 mb-4">
       <div className="relative">
        <div className="w-32 h-32 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-md">
         <Building2 size={52} className="text-[#12d875]" />
        </div>
        <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#12d875] text-white rounded-full flex items-center justify-center hover:bg-[#10c26a] transition-colors shadow-md">
         <Edit size={18} />
        </button>
       </div>
      </div>

      <div className="mb-4">
       <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentProfile.name}</h1>
       <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-semibold mb-3">
        <Building2 size={12} />
        Arena Esportiva
       </span>
       {currentProfile.location && (
        <div className="flex items-center text-gray-600 mb-1">
         <MapPin size={15} className="mr-1 flex-shrink-0" />
         <span className="text-sm">{currentProfile.location}</span>
        </div>
       )}
       {currentProfile.phone && (
        <div className="flex items-center text-gray-600">
         <Phone size={15} className="mr-1 flex-shrink-0" />
         <span className="text-sm">{currentProfile.phone}</span>
        </div>
       )}
      </div>

      {currentProfile.description && (
       <p className="text-gray-700 text-sm mb-4">{currentProfile.description}</p>
      )}

      {currentProfile.hours && (
       <div className="flex items-start gap-2 bg-gray-50 rounded-md p-3">
        <Clock size={15} className="text-[#12d875] mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700">{currentProfile.hours}</span>
       </div>
      )}
     </div>
    </div>

    {/* Sports / Courts */}
    {currentProfile.courts && (
     <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
       <Dumbbell size={18} className="text-[#12d875]" />
       <h2 className="font-semibold text-gray-900">Quadras e Esportes</h2>
      </div>
      <div className="space-y-2">
       {currentProfile.courts.map((court, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
         <div className="w-2 h-2 rounded-full bg-[#12d875] flex-shrink-0" />
         <span className="text-sm text-gray-700">{court}</span>
        </div>
       ))}
      </div>
     </div>
    )}

    {/* Quick Actions */}
    <div className="grid grid-cols-2 gap-4 mb-6">
     <button
      onClick={() => navigate("/create-game")}
      className="flex flex-col items-center justify-center gap-2 p-5 bg-gradient-to-br from-[#12d875] to-[#12d875] text-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] hover:shadow-md transition-shadow"
     >
      <CalendarPlus size={28} />
      <span className="font-semibold text-sm">Criar jogo</span>
      <span className="text-xs text-white/80">Divulgar horário disponível</span>
     </button>
     <button
      onClick={() => navigate("/create-group")}
      className="flex flex-col items-center justify-center gap-2 p-5 bg-gradient-to-br from-[#12d875] to-[#12d875] text-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] hover:shadow-md transition-shadow"
     >
      <Users size={28} />
      <span className="font-semibold text-sm">Criar Grupo</span>
      <span className="text-xs text-white/80">Organizar equipes</span>
     </button>
    </div>

    {/* My Games Preview */}
    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6 mb-6">
     <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-900">Jogos Publicados</h2>
      <button
       onClick={() => navigate("/create-game")}
       className="flex items-center gap-1 px-3 py-1.5 bg-[#12d875]/10 text-[#12d875] rounded-md text-sm font-medium hover:bg-[#12d875]/20 transition-colors"
      >
       <Plus size={14} />
       Novo
      </button>
     </div>
     <div className="space-y-3 mb-3">
      {[
       { name: 'Tênis Quadra 1', date: '18/06 às 09:00', slots: '2/2', open: false },
       { name: 'Futebol Society', date: '19/06 às 19:00', slots: '8/14', open: true },
      ].map((game, i) => (
       <div key={i} className="bg-gray-50 p-3 rounded-md flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center flex-shrink-0">
         <CalendarIcon size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
         <p className="font-medium text-sm text-gray-900">{game.name}</p>
         <p className="text-xs text-gray-500">{game.date} · {game.slots} jogadores</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${game.open ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
         {game.open ? 'Vagas' : 'Lotado'}
        </span>
       </div>
      ))}
     </div>
     <button
      onClick={() => navigate("/my-games")}
      className="w-full py-2 text-[#12d875] font-medium hover:bg-gray-50 rounded-md transition-colors text-sm"
     >
      Ver todos os jogos 
     </button>
    </div>

    {/* My Groups Preview */}
    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6">
     <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-900">Grupos Gerenciados</h2>
      <button
       onClick={() => navigate("/create-group")}
       className="flex items-center gap-1 px-3 py-1.5 bg-[#12d875]/10 text-[#12d875] rounded-md text-sm font-medium hover:bg-[#12d875]/20 transition-colors"
      >
       <Plus size={14} />
       Novo
      </button>
     </div>
     <div className="space-y-3 mb-3">
      {[
       { name: 'Liga de Tênis', members: 24, sport: 'Tênis' },
       { name: 'Time de Fut Society', members: 18, sport: 'Futebol' },
      ].map((group, i) => (
       <div key={i} className="bg-gray-50 p-3 rounded-md flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center flex-shrink-0">
         <Users size={18} className="text-white" />
        </div>
        <div className="flex-1">
         <p className="font-medium text-sm text-gray-900">{group.name}</p>
         <p className="text-xs text-gray-500">{group.members} membros</p>
        </div>
        <span className="px-2 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">
         {group.sport}
        </span>
       </div>
      ))}
     </div>
     <button
      onClick={() => navigate("/my-groups")}
      className="w-full py-2 text-[#12d875] font-medium hover:bg-gray-50 rounded-md transition-colors text-sm"
     >
      Ver Todos os Grupos 
     </button>
    </div>
   </div>
  </div>
 );
}

function PlayerProfile() {
 const navigate = useNavigate();
 const profileSports = [
  { name: "Tênis", level: "Intermediário" },
  { name: "Padel", level: "Avançado" },
  { name: "Corrida", level: "Iniciante" },
 ];

 return (
  <div className="min-h-screen p-6 bg-gray-50 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
     <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
      <Settings size={20} />
     </button>
    </div>

    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] overflow-hidden mb-6">
     <div className="h-32 bg-gradient-to-r from-[#12d875] to-[#12d875]" />
     <div className="px-6 pb-6">
      <div className="flex items-end justify-between -mt-16 mb-4">
       <div className="relative">
        <div className="w-32 h-32 bg-white rounded-full border-4 border-white flex items-center justify-center">
         <User size={72} className="text-[#12d875]" />
        </div>
        <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#12d875] text-white rounded-full flex items-center justify-center hover:bg-[#10c26a] transition-colors shadow-md">
         <Edit size={18} />
        </button>
       </div>
      </div>

      <div className="mb-4">
       <h1 className="text-2xl font-bold text-gray-900 mb-1">João Silva</h1>
       <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-1" />
        <span>São Paulo, SP</span>
       </div>
       <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#12d875]/10 px-3 py-1 rounded-full">
         <Star size={16} className="text-[#12d875] mr-1" />
         <span className="font-semibold text-gray-900">4.5</span>
        </div>
        <span className="text-sm text-gray-600">35 partidas</span>
       </div>
      </div>

      <p className="text-gray-700 mb-4">
       Jogador de tênis e padel há 5 anos. Sempre buscando evoluir e conhecer novos parceiros de jogo!
      </p>

      <div className="mb-4">
       <h3 className="font-semibold text-gray-900 mb-2">Esportes</h3>
       <div className="flex flex-wrap gap-2">
        {profileSports.map((sport) => (
         <span key={sport.name} className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-sm font-medium">
          {sport.name} · {sport.level}
         </span>
        ))}
       </div>
      </div>

      <div>
       <h3 className="font-semibold text-gray-900 mb-2">Horários Preferidos</h3>
       <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
         <CalendarIcon size={14} className="inline mr-1" />Tarde
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
         <CalendarIcon size={14} className="inline mr-1" />Final de Semana
        </span>
       </div>
      </div>
     </div>
    </div>

    <div
     onClick={() => navigate("/rankings")}
     className="bg-gradient-to-r from-[#12d875] to-[#12d875] rounded-md p-5 mb-6 cursor-pointer hover:shadow-md transition-shadow"
    >
     <div className="flex items-center justify-between text-white mb-4">
      <div className="flex items-center gap-3">
       <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
        <Trophy size={28} />
       </div>
       <div>
        <p className="text-sm text-white/80">Seu Ranking</p>
        <p className="text-3xl font-bold">#3</p>
       </div>
      </div>
      <div className="text-right">
       <div className="flex items-center gap-1 text-white mb-1">
        <Star size={18} fill="white" />
        <span className="text-xl font-bold">4.5</span>
       </div>
       <p className="text-xs text-white/80">Avaliação</p>
      </div>
     </div>

     <div className="grid grid-cols-3 gap-3 mb-4">
      {[['980', 'Pontos'], ['68%', 'Vitórias'], ['35', 'Partidas']].map(([val, label]) => (
       <div key={label} className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-center">
        <div className="text-2xl font-bold text-white mb-1">{val}</div>
        <div className="text-xs text-white/80">{label}</div>
       </div>
      ))}
     </div>

     <div className="flex items-center justify-between text-white pt-3 border-t border-white/20">
      <span className="text-sm font-medium">Ver Rankings Completos</span>
      <TrendingUp size={18} />
     </div>
    </div>

    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6 mb-6">
     <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-900">Meus Grupos</h2>
      <button
       onClick={() => navigate("/create-group")}
       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#12d875] to-[#12d875] text-white rounded-md hover:shadow-md transition-shadow"
      >
       <Plus size={18} />
       <span className="text-sm font-medium">Criar Grupo</span>
      </button>
     </div>
     <div className="space-y-3 mb-4">
      {[
       { name: 'Time da Quarta', members: '18 membros 3 solicitações', sport: 'Futebol' },
       { name: 'Grupo Tênis Finals', members: '12 membros 5 solicitações', sport: 'Tênis' },
      ].map((g) => (
       <div key={g.name} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
         <div className="w-12 h-12 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
          <Users size={24} className="text-white" />
         </div>
         <div className="flex-1">
          <p className="font-semibold text-gray-900">{g.name}</p>
          <p className="text-xs text-gray-600">{g.members}</p>
         </div>
         <span className="px-2 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">{g.sport}</span>
        </div>
       </div>
      ))}
     </div>
     <button onClick={() => navigate("/my-groups")} className="w-full py-2 text-[#12d875] font-medium hover:bg-gray-50 rounded-md transition-colors">
      Ver Todos os Grupos 
     </button>
    </div>

    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6 mb-6">
     <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-900">Meus Jogos</h2>
      <button
       onClick={() => navigate("/create-game")}
       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#12d875] to-[#12d875] text-white rounded-md hover:shadow-md transition-shadow"
      >
       <Plus size={18} />
       <span className="text-sm font-medium">Criar jogo</span>
      </button>
     </div>
     <div className="space-y-3 mb-4">
      {[
       { name: 'Racha de Futebol', date: '18/05 às 19:00', slots: '6/10', vagas: '4 vagas' },
       { name: 'Vôlei de Praia', date: '19/05 às 18:00', slots: '5/8', vagas: '3 vagas' },
      ].map((game) => (
       <div key={game.name} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
         <div className="w-12 h-12 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
          <CalendarIcon size={24} className="text-white" />
         </div>
         <div className="flex-1">
          <p className="font-semibold text-gray-900">{game.name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
           <CalendarIcon size={12} />
           <span>{game.date}</span>
           <span aria-hidden="true">?</span>
           <Users size={12} />
           <span>{game.slots}</span>
          </div>
         </div>
         <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">{game.vagas}</span>
        </div>
       </div>
      ))}
     </div>
     <button onClick={() => navigate("/my-games")} className="w-full py-2 text-[#12d875] font-medium hover:bg-gray-50 rounded-md transition-colors">
      Ver todos os jogos 
     </button>
    </div>

    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6 mb-6">
     <h2 className="font-semibold text-gray-900 mb-4">Estatísticas Detalhadas</h2>
     <div className="grid grid-cols-2 gap-4">
      {[
       ['35', 'Partidas jogadas'],
       ['68%', 'Taxa de Vitória'],
       ['24', 'Conversas ativas'],
      ].map(([val, label]) => (
       <div key={label} className="bg-gray-50 p-4 rounded-md">
        <div className="text-2xl font-bold text-gray-900 mb-1">{val}</div>
        <div className="text-sm text-gray-600">{label}</div>
       </div>
      ))}
      <div className="bg-gray-50 p-4 rounded-md">
       <div className="flex items-center gap-1 mb-1">
        <Award size={20} className="text-[#12d875]" />
        <div className="text-2xl font-bold text-gray-900">12</div>
       </div>
       <div className="text-sm text-gray-600">Torneios</div>
      </div>
     </div>
    </div>

    {/* Gamification + Awards shortcuts */}
    <div className="grid grid-cols-2 gap-3 mb-6">
     <button
      onClick={() => navigate("/gamification")}
      className="bg-gradient-to-br from-white to-[#e8f8ef] border border-[#12d875]/20 text-gray-900 rounded-md p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
     >
      <Zap size={28} className="text-[#12d875]" />
      <span className="font-semibold text-sm">Liga & XP</span>
      <span className="text-xs text-gray-600">7 dias de sequência</span>
     </button>
     <button
      onClick={() => navigate("/awards")}
      className="bg-gradient-to-br from-[#e8f8ef] to-white border border-[#12d875]/20 text-gray-900 rounded-md p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
     >
      <Award size={28} className="text-[#12d875]" />
      <span className="font-semibold text-sm">Meu Ano 2025</span>
      <span className="text-xs text-gray-600">Ver retrospectiva</span>
     </button>
    </div>

    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6">
     <h2 className="font-semibold text-gray-900 mb-4">Últimas Avaliações</h2>
     <div className="space-y-4">
      {[
       { name: 'Marina Costa', time: 'há 2 dias', rating: '5.0', comment: 'Excelente parceiro! Jogo limpo e muito técnico.' },
       { name: 'Carlos Silva', time: 'há 1 semana', rating: '4.5', comment: 'Ótimo nível técnico, parceiro pontual e comprometido.' },
      ].map((review) => (
       <div key={review.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
           <User size={22} className="text-white" />
          </div>
          <div>
           <p className="font-medium text-gray-900">{review.name}</p>
           <p className="text-xs text-gray-500">{review.time}</p>
          </div>
         </div>
         <div className="flex items-center bg-[#12d875]/10 px-2 py-1 rounded-full">
          <Star size={14} className="text-[#12d875] mr-1" />
          <span className="text-sm font-semibold text-gray-900">{review.rating}</span>
         </div>
        </div>
        <p className="text-sm text-gray-600">{review.comment}</p>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}

export default function Profile() {
 const { userType } = useUserType();
 return userType === 'arena' ? <ArenaProfile /> : <PlayerProfile />;
}
