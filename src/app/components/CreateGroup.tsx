import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Users } from 'lucide-react';

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

export default function CreateGroup() {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  name: '',
  sport: '',
  location: '',
  level: '',
  members: '',
  lookingFor: '',
  description: ''
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Grupo criado:', formData);
  // Aqui salvaria o grupo
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
      <h1 className="text-xl font-bold text-gray-900">Criar Grupo</h1>
     </div>
    </div>
   </div>

   <div className="max-w-md mx-auto p-6">
    <div className="bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-md p-8 mb-6 text-center">
     <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
      <Users size={40} className="text-[#12d875]" />
     </div>
     <h2 className="text-white text-xl font-bold mb-2">Cadastre seu Grupo</h2>
     <p className="text-white/90 text-sm">
      Você será o representante e poderá receber solicitações de jogadores
     </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Nome do Grupo *
      </label>
      <input
       type="text"
       name="name"
       value={formData.name}
       onChange={handleChange}
       placeholder="Ex: Time da Quarta"
       required
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      />
     </div>

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

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Localização *
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
       Nível técnico do grupo *
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

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Número de Membros (opcional)
      </label>
      <input
       type="number"
       name="members"
       value={formData.members}
       onChange={handleChange}
       placeholder="Ex: 15"
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      />
     </div>

     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
       Procurando (opcional)
      </label>
      <input
       type="text"
       name="lookingFor"
       value={formData.lookingFor}
       onChange={handleChange}
       placeholder="Ex: Goleiro, Zagueiro"
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
      />
      <p className="text-xs text-gray-500 mt-1">
       Posições ou tipo de jogador que você procura
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
       placeholder="Conte sobre seu grupo, frequência de jogos, horários, etc."
       required
       rows={4}
       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent resize-none"
      />
     </div>

     <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#12d875] to-[#12d875] text-white py-4 rounded-md font-semibold hover:shadow-md transition-shadow mt-6"
     >
      Criar Grupo
     </button>
    </form>
   </div>
  </div>
 );
}
