import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

const sports = [
 'Futebol',
 'Vôlei',
 'Basquete',
 'Tênis',
 'Padel',
 'Beach Tennis',
 'Futevôlei',
 'Corrida',
 'Ciclismo',
 'Natação'
];

const levels = ['Iniciante', 'Intermediário', 'Avançado', 'Todos'];

export default function CreateGame() {
 const navigate = useNavigate();
 const [creatorType, setCreatorType] = useState<'player' | 'arena'>('player');
 const [formData, setFormData] = useState({
  sport: '',
  date: '',
  time: '',
  location: '',
  locationName: '',
  playersNeeded: '',
  currentPlayers: '1',
  level: '',
  description: '',
  price: '',
  arenaName: '',
  arenaContact: ''
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Jogo criado:', { creatorType, ...formData });
  navigate('/profile');
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value
  });
 };

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-md mx-auto px-6 py-4">
     <div className="flex items-center gap-4">
      <button
       onClick={() => navigate(-1)}
       className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
       <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-900">Criar jogo</h1>
     </div>
    </div>
   </div>

   <div className="max-w-md mx-auto p-6">
    <div className="bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-md p-8 mb-6 text-center">
     <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
      <Calendar size={40} className="text-[#12d875]" />
     </div>
     <h2 className="text-white text-xl font-bold mb-2">Criar um Jogo</h2>
     <p className="text-white/90 text-sm">
      Organize uma partida e encontre jogadores para completar o time
     </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
       Você é *
      </label>
      <div className="grid grid-cols-2 gap-3">
       <button
        type="button"
        onClick={() => setCreatorType('player')}
        className={`p-4 rounded-md border-2 transition-colors ${
         creatorType === 'player'
          ? 'border-[#12d875] bg-[#12d875]/10 text-[#12d875]'
          : 'border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
       >
        <Users size={24} className="mx-auto mb-2" />
        <div className="font-semibold">Jogador</div>
        <div className="text-xs opacity-70">Organizando partida</div>
       </button>
       <button
        type="button"
        onClick={() => setCreatorType('arena')}
        className={`p-4 rounded-md border-2 transition-colors ${
         creatorType === 'arena'
          ? 'border-[#12d875] bg-[#12d875]/10 text-[#12d875]'
          : 'border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
       >
        <MapPin size={24} className="mx-auto mb-2" />
        <div className="font-semibold">Arena</div>
        <div className="text-xs opacity-70">Divulgando horário</div>
       </button>
      </div>
     </div>

     {creatorType === 'arena' && (
      <>
       <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
         Nome da Arena *
        </label>
        <input
         type="text"
         name="arenaName"
         value={formData.arenaName}
         onChange={handleChange}
         placeholder="Ex: Arena Sports Center"
         required
         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        />
       </div>

       <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
         Contato da Arena *
        </label>
        <input
         type="text"
         name="arenaContact"
         value={formData.arenaContact}
         onChange={handleChange}
         placeholder="Ex: (11) 98765-4321"
         required
         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        />
       </div>
      </>
     )}

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Esporte *
      </label>
      <select
       name="sport"
       value={formData.sport}
       onChange={handleChange}
       required
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      >
       <option value="">Selecione um esporte</option>
       {sports.map(sport => (
        <option key={sport} value={sport}>{sport}</option>
       ))}
      </select>
     </div>

     <div className="grid grid-cols-2 gap-3">
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">
        Data *
       </label>
       <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
       />
      </div>

      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">
        Horário *
       </label>
       <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Local *
      </label>
      <input
       type="text"
       name="location"
       value={formData.location}
       onChange={handleChange}
       placeholder="Ex: São Paulo, SP"
       required
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      />
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Nome do Local
      </label>
      <input
       type="text"
       name="locationName"
       value={formData.locationName}
       onChange={handleChange}
       placeholder="Ex: Arena SP - Pinheiros"
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      />
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Nível técnico do jogo *
      </label>
      <select
       name="level"
       value={formData.level}
       onChange={handleChange}
       required
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      >
       <option value="">Selecione o nível</option>
       {levels.map(level => (
        <option key={level} value={level}>{level}</option>
       ))}
      </select>
     </div>

     <div className="grid grid-cols-2 gap-3">
      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">
        Jogadores Necessários *
       </label>
       <input
        type="number"
        name="playersNeeded"
        value={formData.playersNeeded}
        onChange={handleChange}
        placeholder="Ex: 10"
        required
        min="2"
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
       />
      </div>

      <div>
       <label className="block text-sm font-semibold text-gray-700 mb-2">
        Jogadores Confirmados
       </label>
       <input
        type="number"
        name="currentPlayers"
        value={formData.currentPlayers}
        onChange={handleChange}
        placeholder="Ex: 1"
        min="0"
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Preço por Jogador (opcional)
      </label>
      <input
       type="number"
       name="price"
       value={formData.price}
       onChange={handleChange}
       placeholder="Ex: 50"
       min="0"
       step="0.01"
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      />
      <p className="text-xs text-gray-500 mt-1">
       Valor em reais (R$) - deixe vazio se for gratuito
      </p>
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Descrição *
      </label>
      <textarea
       name="description"
       value={formData.description}
       onChange={handleChange}
       placeholder="Descreva o jogo, regras especiais, o que levar, etc."
       required
       rows={4}
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent resize-none"
      />
     </div>

     <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#12d875] to-[#12d875] text-white py-4 rounded-md font-semibold hover:shadow-md transition-shadow mt-6"
     >
      Publicar Jogo
     </button>
    </form>
   </div>
  </div>
 );
}
