import { useNavigate } from 'react-router';
import { MessageCircle, Star, Users, Calendar, User } from 'lucide-react';

interface SportLevel {
 name: string;
 level: string;
}

interface Match {
 id: number;
 name: string;
 sports: SportLevel[];
 rating?: number;
 lastMessage?: string;
 unread?: number;
 type: 'individual' | 'group' | 'game';
 members?: number;
 representativeName?: string;
 date?: string;
 time?: string;
 location?: string;
 playersNeeded?: number;
 currentPlayers?: number;
 creatorName?: string;
 creatorType?: 'player' | 'arena';
}

const mockMatches: Match[] = [
 {
  id: 1,
  name: 'Marina Costa',
  sports: [
   { name: 'Vôlei', level: 'Avançado' },
   { name: 'Corrida', level: 'Intermediário' }
  ],
  rating: 4.8,
  lastMessage: 'Boa! Que tal sexta às 19h?',
  unread: 2,
  type: 'individual'
 },
 {
  id: 2,
  name: 'Time da Quarta',
  sports: [{ name: 'Futebol', level: 'Intermediário' }],
  members: 18,
  representativeName: 'Carlos Mendes',
  lastMessage: 'Fala! A gente joga toda quarta às 20h',
  unread: 1,
  type: 'group'
 },
 {
  id: 6,
  name: 'Racha de Futebol - Arena SP',
  sports: [{ name: 'Futebol', level: 'Intermediário' }],
  date: '18/05/2026',
  time: '19:00',
  location: 'Arena SP - Pinheiros',
  playersNeeded: 10,
  currentPlayers: 6,
  creatorName: 'Ricardo Silva',
  creatorType: 'player',
  lastMessage: 'Faltam 4 jogadores, bora confirmar!',
  unread: 1,
  type: 'game'
 },
 {
  id: 3,
  name: 'Pedro Santos',
  sports: [
   { name: 'Futebol', level: 'Intermediário' },
   { name: 'Corrida', level: 'Iniciante' }
  ],
  rating: 4.3,
  lastMessage: 'Show, vamos marcar!',
  type: 'individual'
 },
 {
  id: 7,
  name: 'Basquete 3x3 - Sports Center',
  sports: [{ name: 'Basquete', level: 'Avançado' }],
  date: '17/05/2026',
  time: '15:00',
  location: 'Sports Center Arena',
  playersNeeded: 6,
  currentPlayers: 4,
  creatorName: 'Sports Center Arena',
  creatorType: 'arena',
  lastMessage: 'Últimas vagas! Horário confirmado.',
  type: 'game'
 },
 {
  id: 4,
  name: 'Grupo Vôlei de Praia',
  sports: [{ name: 'Vôlei', level: 'Avançado' }],
  members: 24,
  representativeName: 'Ana Paula',
  lastMessage: 'Domingo tem jogo, bora?',
  type: 'group'
 },
 {
  id: 5,
  name: 'Julia Mendes',
  sports: [
   { name: 'Tênis', level: 'Avançado' },
   { name: 'Padel', level: 'Intermediário' }
  ],
  rating: 4.7,
  unread: 1,
  type: 'individual'
 }
];

export default function Matches() {
 const navigate = useNavigate();

 return (
  <div className="min-h-screen p-6 bg-gray-50 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl font-bold text-gray-900">Conversas</h1>
     <div className="w-10 h-10 bg-[#12d875] text-white rounded-full flex items-center justify-center font-semibold">
      {mockMatches.filter(m => m.unread).reduce((acc, m) => acc + (m.unread || 0), 0)}
     </div>
    </div>

    <div className="space-y-3">
     {mockMatches.map(match => (
      <div
       key={match.id}
       onClick={() => navigate(`/chat/${match.id}`)}
       className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] hover:shadow-md transition-shadow cursor-pointer"
      >
       <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center flex-shrink-0">
         {match.type === 'group' ? (
          <Users size={28} className="text-white" />
         ) : match.type === 'game' ? (
          <Calendar size={28} className="text-white" />
         ) : (
          <User size={30} className="text-white" />
         )}
        </div>

        <div className="flex-1 min-w-0">
         <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
           <h3 className="font-semibold text-gray-900">{match.name}</h3>
           {match.type === 'group' && (
            <span className="px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">
             Grupo
            </span>
           )}
           {match.type === 'game' && (
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
             Jogo
            </span>
           )}
          </div>
          {match.type === 'individual' && match.rating && (
           <div className="flex items-center bg-[#12d875]/10 px-2 py-1 rounded-full">
            <Star size={14} className="text-[#12d875] mr-1" />
            <span className="text-sm font-semibold text-gray-900">{match.rating}</span>
           </div>
          )}
         </div>

         {match.type === 'group' && match.representativeName && (
          <p className="text-xs text-gray-500 mb-1">
           Representante: {match.representativeName}
          </p>
         )}

         {match.type === 'game' && (
          <div className="mb-1">
           <p className="text-xs text-gray-500">
            {match.creatorType === 'arena' ? 'Arena' : 'Organizador'}: {match.creatorName}
           </p>
           <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <div className="flex items-center">
             <Calendar size={12} className="mr-1" />
             {match.date} {match.time}
            </div>
            <div className="flex items-center">
             <Users size={12} className="mr-1" />
             {match.currentPlayers}/{match.playersNeeded}
            </div>
           </div>
          </div>
         )}

         <div className="flex items-center gap-2 mb-2">
          {match.sports.map(sport => (
           <span
            key={sport.name}
            className="px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium"
           >
            {sport.name} · {sport.level}
           </span>
          ))}
          {match.type === 'group' && match.members && (
           <div className="flex items-center text-xs text-gray-600">
            <Users size={12} className="mr-1" />
            {match.members} membros
           </div>
          )}
         </div>

         {match.lastMessage && (
          <div className="flex items-center justify-between">
           <p className="text-sm text-gray-600 truncate">{match.lastMessage}</p>
           {match.unread && (
            <span className="ml-2 w-6 h-6 bg-[#12d875] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
             {match.unread}
            </span>
           )}
          </div>
         )}
        </div>

        <MessageCircle className="text-gray-400 flex-shrink-0" size={20} />
       </div>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
