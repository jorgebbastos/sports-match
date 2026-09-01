import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, ThumbsUp, MapPin, Star, Info, Bell, User } from 'lucide-react';

interface Player {
 id: number;
 name: string;
 age: number;
 location: string;
 sport: string;
 level: string;
 rating: number;
 matches: number;
 bio: string;
}

const mockPlayers: Player[] = [
 {
  id: 1,
  name: 'Carlos Silva',
  age: 28,
  location: 'Sao Paulo, SP',
  sport: 'Tenis',
  level: 'Intermediario',
  rating: 4.5,
  matches: 42,
  bio: 'Procuro parceiros para partidas 1x1 durante a semana.',
 },
 {
  id: 2,
  name: 'Marina Costa',
  age: 25,
  location: 'Sao Paulo, SP',
  sport: 'Volei',
  level: 'Avancado',
  rating: 4.8,
  matches: 78,
  bio: 'Gosto de jogos equilibrados e combinados com antecedencia.',
 },
 {
  id: 3,
  name: 'Pedro Santos',
  age: 32,
  location: 'Sao Paulo, SP',
  sport: 'Futebol',
  level: 'Intermediario',
  rating: 4.3,
  matches: 35,
  bio: 'Disponivel para partidas casuais no fim de semana.',
 },
];

export default function SwipeScreen() {
 const navigate = useNavigate();
 const [currentIndex, setCurrentIndex] = useState(0);
 const currentPlayer = mockPlayers[currentIndex];

 const handleSwipe = () => {
  setCurrentIndex(prev => prev + 1);
 };

 if (!currentPlayer) {
  return (
   <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <div className="text-center">
     <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
      <ThumbsUp className="text-gray-400" size={36} />
     </div>
     <h2 className="text-xl font-semibold text-gray-900 mb-2">Sem novos perfis</h2>
     <p className="text-gray-600">Volte mais tarde para encontrar novos parceiros 1x1.</p>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 px-4 pt-5 pb-20 sm:p-6 sm:pb-24">
   <div className="max-w-md mx-auto min-h-[calc(100svh-6.25rem)] flex flex-col">
    <div className="flex items-center justify-between mb-4 sm:mb-5">
     <h1 className="text-2xl font-bold text-gray-900">Descoberta</h1>
     <button
      onClick={() => navigate('/notifications')}
      className="relative p-2 hover:bg-white rounded-full transition-colors"
      aria-label="Notificacoes"
     >
      <Bell size={24} />
      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
     </button>
    </div>

    <div className="bg-white rounded-md border border-gray-200 overflow-hidden flex-1 flex flex-col min-h-0">
     <div className="relative flex-[1.35] min-h-[45svh] sm:h-72 sm:min-h-0 sm:flex-none bg-[#12d875] flex items-center justify-center">
      <div className="w-40 h-40 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center border border-gray-200">
       <User size={88} className="text-[#12d875] sm:w-[72px] sm:h-[72px]" />
      </div>
      <button
       onClick={() => navigate(`/user/${currentPlayer.id}`)}
       className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200"
       aria-label="Ver perfil"
      >
       <Info size={20} className="text-gray-700" />
      </button>
     </div>

     <div className="p-5 sm:p-6 flex-1 flex flex-col min-h-0">
      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
       <div>
        <h2 className="text-2xl sm:text-2xl font-bold text-gray-900">
         {currentPlayer.name}, {currentPlayer.age}
        </h2>
        <div className="flex items-center text-gray-600 mt-1">
         <MapPin size={16} className="mr-1" />
         <span className="text-sm">{currentPlayer.location}</span>
        </div>
       </div>
       <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
        <Star size={16} className="text-[#12d875] mr-1" />
        <span className="font-semibold text-gray-900">{currentPlayer.rating}</span>
       </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
       <span className="px-3 py-1 bg-[#12d875]/10 text-[#0b7a45] rounded-full text-sm font-medium">
        {currentPlayer.sport}
       </span>
       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
        {currentPlayer.level}
       </span>
       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
        {currentPlayer.matches} partidas
       </span>
      </div>

      <p className="text-gray-700 mb-5 sm:mb-6">{currentPlayer.bio}</p>

      <div className="flex gap-4 mt-auto pt-2">
       <button
        onClick={handleSwipe}
        className="flex-1 h-12 border border-gray-300 text-gray-700 rounded-md font-semibold flex items-center justify-center gap-2"
       >
        <X size={20} />
        Descartar
       </button>
       <button
        onClick={handleSwipe}
        className="flex-1 h-12 bg-[#12d875] text-white rounded-md font-semibold flex items-center justify-center gap-2"
       >
        <ThumbsUp size={20} />
        Curtir
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
