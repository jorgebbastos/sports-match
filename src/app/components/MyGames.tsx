import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Edit, Trash2, Users, Clock } from 'lucide-react';
import { useUserType } from '../App';

interface Game {
 id: number;
 sport: string;
 date: string;
 time: string;
 location: string;
 locationName: string;
 level: string;
 playersNeeded: number;
 currentPlayers: number;
 confirmedPlayers: string[];
 description: string;
 creatorType: 'player' | 'arena';
 price?: number;
}

const mockGames: Game[] = [
 {
  id: 1,
  sport: 'Futebol',
  date: '18/05/2026',
  time: '19:00',
  location: 'São Paulo, SP',
  locationName: 'Arena SP - Pinheiros',
  level: 'Intermediário',
  playersNeeded: 10,
  currentPlayers: 6,
  confirmedPlayers: ['Ricardo Silva', 'João Pedro', 'Carlos', 'Ana', 'Paula', 'Fernando'],
  description: 'Racha amistoso, precisa de mais 4 jogadores!',
  creatorType: 'player'
 },
 {
  id: 2,
  sport: 'Vôlei',
  date: '19/05/2026',
  time: '18:00',
  location: 'Santos, SP',
  locationName: 'Praia do Gonzaga',
  level: 'Todos',
  playersNeeded: 8,
  currentPlayers: 5,
  confirmedPlayers: ['Marina', 'Luiza', 'Pedro', 'Gabriel', 'Lucas'],
  description: 'Vôlei de praia, todos os níveis bem-vindos!',
  creatorType: 'player',
  price: 25
 }
];

export default function MyGames() {
 const navigate = useNavigate();
 const { userType } = useUserType();
 const isArenaProfile = userType === 'arena';

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-md mx-auto px-6 py-4">
     <div className="flex items-center gap-4">
      {!isArenaProfile && (
       <button
        onClick={() => navigate('/profile')}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
       >
        <ArrowLeft size={24} />
       </button>
      )}
      <h1 className="text-xl font-bold text-gray-900">Meus Jogos</h1>
     </div>
    </div>
   </div>

   <div className="max-w-md mx-auto p-6">
    {mockGames.length > 0 ? (
     <div className="space-y-4">
      {mockGames.map(game => (
       <div key={game.id} className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] overflow-hidden">
        <div className="p-5">
         <div className="flex items-start justify-between mb-3">
          <div>
           <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{game.sport}</h3>
            <span className="px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">
             {game.sport} · {game.level}
            </span>
           </div>
           <div className="flex items-center text-sm text-gray-600 gap-3">
            <div className="flex items-center">
             <Calendar size={14} className="mr-1" />
             {game.date}
            </div>
            <div className="flex items-center">
             <Clock size={14} className="mr-1" />
             {game.time}
            </div>
           </div>
          </div>
          <div className="text-right">
           <div className="flex items-center justify-end gap-1 mb-1">
            <Users size={16} className="text-[#12d875]" />
            <span className="font-semibold text-gray-900">
             {game.currentPlayers}/{game.playersNeeded}
            </span>
           </div>
           <p className="text-xs text-gray-500">
            {game.playersNeeded - game.currentPlayers} vagas
           </p>
          </div>
         </div>

         <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="text-sm">{game.locationName}</span>
         </div>

         {game.price && (
          <div className="flex items-center gap-2 mb-3">
           <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            R$ {game.price.toFixed(2)}
           </span>
          </div>
         )}

         <p className="text-sm text-gray-700 mb-4">{game.description}</p>

         {game.confirmedPlayers.length > 0 && (
          <div className="mb-4 pb-4 border-b border-gray-100">
           <p className="text-xs font-semibold text-gray-700 mb-2">Jogadores Confirmados:</p>
           <div className="flex flex-wrap gap-2">
            {game.confirmedPlayers.map((player, idx) => (
             <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
             >
              {player}
             </span>
            ))}
           </div>
          </div>
         )}

         <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-[#12d875] text-white rounded-md hover:bg-[#10c26a] transition-colors text-sm font-medium">
           Ver Interessados ({Math.floor(Math.random() * 5) + 3})
          </button>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
           <Edit size={18} className="text-gray-600" />
          </button>
          <button className="p-2 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
           <Trash2 size={18} className="text-red-500" />
          </button>
         </div>
        </div>
       </div>
      ))}
     </div>
    ) : (
     <div className="text-center py-12">
      <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
      <p className="text-gray-500 mb-4">Você ainda não criou nenhum jogo</p>
      <button
       onClick={() => navigate('/create-game')}
       className="px-6 py-3 bg-gradient-to-r from-[#12d875] to-[#12d875] text-white rounded-md hover:shadow-md transition-shadow"
      >
       Criar Meu Primeiro Jogo
      </button>
     </div>
    )}

    {mockGames.length > 0 && (
     <button
      onClick={() => navigate('/create-game')}
      className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:border-[#12d875] hover:text-[#12d875] transition-colors font-medium"
     >
      + Criar Novo Jogo
     </button>
    )}
   </div>
  </div>
 );
}
