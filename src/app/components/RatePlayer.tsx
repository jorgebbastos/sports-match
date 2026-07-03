import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';

export default function RatePlayer() {
 const navigate = useNavigate();
 const { matchId } = useParams();
 const [rating, setRating] = useState(0);
 const [hoveredRating, setHoveredRating] = useState(0);
 const [comment, setComment] = useState('');

 const opponent = 'Lucas Oliveira';

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  navigate('/agenda');
 };

 return (
  <div className="min-h-screen bg-white p-6 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center gap-3 mb-6">
     <button onClick={() => navigate('/agenda')} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <h1 className="text-2xl font-bold text-gray-900">Avaliar Jogador</h1>
    </div>

    <div className="text-center mb-8">
     <div className="w-24 h-24 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-5xl"></span>
     </div>
     <h2 className="text-xl font-semibold text-gray-900">{opponent}</h2>
     <p className="text-gray-600">Como foi jogar com {opponent.split(' ')[0]}?</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
     <div>
      <label className="block text-center font-semibold text-gray-900 mb-4">
       Avaliação Geral
      </label>
      <div className="flex justify-center gap-2 mb-2">
       {[1, 2, 3, 4, 5].map((value) => (
        <button
         key={value}
         type="button"
         onClick={() => setRating(value)}
         onMouseEnter={() => setHoveredRating(value)}
         onMouseLeave={() => setHoveredRating(0)}
         className="p-2 transition-transform hover:scale-110"
        >
         <Star
          size={48}
          className={`${
           value <= (hoveredRating || rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
          } transition-colors`}
         />
        </button>
       ))}
      </div>
      <p className="text-center text-sm text-gray-600">
       {rating === 0 && 'Selecione a avaliação'}
       {rating === 1 && 'Muito ruim'}
       {rating === 2 && 'Ruim'}
       {rating === 3 && 'Regular'}
       {rating === 4 && 'Bom'}
       {rating === 5 && 'Excelente'}
      </p>
     </div>

     <div>
      <label className="block font-semibold text-gray-900 mb-2">
       Comentário (opcional)
      </label>
      <textarea
       value={comment}
       onChange={(e) => setComment(e.target.value)}
       rows={4}
       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent resize-none"
       placeholder="Conte como foi a experiência de jogar com este parceiro..."
      />
     </div>

     <div>
      <h3 className="font-semibold text-gray-900 mb-3">Avaliações Detalhadas</h3>
      <div className="space-y-3">
       {[
        { label: 'Nível Técnico', key: 'technical' },
        { label: 'Pontualidade', key: 'punctuality' },
        { label: 'Fair Play', key: 'fairplay' },
        { label: 'Comunicação', key: 'communication' }
       ].map((item) => (
        <div key={item.key} className="bg-gray-50 p-3 rounded-md">
         <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{item.label}</span>
          <div className="flex gap-1">
           {[1, 2, 3, 4, 5].map((value) => (
            <button
             key={value}
             type="button"
             className="p-1"
            >
             <Star
              size={20}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
             />
            </button>
           ))}
          </div>
         </div>
        </div>
       ))}
      </div>
     </div>

     <div className="bg-[#12d875]/10 p-4 rounded-md">
      <p className="text-sm text-gray-700">
       Sua avaliação ajuda a comunidade a encontrar melhores parceiros e mantém a qualidade das partidas!
      </p>
     </div>

     <button
      type="submit"
      disabled={rating === 0}
      className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
     >
      Enviar Avaliação
     </button>
    </form>
   </div>
  </div>
 );
}
