import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Trophy, Calendar, MapPin, Star } from 'lucide-react';

interface HistoryMatch {
 id: number;
 sport: string;
 date: string;
 time: string;
 location: string;
 mode: 'casual' | 'competitive';
 result?: string;
 winner?: 'user' | 'opponent';
}

export default function PlayerHistory() {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const matchId = searchParams.get('matchId');
 const playerName = searchParams.get('playerName') || 'Marina Costa';

 // Histórico de partidas com este jogador
 const matchHistory: HistoryMatch[] = [
  {
   id: 1,
   sport: 'Vôlei',
   date: '15/05/2026',
   time: '19:00',
   location: 'Quadra Central',
   mode: 'competitive',
   result: '3 x 2',
   winner: 'user'
  },
  {
   id: 2,
   sport: 'Vôlei',
   date: '08/05/2026',
   time: '18:00',
   location: 'Quadra do Ibirapuera',
   mode: 'competitive',
   result: '2 x 3',
   winner: 'opponent'
  },
  {
   id: 3,
   sport: 'Corrida',
   date: '01/05/2026',
   time: '07:00',
   location: 'Parque Ibirapuera',
   mode: 'casual'
  },
  {
   id: 4,
   sport: 'Vôlei',
   date: '25/04/2026',
   time: '19:00',
   location: 'Quadra Central',
   mode: 'competitive',
   result: '3 x 1',
   winner: 'user'
  }
 ];

 const competitiveMatches = matchHistory.filter(m => m.mode === 'competitive' && m.result);
 const wins = competitiveMatches.filter(m => m.winner === 'user').length;
 const losses = competitiveMatches.filter(m => m.winner === 'opponent').length;
 const winRate = competitiveMatches.length > 0
  ? Math.round((wins / competitiveMatches.length) * 100)
  : 0;

 return (
  <div className="min-h-screen bg-gray-50">
   <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
    <div className="flex items-center gap-3">
     <button onClick={() => navigate(`/chat/${matchId}`)} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <div>
      <h1 className="text-xl font-bold text-gray-900">Histórico com {playerName}</h1>
      <p className="text-sm text-gray-600">{matchHistory.length} partidas juntos</p>
     </div>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 pb-24">
    {/* Estatísticas Gerais */}
    <div className="bg-gradient-to-r from-[#12d875] to-[#12d875] rounded-md p-5 mb-6 text-white">
     <h3 className="font-semibold mb-4">Estatísticas Competitivas</h3>
     <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
       <div className="text-3xl font-bold mb-1">{wins}</div>
       <div className="text-xs text-white/80">Vitórias</div>
      </div>
      <div className="text-center">
       <div className="text-3xl font-bold mb-1">{losses}</div>
       <div className="text-xs text-white/80">Derrotas</div>
      </div>
      <div className="text-center">
       <div className="text-3xl font-bold mb-1">{winRate}%</div>
       <div className="text-xs text-white/80">Taxa de Vitória</div>
      </div>
     </div>
    </div>

    {/* Lista de Partidas */}
    <div className="mb-4">
     <h3 className="font-semibold text-gray-900 mb-3">Todas as Partidas</h3>
    </div>

    <div className="space-y-3">
     {matchHistory.map(match => (
      <div
       key={match.id}
       onClick={() => navigate(`/match-details?matchId=${match.id}&type=${match.mode}`)}
       className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] hover:shadow-md transition-shadow cursor-pointer"
      >
       <div className="flex items-start justify-between mb-3">
        <div>
         <h4 className="font-semibold text-gray-900">{match.sport}</h4>
         <div className="flex items-center gap-2 mt-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">{match.date}</span>
         </div>
        </div>

        {match.mode === 'competitive' && match.result && (
         <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          match.winner === 'user'
           ? 'bg-green-50 text-green-700'
           : 'bg-red-50 text-red-700'
         }`}>
          {match.result} - {match.winner === 'user' ? 'Vitória' : 'Derrota'}
         </div>
        )}

        {match.mode === 'casual' && (
         <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
          Casual
         </div>
        )}
       </div>

       <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={14} />
        <span>{match.location}</span>
       </div>
      </div>
     ))}
    </div>

    {matchHistory.length === 0 && (
     <div className="bg-white rounded-md p-8 text-center">
      <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
       Nenhuma partida ainda
      </h3>
      <p className="text-gray-600 mb-4">
       Marque uma partida com {playerName} para começar seu histórico!
      </p>
      <button
       onClick={() => navigate(`/create-match?matchId=${matchId}`)}
       className="bg-[#12d875] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#10c26a] transition-colors"
      >
       Marcar Partida
      </button>
     </div>
    )}
   </div>
  </div>
 );
}
