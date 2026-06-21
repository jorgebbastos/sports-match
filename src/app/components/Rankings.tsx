import { Trophy, Medal, Star, TrendingUp, ArrowLeft, Users, Dumbbell, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface RankingPlayer {
 position: number;
 name: string;
 points: number;
 matches: number;
 winRate: number;
 rating: number;
}

interface GroupRanking {
 position: number;
 groupName: string;
 sport: string;
 members: number;
 wins: number;
 points: number;
 level: string;
}

interface GameRanking {
 position: number;
 gameName: string;
 sport: string;
 location: string;
 totalPlayers: number;
 completedGames: number;
 rating: number;
}

const mockRankings: Record<string, RankingPlayer[]> = {
 'Tênis': [
  { position: 1, name: 'Ana Silva', points: 1250, matches: 45, winRate: 78, rating: 4.9 },
  { position: 2, name: 'Carlos Mendes', points: 1180, matches: 42, winRate: 75, rating: 4.8 },
  { position: 3, name: 'Você', points: 980, matches: 35, winRate: 68, rating: 4.5 },
  { position: 4, name: 'Marina Costa', points: 920, matches: 38, winRate: 65, rating: 4.4 },
  { position: 5, name: 'Pedro Santos', points: 850, matches: 30, winRate: 63, rating: 4.3 },
 ],
 'Futebol': [
  { position: 1, name: 'João Silva', points: 2100, matches: 78, winRate: 82, rating: 4.9 },
  { position: 2, name: 'Lucas Oliveira', points: 1950, matches: 65, winRate: 79, rating: 4.8 },
  { position: 3, name: 'Rafael Costa', points: 1820, matches: 60, winRate: 75, rating: 4.7 },
 ],
 'Vôlei': [
  { position: 1, name: 'Marina Costa', points: 1850, matches: 78, winRate: 85, rating: 4.9 },
  { position: 2, name: 'Julia Mendes', points: 1720, matches: 70, winRate: 80, rating: 4.8 },
  { position: 3, name: 'Camila Santos', points: 1580, matches: 65, winRate: 76, rating: 4.7 },
 ],
};

const mockGroupRankings: GroupRanking[] = [
 { position: 1, groupName: 'Leões do Parque', sport: 'Futebol', members: 22, wins: 34, points: 1680, level: 'Avançado' },
 { position: 2, groupName: 'Raquetes de Ouro', sport: 'Tênis', members: 16, wins: 28, points: 1540, level: 'Avançado' },
 { position: 3, groupName: 'Time da Quarta', sport: 'Futebol', members: 18, wins: 25, points: 1390, level: 'Intermediário' },
 { position: 4, groupName: 'Vôlei Praia SP', sport: 'Vôlei', members: 24, wins: 22, points: 1250, level: 'Avançado' },
 { position: 5, groupName: 'Grupo Tênis Finals', sport: 'Tênis', members: 12, wins: 19, points: 1100, level: 'Intermediário' },
 { position: 6, groupName: 'Pelada dos Bros', sport: 'Futebol', members: 15, wins: 15, points: 950, level: 'Iniciante' },
];

const mockGameRankings: GameRanking[] = [
 { position: 1, gameName: 'Arena Esportiva Central', sport: 'Tênis / Padel', location: 'Pinheiros, SP', totalPlayers: 342, completedGames: 128, rating: 4.9 },
 { position: 2, gameName: 'Sports Center Arena', sport: 'Futebol / Basquete', location: 'Paulista, SP', totalPlayers: 289, completedGames: 104, rating: 4.8 },
 { position: 3, gameName: 'Racha de Futebol Semanal', sport: 'Futebol', location: 'Vila Mariana, SP', totalPlayers: 210, completedGames: 87, rating: 4.7 },
 { position: 4, gameName: 'Beach Tennis Park', sport: 'Beach Tennis', location: 'Moema, SP', totalPlayers: 175, completedGames: 65, rating: 4.6 },
 { position: 5, gameName: 'Arena Vôlei Goiânia', sport: 'Vôlei', location: 'Goiânia, GO', totalPlayers: 158, completedGames: 58, rating: 4.5 },
];

const medalEmoji = (_p: number) => null;

export default function Rankings() {
 const navigate = useNavigate();
 const [tab, setTab] = useState<'players' | 'groups' | 'games'>('players');
 const [selectedSport, setSelectedSport] = useState('Tênis');
 const sports = Object.keys(mockRankings);
 const rankings = mockRankings[selectedSport];

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-2xl mx-auto px-6 py-4">
     <div className="flex items-center gap-3 mb-4">
      <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
       <ArrowLeft size={24} />
      </button>
      <div className="flex-1 text-center">
       <Trophy className="w-10 h-10 text-[#12d875] mx-auto mb-1" />
       <h1 className="text-xl font-bold text-gray-900">Rankings</h1>
       <p className="text-sm text-gray-600">Competições e conquistas</p>
      </div>
      <div className="w-10" />
     </div>

     {/* Main tabs */}
     <div className="flex gap-1 bg-gray-100 rounded-md p-1">
      {([['players', ' Jogadores'], ['groups', ' Grupos'], ['games', ' Jogos']] as const).map(([key, label]) => (
       <button key={key} onClick={() => setTab(key)}
        className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${tab === key ? 'bg-white text-gray-900 shadow-[0_1px_0_rgba(11,18,32,0.08)]' : 'text-gray-600 hover:text-gray-800'}`}>
        {label}
       </button>
      ))}
     </div>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6">

    {/* JOGADORES */}
    {tab === 'players' && (
     <>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
       {sports.map(sport => (
        <button key={sport} onClick={() => setSelectedSport(sport)}
         className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${selectedSport === sport ? 'bg-[#12d875] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
         {sport}
        </button>
       ))}
      </div>
      <div className="space-y-3">
       {rankings.map(player => (
        <div key={player.position}
         className={`bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] ${player.name === 'Você' ? 'ring-2 ring-[#12d875]' : ''}`}>
         <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
           {medalEmoji(player.position)
            ? <span className="text-2xl">{medalEmoji(player.position)}</span>
            : <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">{player.position}</div>
           }
          </div>
          <div className="flex-1 min-w-0">
           <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">
             {player.name}
             {player.name === 'Você' && <span className="ml-2 text-xs bg-[#12d875]/10 text-[#12d875] px-2 py-1 rounded-full">Você</span>}
            </h3>
            <div className="flex items-center gap-1 bg-[#12d875]/10 px-2 py-1 rounded-full">
             <Star size={14} className="text-[#12d875]" />
             <span className="text-sm font-semibold text-gray-900">{player.rating}</span>
            </div>
           </div>
           <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1"><Trophy size={12} />{player.points} pts</div>
            <div className="flex items-center gap-1"><Medal size={12} />{player.matches} jogos</div>
            <div className="flex items-center gap-1"><TrendingUp size={12} />{player.winRate}% vitórias</div>
           </div>
          </div>
         </div>
        </div>
       ))}
      </div>
     </>
    )}

    {/* GRUPOS */}
    {tab === 'groups' && (
     <div className="space-y-3">
      {mockGroupRankings.map(group => (
       <div key={group.position} className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)]">
        <div className="flex items-center gap-4">
         <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          {medalEmoji(group.position)
           ? <span className="text-2xl">{medalEmoji(group.position)}</span>
           : <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">{group.position}</div>
          }
         </div>
         <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
           <h3 className="font-semibold text-gray-900 truncate">{group.groupName}</h3>
           <span className="ml-2 text-xs px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full flex-shrink-0">{group.sport}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
           <div className="flex items-center gap-1"><Trophy size={12} />{group.points} pts</div>
           <div className="flex items-center gap-1"><TrendingUp size={12} />{group.wins} vitórias</div>
           <div className="flex items-center gap-1"><Users size={12} />{group.members} membros</div>
          </div>
          <div className="mt-1">
           <span className={`text-xs px-2 py-0.5 rounded-full ${
            group.level === 'Avançado' ? 'bg-purple-100 text-purple-700'
            : group.level === 'Intermediário' ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600'
           }`}>{group.level}</span>
          </div>
         </div>
        </div>
       </div>
      ))}
     </div>
    )}

    {/* JOGOS / ARENAS */}
    {tab === 'games' && (
     <div className="space-y-3">
      {mockGameRankings.map(game => (
       <div key={game.position} className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)]">
        <div className="flex items-center gap-4">
         <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          {medalEmoji(game.position)
           ? <span className="text-2xl">{medalEmoji(game.position)}</span>
           : <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">{game.position}</div>
          }
         </div>
         <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
           <h3 className="font-semibold text-gray-900 truncate">{game.gameName}</h3>
           <div className="flex items-center gap-1 bg-[#12d875]/10 px-2 py-1 rounded-full flex-shrink-0">
            <Star size={12} className="text-[#12d875]" />
            <span className="text-xs font-semibold text-gray-900">{game.rating}</span>
           </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
           <MapPin size={11} />{game.location}
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
           <div className="flex items-center gap-1"><Dumbbell size={12} />{game.completedGames} partidas</div>
           <div className="flex items-center gap-1"><Users size={12} />{game.totalPlayers} jogadores</div>
           <span className="text-xs text-gray-500 truncate">{game.sport}</span>
          </div>
         </div>
        </div>
       </div>
      ))}
     </div>
    )}

    <div className="mt-8 text-center">
     <div className="inline-block bg-gradient-to-r from-[#12d875] to-[#12d875] rounded-md p-6 text-white">
      <Trophy size={40} className="mx-auto mb-3" />
      <h3 className="font-bold text-lg mb-2">Desbloqueie o Modo Competidor</h3>
      <p className="text-sm text-white/90 mb-4 max-w-sm">Métricas detalhadas, histórico completo e rankings competitivos</p>
      <button onClick={() => navigate("/premium")} className="bg-white text-[#12d875] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-md">
       Ser Premium
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
