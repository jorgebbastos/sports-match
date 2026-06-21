import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X, ThumbsUp, MapPin, Trophy, Star, Info, Bell, Filter, Users, Calendar, User } from 'lucide-react';

type TabType = 'parceiros' | 'grupos' | 'jogos';

interface SportLevel {
 name: string;
 level: string;
}

interface Player {
 id: number;
 name: string;
 age: number;
 location: string;
 sports: SportLevel[];
 rating: number;
 matches: number;
 bio: string;
}

interface Group {
 id: number;
 name: string;
 sport: string;
 location: string;
 members: number;
 level: string;
 description: string;
}

interface Game {
 id: number;
 sport: string;
 location: string;
 date: string;
 time: string;
 playersNeeded: number;
 currentPlayers: number;
 level: string;
 description: string;
}

const mockPlayers: Player[] = [
 {
  id: 1,
  name: 'Carlos Silva',
  age: 28,
  location: 'São Paulo, SP',
  sports: [
   { name: 'Tênis', level: 'Intermediário' },
   { name: 'Padel', level: 'Avançado' }
  ],
  rating: 4.5,
  matches: 42,
  bio: 'Jogo tênis há 5 anos, procurando parceiros para melhorar meu jogo!'
 },
 {
  id: 2,
  name: 'Marina Costa',
  age: 25,
  location: 'São Paulo, SP',
  sports: [
   { name: 'Vôlei', level: 'Avançado' },
   { name: 'Corrida', level: 'Intermediário' }
  ],
  rating: 4.8,
  matches: 78,
  bio: 'Atleta de vôlei, adoro competições e treinos intensos.'
 },
 {
  id: 3,
  name: 'Pedro Santos',
  age: 32,
  location: 'São Paulo, SP',
  sports: [
   { name: 'Futebol', level: 'Intermediário' },
   { name: 'Corrida', level: 'Iniciante' }
  ],
  rating: 4.3,
  matches: 35,
  bio: 'Jogo futebol todo fim de semana, bora marcar um racha!'
 }
];

const mockGroups: Group[] = [
 {
  id: 1,
  name: 'Grupo de Tênis SP',
  sport: 'Tênis',
  location: 'São Paulo, SP',
  members: 24,
  level: 'Intermediário',
  description: 'Grupo de tênis para jogar aos finais de semana. Todos níveis são bem-vindos!'
 },
 {
  id: 2,
  name: 'Vôlei de Praia',
  sport: 'Vôlei',
  location: 'Santos, SP',
  members: 18,
  level: 'Avançado',
  description: 'Treinos e jogos de vôlei de praia. Grupo competitivo com treinos 3x por semana.'
 },
 {
  id: 3,
  name: 'Pelada da Galera',
  sport: 'Futebol',
  location: 'São Paulo, SP',
  members: 35,
  level: 'Todos',
  description: 'Racha todo sábado de manhã. Clima descontraído, só vem!'
 }
];

const mockGames: Game[] = [
 {
  id: 1,
  sport: 'Futebol',
  location: 'Arena SP - Pinheiros',
  date: '2026-05-18',
  time: '19:00',
  playersNeeded: 10,
  currentPlayers: 6,
  level: 'Intermediário',
  description: 'Racha amistoso, precisa de mais 4 jogadores!'
 },
 {
  id: 2,
  sport: 'Basquete',
  location: 'Quadra SESC Vila Mariana',
  date: '2026-05-17',
  time: '15:00',
  playersNeeded: 8,
  currentPlayers: 5,
  level: 'Avançado',
  description: 'Jogo competitivo de basquete 4x4'
 },
 {
  id: 3,
  sport: 'Vôlei',
  location: 'Clube Paineiras',
  date: '2026-05-19',
  time: '18:30',
  playersNeeded: 12,
  currentPlayers: 8,
  level: 'Todos',
  description: 'Vôlei recreativo, todos os níveis!'
 }
];

export default function SwipeScreen() {
 const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState<TabType>('parceiros');
 const [players, setPlayers] = useState(mockPlayers);
 const [groups, setGroups] = useState(mockGroups);
 const [games, setGames] = useState(mockGames);
 const [currentIndex, setCurrentIndex] = useState(0);

 const filterSummary: Record<TabType, string> = {
  parceiros: 'Filtros: Tênis | São Paulo | Intermediário',
  grupos: 'Filtros: São Paulo | Todos os níveis',
  jogos: 'Filtros: Esta semana | Vagas abertas'
 };

 const handleSwipe = (liked: boolean) => {
  if (liked) {
   if (activeTab === 'parceiros') {
    console.log('Match!', players[currentIndex].name);
   } else if (activeTab === 'grupos') {
    console.log('Entrou no grupo!', groups[currentIndex].name);
   } else {
    console.log('Confirmado no jogo!', games[currentIndex].sport);
   }
  }
  setCurrentIndex(prev => prev + 1);
 };

 const currentPlayer = players[currentIndex];
 const currentGroup = groups[currentIndex];
 const currentGame = games[currentIndex];

 const getCurrentList = () => {
  if (activeTab === 'parceiros') return players;
  if (activeTab === 'grupos') return groups;
  return games;
 };

 const getEmptyMessage = () => {
  if (activeTab === 'parceiros') return 'Não há mais jogadores por enquanto';
  if (activeTab === 'grupos') return 'Não há mais grupos por enquanto';
  return 'Não há mais jogos por enquanto';
 };

 if (currentIndex >= getCurrentList().length) {
  return (
   <div className="min-h-screen flex items-center justify-center p-6">
    <div className="text-center">
     <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
      <ThumbsUp className="text-gray-400" size={40} />
     </div>
     <h2 className="text-2xl font-bold text-gray-900 mb-2">
      {getEmptyMessage()}
     </h2>
     <p className="text-gray-600">Volte mais tarde para ver novos {activeTab}!</p>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen p-6 bg-gray-50 pb-24">
   <div className="max-w-md mx-auto">
    <div className="flex items-center justify-between mb-4">
     <div>
      <h1 className="text-2xl font-bold text-gray-900">Explorar</h1>
     </div>
     <button
      onClick={() => navigate('/notifications')}
      className="relative p-2 hover:bg-white rounded-full transition-colors"
      aria-label="Notificações"
     >
      <Bell size={24} />
      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
     </button>
    </div>

    <div className="flex items-center justify-center gap-1 mb-4">
     <button
      onClick={() => {
       setActiveTab('parceiros');
       setCurrentIndex(0);
      }}
      className={`flex-1 py-3 px-4 font-semibold transition-colors ${
       activeTab === 'parceiros'
        ? 'text-[#12d875] border-b-2 border-[#12d875]'
        : 'text-gray-500'
      }`}
     >
      Parceiros
     </button>
     <button
      onClick={() => {
       setActiveTab('grupos');
       setCurrentIndex(0);
      }}
      className={`flex-1 py-3 px-4 font-semibold transition-colors ${
       activeTab === 'grupos'
        ? 'text-[#12d875] border-b-2 border-[#12d875]'
        : 'text-gray-500'
      }`}
     >
      Grupos
     </button>
     <button
      onClick={() => {
       setActiveTab('jogos');
       setCurrentIndex(0);
      }}
      className={`flex-1 py-3 px-4 font-semibold transition-colors ${
       activeTab === 'jogos'
        ? 'text-[#12d875] border-b-2 border-[#12d875]'
        : 'text-gray-500'
      }`}
     >
      Jogos
     </button>
    </div>

    <div className="flex items-center gap-3 mb-4">
     <p className="flex-1 min-w-0 truncate text-sm text-gray-600">
      {filterSummary[activeTab]}
     </p>
     <button className="relative flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors shadow-[0_1px_0_rgba(11,18,32,0.08)]">
      <Filter size={20} />
      <span className="text-sm font-medium text-gray-900">Filtros</span>
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#12d875] text-white rounded-full flex items-center justify-center text-xs font-semibold">
       2
      </span>
     </button>
    </div>

    <div
     onClick={() => navigate('/rankings')}
     className="bg-gradient-to-r from-[#12d875] to-[#12d875] rounded-md p-4 mb-6 cursor-pointer hover:shadow-md transition-shadow"
    >
     <div className="flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
       <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <Trophy size={24} />
       </div>
       <div>
        <p className="text-xs text-white/80">Sua Posição em Tênis</p>
        <p className="text-2xl font-bold">#3</p>
       </div>
      </div>
      <div className="text-right">
       <div className="flex items-center gap-1 text-white/90 mb-1">
        <Star size={16} />
        <span className="text-sm font-medium">4.5</span>
       </div>
       <p className="text-xs text-white/80">980 pontos</p>
      </div>
     </div>
     <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-white/90 text-sm">
      <span>Ver Rankings Completos</span>
      <Trophy size={16} />
     </div>
    </div>

    <AnimatePresence mode="wait">
     {activeTab === 'parceiros' && currentPlayer && (
      <motion.div
       key={`player-${currentPlayer.id}`}
       initial={{ scale: 0.8, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       exit={{ scale: 0.8, opacity: 0 }}
       className="bg-white rounded-md shadow-md overflow-hidden"
      >
       <div className="relative h-64 bg-gradient-to-br from-[#12d875] to-[#12d875] flex items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
         <User size={72} className="text-[#12d875]" />
        </div>
        <button
         onClick={() => navigate(`/user/${currentPlayer.id}`)}
         className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
         <Info size={20} className="text-gray-700" />
        </button>
       </div>

       <div className="p-6">
        <div className="flex items-start justify-between mb-4">
         <div>
          <h2 className="text-2xl font-bold text-gray-900">
           {currentPlayer.name}, {currentPlayer.age}
          </h2>
          <div className="flex items-center text-gray-600 mt-1">
           <MapPin size={16} className="mr-1" />
           <span className="text-sm">{currentPlayer.location}</span>
          </div>
         </div>
         <div className="flex items-center bg-[#12d875]/10 px-3 py-1 rounded-full">
          <Star size={16} className="text-[#12d875] mr-1" />
          <span className="font-semibold text-gray-900">{currentPlayer.rating}</span>
         </div>
        </div>

        <div className="mb-4">
         <div className="flex flex-wrap gap-2 mb-3">
          {currentPlayer.sports.map(sport => (
           <span
            key={sport.name}
            className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-sm font-medium"
           >
            {sport.name} · {sport.level}
           </span>
          ))}
         </div>
         <div className="flex items-center gap-4 text-sm text-gray-600">
          <div>
           {currentPlayer.matches} partidas
          </div>
         </div>
        </div>

        <p className="text-gray-700 mb-6">{currentPlayer.bio}</p>

        <div className="flex gap-8 justify-center items-center">
         <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 bg-white border-4 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center shadow-md"
         >
          <X size={32} strokeWidth={3} />
         </button>
         <button
          onClick={() => handleSwipe(true)}
          className="w-16 h-16 bg-white border-4 border-[#12d875] text-[#12d875] rounded-full hover:bg-green-50 transition-colors flex items-center justify-center shadow-md"
         >
          <ThumbsUp size={28} strokeWidth={3} fill="currentColor" />
         </button>
        </div>
       </div>
      </motion.div>
     )}

     {activeTab === 'grupos' && currentGroup && (
      <motion.div
       key={`group-${currentGroup.id}`}
       initial={{ scale: 0.8, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       exit={{ scale: 0.8, opacity: 0 }}
       className="bg-white rounded-md shadow-md overflow-hidden"
      >
       <div className="relative h-64 bg-gradient-to-br from-[#12d875] to-[#12d875] flex items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
         <Users size={64} className="text-[#12d875]" />
        </div>
       </div>

       <div className="p-6">
        <div className="flex items-start justify-between mb-4">
         <div>
          <h2 className="text-2xl font-bold text-gray-900">
           {currentGroup.name}
          </h2>
          <div className="flex items-center text-gray-600 mt-1">
           <MapPin size={16} className="mr-1" />
           <span className="text-sm">{currentGroup.location}</span>
          </div>
         </div>
        </div>

        <div className="mb-4">
         <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-sm font-medium">
           {currentGroup.sport} · {currentGroup.level}
          </span>
         </div>
         <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
           <Users size={16} className="mr-1" />
           {currentGroup.members} membros
          </div>
         </div>
        </div>

        <p className="text-gray-700 mb-6">{currentGroup.description}</p>

        <div className="flex gap-8 justify-center items-center">
         <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 bg-white border-4 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center shadow-md"
         >
          <X size={32} strokeWidth={3} />
         </button>
         <button
          onClick={() => handleSwipe(true)}
          className="w-16 h-16 bg-white border-4 border-[#12d875] text-[#12d875] rounded-full hover:bg-green-50 transition-colors flex items-center justify-center shadow-md"
         >
          <ThumbsUp size={28} strokeWidth={3} fill="currentColor" />
         </button>
        </div>
       </div>
      </motion.div>
     )}

     {activeTab === 'jogos' && currentGame && (
      <motion.div
       key={`game-${currentGame.id}`}
       initial={{ scale: 0.8, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       exit={{ scale: 0.8, opacity: 0 }}
       className="bg-white rounded-md shadow-md overflow-hidden"
      >
       <div className="relative h-64 bg-gradient-to-br from-[#12d875] to-[#12d875] flex items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
         <Calendar size={64} className="text-[#12d875]" />
        </div>
       </div>

       <div className="p-6">
        <div className="flex items-start justify-between mb-4">
         <div>
          <h2 className="text-2xl font-bold text-gray-900">
           {currentGame.sport}
          </h2>
          <div className="flex items-center text-gray-600 mt-1">
           <MapPin size={16} className="mr-1" />
           <span className="text-sm">{currentGame.location}</span>
          </div>
         </div>
        </div>

        <div className="mb-4">
         <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-sm font-medium">
           {new Date(currentGame.date).toLocaleDateString('pt-BR')}
          </span>
          <span className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-sm font-medium">
           {currentGame.time}
          </span>
         </div>
         <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
           <Trophy size={16} className="mr-1" />
           {currentGame.level}
          </div>
          <div className="flex items-center">
           <Users size={16} className="mr-1" />
           {currentGame.currentPlayers}/{currentGame.playersNeeded} jogadores
          </div>
         </div>
        </div>

        <p className="text-gray-700 mb-6">{currentGame.description}</p>

        <div className="flex gap-8 justify-center items-center">
         <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 bg-white border-4 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center shadow-md"
         >
          <X size={32} strokeWidth={3} />
         </button>
         <button
          onClick={() => handleSwipe(true)}
          className="w-16 h-16 bg-white border-4 border-[#12d875] text-[#12d875] rounded-full hover:bg-green-50 transition-colors flex items-center justify-center shadow-md"
         >
          <ThumbsUp size={28} strokeWidth={3} fill="currentColor" />
         </button>
        </div>
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </div>
 );
}
