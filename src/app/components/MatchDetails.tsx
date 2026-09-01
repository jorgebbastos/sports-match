import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Trophy, Star, User as UserIcon } from 'lucide-react';

export default function MatchDetails() {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const matchId = searchParams.get('matchId');
 const type = searchParams.get('type');

 // Simulando dados da partida
 const matchData = {
  competitive: {
   sport: 'Futebol',
   opponent: 'Pedro Santos',
   date: '08/05/2026',
   time: '16:00',
   location: 'Campo do Morumbi',
   mode: 'competitive',
   result: '3 x 2',
   winner: 'user',
   sets: [
    { player: 3, opponent: 2 }
   ],
   stats: {
    duration: '90 min',
    pointsEarned: '+25'
   }
  },
  casual: {
   sport: 'Tênis',
   opponent: 'Carlos Silva',
   date: '10/05/2026',
   time: '18:00',
   location: 'Club Paineiras',
   mode: 'casual'
  }
 };

 const match = type === 'competitive' ? matchData.competitive : matchData.casual;
 const isCompetitive = match.mode === 'competitive';

 return (
  <div className="min-h-screen bg-gray-50">
   <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
    <div className="flex items-center gap-3">
     <button onClick={() => navigate('/agenda')} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <h1 className="text-xl font-bold text-gray-900">Detalhes da Partida</h1>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 pb-24">
    {isCompetitive && (
     <div className="bg-gradient-to-r from-[#12d875] to-[#12d875] rounded-md p-6 text-white mb-6">
      <div className="flex items-center justify-center mb-4">
       <Trophy size={40} />
      </div>
      <h2 className="text-center text-2xl font-bold mb-2">
       {match.winner === 'user' ? 'Vitória!' : 'Derrota'}
      </h2>
      <div className="text-center text-4xl font-bold mb-4">
       {match.result}
      </div>
      <div className="flex justify-center gap-8 text-sm">
       <div className="text-center">
        <p className="text-white/80 mb-1">Duração</p>
        <p className="font-semibold">{match.stats.duration}</p>
       </div>
       <div className="text-center">
        <p className="text-white/80 mb-1">Pontos</p>
        <p className="font-semibold">{match.stats.pointsEarned}</p>
       </div>
      </div>
     </div>
    )}

    <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6 mb-6">
     <h3 className="font-semibold text-gray-900 mb-4">Informações da Partida</h3>

     <div className="space-y-4">
      <div>
       <p className="text-sm text-gray-600 mb-1">Esporte</p>
       <p className="font-semibold text-gray-900 text-lg">{match.sport}</p>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
       <div className="w-12 h-12 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
        <span className="text-xl"></span>
       </div>
       <div>
        <p className="text-sm text-gray-600">Adversário</p>
        <p className="font-semibold text-gray-900">{match.opponent}</p>
       </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
       <div className="flex items-center gap-2 text-gray-700 mb-2">
        <Calendar size={18} className="text-gray-500" />
        <span>{match.date} às {match.time}</span>
       </div>
       <div className="flex items-center gap-2 text-gray-700">
        <MapPin size={18} className="text-gray-500" />
        <span>{match.location}</span>
       </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
       <p className="text-sm text-gray-600 mb-2">Modo</p>
       <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        isCompetitive
         ? 'bg-[#12d875]/10 text-[#12d875]'
         : 'bg-gray-100 text-gray-700'
       }`}>
        {isCompetitive ? 'Competitivo' : 'Casual'}
       </span>
      </div>
     </div>
    </div>

    {!isCompetitive && (
     <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
      <p className="text-sm text-green-800">
       <strong>Partida casual:</strong> Esta foi uma partida descontraida entre os jogadores.
      </p>
     </div>
    )}

    {isCompetitive && (
     <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Placar Detalhado</h3>
      <div className="space-y-3">
       {match.sets.map((set, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
         <div className="text-center flex-1">
          <p className="text-xs text-gray-600 mb-1">Você</p>
          <p className="text-2xl font-bold text-gray-900">{set.player}</p>
         </div>
         <div className="text-2xl text-gray-400 mx-4">:</div>
         <div className="text-center flex-1">
          <p className="text-xs text-gray-600 mb-1">{match.opponent}</p>
          <p className="text-2xl font-bold text-gray-900">{set.opponent}</p>
         </div>
        </div>
       ))}
      </div>
     </div>
    )}

    <button
     onClick={() => navigate('/agenda')}
     className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
    >
     Voltar para Agenda
    </button>
   </div>
  </div>
 );
}
