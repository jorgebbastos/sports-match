import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';

export default function RescheduleMatch() {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const matchId = searchParams.get('matchId');

 const [date, setDate] = useState('2026-05-15');
 const [time, setTime] = useState('19:00');
 const [location, setLocation] = useState('Quadra Central');
 const [reason, setReason] = useState('');

 const currentMatch = {
  sport: 'Vôlei',
  opponent: 'Marina Costa',
  currentDate: '15/05/2026',
  currentTime: '19:00',
  currentLocation: 'Quadra Central'
 };

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
     <h1 className="text-xl font-bold text-gray-900">Remarcar Partida</h1>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 pb-24">
    <div className="bg-[#12d875]/10 border border-[#12d875]/20 rounded-md p-4 mb-6 flex gap-3">
     <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
     <div>
      <p className="text-sm font-medium text-yellow-800 mb-1">Atenção</p>
      <p className="text-sm text-[#0b1220]">
       Seu parceiro será notificado sobre a remarcação e precisará confirmar a nova data.
      </p>
     </div>
    </div>

    <div className="bg-gray-50 p-4 rounded-md mb-6">
     <p className="text-sm font-medium text-gray-700 mb-3">Agendamento Atual</p>
     <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2 text-gray-900">
       <span className="font-semibold">Esporte:</span>
       <span>{currentMatch.sport}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-900">
       <span className="font-semibold">Parceiro:</span>
       <span>{currentMatch.opponent}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-900">
       <Calendar size={16} className="text-gray-500" />
       <span>{currentMatch.currentDate} às {currentMatch.currentTime}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-900">
       <MapPin size={16} className="text-gray-500" />
       <span>{currentMatch.currentLocation}</span>
      </div>
     </div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Nova Data</label>
      <div className="relative">
       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        required
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Novo Horário</label>
      <div className="relative">
       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        required
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Local (opcional)</label>
      <div className="relative">
       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        placeholder="Mantenha o local atual ou altere"
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
       Motivo da remarcação (opcional)
      </label>
      <textarea
       value={reason}
       onChange={(e) => setReason(e.target.value)}
       rows={3}
       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent resize-none"
       placeholder="Ex: Surgiu um imprevisto no trabalho..."
      />
     </div>

     <div className="flex gap-3">
      <button
       type="button"
       onClick={() => navigate('/agenda')}
       className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
      >
       Cancelar
      </button>
      <button
       type="submit"
       className="flex-1 bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors"
      >
       Remarcar
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
