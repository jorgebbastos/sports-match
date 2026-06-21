import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, Star, ThumbsUp, User, X } from 'lucide-react';

export default function UserProfile() {
 const navigate = useNavigate();
 const { userId } = useParams();

 const user = {
  name: 'Marina Costa',
  age: 25,
  location: 'São Paulo, SP',
  sports: [
   { name: 'Vôlei', level: 'Avançado' },
   { name: 'Corrida', level: 'Intermediário' }
  ],
  rating: 4.8,
  matches: 78,
  winRate: 85,
  bio: 'Atleta de vôlei, adoro competições e treinos intensos. Jogo há 5 anos e estou sempre buscando evoluir!'
 };

 return (
  <div className="min-h-screen bg-white">
   <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 z-10">
    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
     <ArrowLeft size={24} />
    </button>
   </div>

   <div className="max-w-2xl mx-auto">
    <div className="h-80 bg-gradient-to-br from-[#12d875] to-[#12d875] flex items-center justify-center">
     <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-md">
      <User size={86} className="text-[#12d875]" />
     </div>
    </div>

    <div className="p-6">
     <div className="flex items-start justify-between mb-4">
      <div>
       <h1 className="text-3xl font-bold text-gray-900">
        {user.name}, {user.age}
       </h1>
       <div className="flex items-center text-gray-600 mt-2">
        <MapPin size={18} className="mr-1" />
        <span>{user.location}</span>
       </div>
      </div>
      <div className="flex items-center bg-[#12d875]/10 px-4 py-2 rounded-full">
       <Star size={20} className="text-[#12d875] mr-1" />
       <span className="text-xl font-semibold text-gray-900">{user.rating}</span>
      </div>
     </div>

     <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">Esportes</h3>
      <div className="flex flex-wrap gap-2 mb-4">
       {user.sports.map(sport => (
        <span
         key={sport.name}
         className="px-4 py-2 bg-[#12d875]/10 text-[#12d875] rounded-full font-medium"
        >
         {sport.name} · {sport.level}
        </span>
       ))}
      </div>
      <div className="flex items-center gap-6 text-gray-600">
       <div>
        <span className="font-semibold text-gray-900">{user.matches}</span> partidas
       </div>
       <div>
        <span className="font-semibold text-gray-900">{user.winRate}%</span> vitórias
       </div>
      </div>
     </div>

     <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-2">Sobre</h3>
      <p className="text-gray-700 leading-relaxed">{user.bio}</p>
     </div>

     <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">Avaliações Recentes</h3>
      <div className="space-y-3">
       {[
        { name: 'João Silva', rating: 5.0, comment: 'Excelente jogadora, muito técnica!' },
        { name: 'Pedro Santos', rating: 4.5, comment: 'Ótima parceira de jogo.' }
       ].map((review, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-md">
         <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-900">{review.name}</span>
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

     <div className="flex gap-4 sticky bottom-20 pb-6">
      <button
       onClick={() => navigate(-1)}
       className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
      >
       <X size={24} />
       Voltar
      </button>
      <button
       onClick={() => navigate('/matches')}
       className="flex-1 bg-[#12d875] text-white py-4 rounded-md font-semibold hover:bg-[#10c26a] transition-colors flex items-center justify-center gap-2"
      >
       <ThumbsUp size={24} />
       Curtir
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
