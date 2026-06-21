import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Calendar, Clock, MapPin, AlertTriangle, XCircle } from 'lucide-react';

export default function CancelMatch() {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const matchId = searchParams.get('matchId');

 const [reason, setReason] = useState('');
 const [selectedReason, setSelectedReason] = useState('');

 const currentMatch = {
  sport: 'Vôlei',
  opponent: 'Marina Costa',
  date: '15/05/2026',
  time: '19:00',
  location: 'Quadra Central',
  mode: 'competitive'
 };

 const reasonOptions = [
  'Compromisso inesperado',
  'Não estou me sentindo bem',
  'Problemas com o local',
  'Condições climáticas',
  'Outro motivo'
 ];

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  navigate('/agenda');
 };

 return (
  <div className="min-h-screen bg-white">
   <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
    <div className="flex items-center gap-3">
     <button onClick={() => navigate('/agenda')} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <h1 className="text-xl font-bold text-gray-900">Cancelar Partida</h1>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 pb-24">
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex gap-3">
     <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
     <div>
      <p className="text-sm font-medium text-red-800 mb-1">Atenção ao cancelar</p>
      <p className="text-sm text-red-700">
       Cancelamentos frequentes podem afetar sua reputação na plataforma. Seu parceiro será notificado imediatamente.
      </p>
     </div>
    </div>

    <div className="bg-gray-50 p-5 rounded-md mb-6">
     <div className="flex items-start justify-between mb-4">
      <div>
       <h3 className="font-semibold text-gray-900 text-lg mb-1">{currentMatch.sport}</h3>
       <p className="text-gray-600">vs {currentMatch.opponent}</p>
      </div>
      {currentMatch.mode === 'competitive' && (
       <span className="px-3 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">
        Competitivo
       </span>
      )}
     </div>

     <div className="space-y-2 text-sm text-gray-700">
      <div className="flex items-center gap-2">
       <Calendar size={16} className="text-gray-500" />
       <span>{currentMatch.date} às {currentMatch.time}</span>
      </div>
      <div className="flex items-center gap-2">
       <MapPin size={16} className="text-gray-500" />
       <span>{currentMatch.location}</span>
      </div>
     </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
       Motivo do cancelamento
      </label>
      <div className="space-y-2">
       {reasonOptions.map((option) => (
        <button
         key={option}
         type="button"
         onClick={() => setSelectedReason(option)}
         className={`w-full text-left px-4 py-3 border-2 rounded-md transition-colors ${
          selectedReason === option
           ? 'border-red-500 bg-red-50 text-red-900'
           : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
         }`}
        >
         {option}
        </button>
       ))}
      </div>
     </div>

     {selectedReason === 'Outro motivo' && (
      <div>
       <label className="block text-sm font-medium text-gray-700 mb-2">
        Descreva o motivo
       </label>
       <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        placeholder="Explique o motivo do cancelamento..."
        required
       />
      </div>
     )}

     <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="font-medium text-gray-900 mb-2 text-sm">O que acontece após cancelar:</h4>
      <ul className="space-y-2 text-sm text-gray-600">
       <li className="flex items-start gap-2">
        <span className="text-gray-400"></span>
        <span>{currentMatch.opponent} será notificado imediatamente</span>
       </li>
       <li className="flex items-start gap-2">
        <span className="text-gray-400"></span>
        <span>A partida será removida da sua agenda</span>
       </li>
       <li className="flex items-start gap-2">
        <span className="text-gray-400"></span>
        <span>Você poderá remarcar posteriormente pelo chat</span>
       </li>
      </ul>
     </div>

     <div className="flex gap-3">
      <button
       type="button"
       onClick={() => navigate('/agenda')}
       className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
      >
       Voltar
      </button>
      <button
       type="submit"
       disabled={!selectedReason || (selectedReason === 'Outro motivo' && !reason)}
       className="flex-1 bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
       Cancelar Partida
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
