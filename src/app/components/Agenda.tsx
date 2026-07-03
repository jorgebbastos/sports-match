import { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

interface MatchEvent {
 id: number;
 sport: string;
 opponent: string;
 date: string;
 time: string;
 location: string;
 mode: 'casual' | 'competitive';
 status: 'upcoming' | 'completed';
 result?: string;
 needsResult?: boolean;
}

const mockMatches: MatchEvent[] = [
 {
  id: 1,
  sport: 'Vôlei',
  opponent: 'Marina Costa',
  date: '2026-05-15',
  time: '19:00',
  location: 'Quadra Central',
  mode: 'competitive',
  status: 'upcoming'
 },
 {
  id: 2,
  sport: 'Tênis',
  opponent: 'Carlos Silva',
  date: '2026-05-12',
  time: '18:00',
  location: 'Club Paineiras',
  mode: 'casual',
  status: 'upcoming'
 },
 {
  id: 3,
  sport: 'Futebol',
  opponent: 'Pedro Santos',
  date: '2026-05-08',
  time: '16:00',
  location: 'Campo do Morumbi',
  mode: 'competitive',
  status: 'completed',
  result: '3 x 2 Vitória'
 },
 {
  id: 4,
  sport: 'Basquete',
  opponent: 'Carlos Silva',
  date: '2026-05-10',
  time: '18:00',
  location: 'Club Paineiras',
  mode: 'casual',
  status: 'completed'
 },
 {
  id: 5,
  sport: 'Tênis',
  opponent: 'Lucas Oliveira',
  date: '2026-05-09',
  time: '20:00',
  location: 'Quadra do Ibirapuera',
  mode: 'competitive',
  status: 'completed',
  needsResult: true
 }
];

export default function Agenda() {
 const navigate = useNavigate();
 const upcoming = mockMatches.filter(m => m.status === 'upcoming');
 const completed = mockMatches.filter(m => m.status === 'completed');
 const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

 return (
  <div className="min-h-screen p-6 bg-gray-50 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
     <button
      onClick={() => navigate('/create-match')}
      className="w-12 h-12 bg-[#12d875] text-white rounded-full flex items-center justify-center hover:bg-[#10c26a] transition-colors shadow-md"
     >
      <Plus size={24} />
     </button>
    </div>

    <div className="flex gap-2 mb-6">
     <button
      onClick={() => setActiveTab('upcoming')}
      className={`flex-1 py-3 rounded-md font-medium transition-colors ${
       activeTab === 'upcoming'
        ? 'bg-white text-gray-900 shadow-[0_1px_0_rgba(11,18,32,0.08)]'
        : 'bg-transparent text-gray-600'
      }`}
     >
      Próximas ({upcoming.length})
     </button>
     <button
      onClick={() => setActiveTab('history')}
      className={`flex-1 py-3 rounded-md font-medium transition-colors ${
       activeTab === 'history'
        ? 'bg-white text-gray-900 shadow-[0_1px_0_rgba(11,18,32,0.08)]'
        : 'bg-transparent text-gray-600'
      }`}
     >
      Histórico ({completed.length})
     </button>
    </div>

    {activeTab === 'upcoming' && (
     <div className="space-y-3">
      {upcoming.map(match => (
       <div key={match.id} className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)]">
        <div className="flex items-start justify-between mb-3">
         <div>
          <h3 className="font-semibold text-gray-900 text-lg">{match.sport}</h3>
          <p className="text-gray-600">vs {match.opponent}</p>
         </div>
         {match.mode === 'competitive' && (
          <div className="bg-[#12d875]/10 text-[#12d875] px-3 py-1 rounded-full flex items-center gap-1">
           <Trophy size={14} />
           <span className="text-xs font-medium">Competitivo</span>
          </div>
         )}
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
         <div className="flex items-center gap-2">
          <Calendar size={16} />
          {new Date(match.date).toLocaleDateString('pt-BR', {
           day: 'numeric',
           month: 'long',
           year: 'numeric'
          })}
         </div>
         <div className="flex items-center gap-2">
          <Clock size={16} />
          {match.time}
         </div>
         <div className="flex items-center gap-2">
          <MapPin size={16} />
          {match.location}
         </div>
        </div>

        <div className="flex gap-2">
         <button
          onClick={() => navigate(`/cancel-match?matchId=${match.id}`)}
          className="flex-1 bg-red-50 text-red-600 py-2 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
         >
          Cancelar
         </button>
         <button
          onClick={() => navigate(`/reschedule-match?matchId=${match.id}`)}
          className="flex-1 bg-[#12d875]/10 text-[#0b1220] py-2 rounded-md text-sm font-medium hover:bg-yellow-100 transition-colors"
         >
          Remarcar
         </button>
        </div>
       </div>
      ))}
     </div>
    )}

    {activeTab === 'history' && (
     <div className="space-y-3">
      {completed.map(match => (
       <div
        key={match.id}
        onClick={() => {
         if (match.needsResult) {
          navigate(`/match-result/${match.id}`);
         } else {
          navigate(`/match-details?matchId=${match.id}&type=${match.mode}`);
         }
        }}
        className={`bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] cursor-pointer hover:shadow-md transition-shadow ${
         match.needsResult ? 'border-2 border-yellow-400' : ''
        }`}
       >
        <div className="flex items-start justify-between mb-3">
         <div>
          <h3 className="font-semibold text-gray-900">{match.sport}</h3>
          <p className="text-gray-600">vs {match.opponent}</p>
         </div>
         {match.result && (
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
           {match.result}
          </div>
         )}
         {match.needsResult && (
          <div className="bg-[#12d875]/10 text-[#0b1220] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            Resultado pendente
          </div>
         )}
         {!match.result && !match.needsResult && match.mode === 'casual' && (
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
           Casual
          </div>
         )}
        </div>

        <div className="text-sm text-gray-600 mb-3">
         {new Date(match.date).toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long'
         })} às {match.time}
        </div>

        {match.needsResult && (
         <div className="bg-[#12d875]/10 border border-[#12d875]/20 rounded-md p-3 flex items-center gap-2">
          <span className="text-sm text-yellow-800 font-medium">
           Clique para registrar o resultado desta partida
          </span>
         </div>
        )}
       </div>
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
