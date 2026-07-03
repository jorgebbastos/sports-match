import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Trophy } from 'lucide-react';

export default function MatchResult() {
 const navigate = useNavigate();
 const { matchId } = useParams();
 const [playerScore, setPlayerScore] = useState('');
 const [opponentScore, setOpponentScore] = useState('');
 const [sets, setSets] = useState([{ player: '', opponent: '' }]);

 const match = {
  sport: 'Tênis',
  opponent: 'Lucas Oliveira',
  date: '15/05/2026',
  time: '19:00'
 };

 const addSet = () => {
  setSets([...sets, { player: '', opponent: '' }]);
 };

 const updateSet = (index: number, field: 'player' | 'opponent', value: string) => {
  const newSets = [...sets];
  newSets[index][field] = value;
  setSets(newSets);
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  navigate(`/rate-player/${matchId}`);
 };

 return (
  <div className="min-h-screen bg-white p-6 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center gap-3 mb-6">
     <button onClick={() => navigate('/agenda')} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <h1 className="text-2xl font-bold text-gray-900">Registrar Resultado</h1>
    </div>

    <div className="bg-gray-50 p-4 rounded-md mb-6">
     <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-gray-900">{match.sport}</span>
      <Trophy size={20} className="text-[#12d875]" />
     </div>
     <p className="text-gray-600">vs {match.opponent}</p>
     <p className="text-sm text-gray-500">{match.date} às {match.time}</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
     <div>
      <h3 className="font-semibold text-gray-900 mb-4">Placar por Sets</h3>
      <div className="space-y-3">
       {sets.map((set, index) => (
        <div key={index} className="flex items-center gap-3">
         <span className="text-sm font-medium text-gray-600 w-12">Set {index + 1}</span>
         <div className="flex items-center gap-2 flex-1">
          <div className="flex-1">
           <label className="block text-xs text-gray-600 mb-1">Você</label>
           <input
            type="number"
            min="0"
            value={set.player}
            onChange={(e) => updateSet(index, 'player', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent text-center text-lg font-semibold"
            required
           />
          </div>
          <span className="text-2xl text-gray-400 mt-6">:</span>
          <div className="flex-1">
           <label className="block text-xs text-gray-600 mb-1">{match.opponent}</label>
           <input
            type="number"
            min="0"
            value={set.opponent}
            onChange={(e) => updateSet(index, 'opponent', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent text-center text-lg font-semibold"
            required
           />
          </div>
         </div>
        </div>
       ))}
      </div>
      {sets.length < 5 && (
       <button
        type="button"
        onClick={addSet}
        className="mt-3 w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-[#12d875] hover:text-[#12d875] transition-colors"
       >
        + Adicionar Set
       </button>
      )}
     </div>

     <div className="bg-[#12d875]/10 p-4 rounded-md">
      <p className="text-sm text-gray-700 mb-2">
       <strong>Importante:</strong> O resultado será enviado para {match.opponent} confirmar.
      </p>
      <p className="text-xs text-gray-600">
       Após a confirmação, o resultado será contabilizado no ranking.
      </p>
     </div>

     <button
      type="submit"
      className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors"
     >
      Continuar para Avaliação
     </button>
    </form>
   </div>
  </div>
 );
}
