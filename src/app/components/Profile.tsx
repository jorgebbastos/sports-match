import { useState } from 'react';
import { Check, Edit, LogOut, MapPin, Plus, Star, Trash2, User, X } from 'lucide-react';
import { useUserType } from '../App';

interface ProfileSport {
 id: number;
 sport: string;
 level: string;
}

const sportOptions = ['Tenis', 'Padel', 'Futebol', 'Volei', 'Basquete', 'Corrida'];
const levelOptions = ['Iniciante', 'Intermediario', 'Avancado'];

export default function Profile() {
 const { currentProfile } = useUserType();
 const [isEditing, setIsEditing] = useState(false);
 const [name, setName] = useState(currentProfile.name);
 const [location, setLocation] = useState(currentProfile.location || 'Sao Paulo, SP');
 const [description, setDescription] = useState(
  currentProfile.description || 'Disponivel para partidas 1x1 com combinados claros e jogo respeitoso.'
 );
 const [sports, setSports] = useState<ProfileSport[]>([
  { id: 1, sport: 'Tenis', level: 'Intermediario' },
  { id: 2, sport: 'Padel', level: 'Avancado' },
 ]);

 const addSport = () => {
  setSports(prev => [
   ...prev,
   {
    id: Date.now(),
    sport: sportOptions.find(option => !prev.some(item => item.sport === option)) || sportOptions[0],
    level: 'Iniciante',
   },
  ]);
 };

 const updateSport = (id: number, field: keyof Omit<ProfileSport, 'id'>, value: string) => {
  setSports(prev => prev.map(item => (item.id === id ? { ...item, [field]: value } : item)));
 };

 const removeSport = (id: number) => {
  setSports(prev => (prev.length > 1 ? prev.filter(item => item.id !== id) : prev));
 };

 return (
  <div className="min-h-screen p-6 bg-gray-50 pb-24">
   <div className="max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
     {isEditing ? (
      <button
       onClick={() => setIsEditing(false)}
       className="h-10 px-4 bg-[#12d875] text-white rounded-md font-semibold flex items-center gap-2"
      >
       <Check size={18} />
       Salvar
      </button>
     ) : (
      <button
       onClick={() => setIsEditing(true)}
       className="h-10 px-4 border border-gray-300 rounded-md font-semibold text-gray-800 flex items-center gap-2"
      >
       <Edit size={18} />
       Editar
      </button>
     )}
    </div>

    <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
     <div className="flex flex-col items-center text-center">
      <button
       className="w-28 h-28 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center mb-4"
       type="button"
      >
       <User size={56} className="text-[#12d875]" />
      </button>

      {isEditing ? (
       <input
        value={name}
        onChange={event => setName(event.target.value)}
        className="w-full max-w-sm text-center text-2xl font-bold text-gray-900 border border-gray-300 rounded-md px-3 py-2"
       />
      ) : (
       <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
      )}

      <div className="flex items-center justify-center gap-1 text-gray-600 mt-3 w-full">
       <MapPin size={16} />
       {isEditing ? (
        <input
         value={location}
         onChange={event => setLocation(event.target.value)}
         className="max-w-sm flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
       ) : (
        <span>{location}</span>
       )}
      </div>

      <div className="flex items-center gap-2 mt-4 px-3 py-1 bg-gray-100 rounded-full">
       <Star size={16} className="text-[#12d875]" fill="currentColor" />
       <span className="font-semibold text-gray-900">4.6</span>
       <span className="text-sm text-gray-600">media de avaliacoes</span>
      </div>
     </div>

     <div className="mt-6">
      <p className="text-sm font-semibold text-gray-900 mb-2">Sobre</p>
      {isEditing ? (
       <textarea
        value={description}
        onChange={event => setDescription(event.target.value)}
        rows={3}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 resize-none"
       />
      ) : (
       <p className="text-gray-700">{description}</p>
      )}
     </div>
    </div>

    <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
     <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-900">Esportes e habilidades</h2>
      {isEditing && (
       <button
        onClick={addSport}
        className="h-9 px-3 bg-[#12d875] text-white rounded-md text-sm font-semibold flex items-center gap-2"
       >
        <Plus size={16} />
        Adicionar
       </button>
      )}
     </div>

     <div className="space-y-3">
      {sports.map(item => (
       <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 bg-gray-50 rounded-md p-3">
        {isEditing ? (
         <>
          <label className="text-sm text-gray-700">
           <span className="block text-xs text-gray-500 mb-1">Esporte</span>
           <select
            value={item.sport}
            onChange={event => updateSport(item.id, 'sport', event.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md px-3 bg-white"
           >
            {sportOptions.map(option => (
             <option key={option} value={option}>
              {option}
             </option>
            ))}
           </select>
          </label>
          <label className="text-sm text-gray-700">
           <span className="block text-xs text-gray-500 mb-1">Habilidade neste esporte</span>
           <select
            value={item.level}
            onChange={event => updateSport(item.id, 'level', event.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md px-3 bg-white"
           >
            {levelOptions.map(option => (
             <option key={option} value={option}>
              {option}
             </option>
            ))}
           </select>
          </label>
          <button
           onClick={() => removeSport(item.id)}
           className="h-10 self-end border border-gray-300 rounded-md px-3 text-gray-700 flex items-center justify-center"
           aria-label="Remover esporte"
          >
           <Trash2 size={18} />
          </button>
         </>
        ) : (
         <>
          <div>
           <p className="text-xs text-gray-500 mb-1">Esporte</p>
           <p className="font-semibold text-gray-900">{item.sport}</p>
          </div>
          <div>
           <p className="text-xs text-gray-500 mb-1">Habilidade</p>
           <p className="font-semibold text-gray-900">{item.level}</p>
          </div>
         </>
        )}
       </div>
      ))}
     </div>
    </div>

    <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
     <h2 className="font-semibold text-gray-900 mb-4">Avaliacoes recebidas</h2>
     <div className="space-y-4">
      {[
       { name: 'Marina Costa', rating: '5.0', comment: 'Pontual, jogo limpo e comunicacao clara.' },
       { name: 'Carlos Silva', rating: '4.5', comment: 'Boa partida e otimo respeito aos combinados.' },
      ].map(review => (
       <div key={review.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <div className="flex items-center justify-between mb-2">
         <p className="font-medium text-gray-900">{review.name}</p>
         <div className="flex items-center gap-1 text-gray-900">
          <Star size={14} className="text-[#12d875]" fill="currentColor" />
          <span className="text-sm font-semibold">{review.rating}</span>
         </div>
        </div>
        <p className="text-sm text-gray-600">{review.comment}</p>
       </div>
      ))}
     </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
     {isEditing ? (
      <button
       onClick={() => setIsEditing(false)}
       className="h-11 border border-gray-300 rounded-md font-semibold text-gray-800 flex items-center justify-center gap-2"
      >
       <X size={18} />
       Cancelar
      </button>
     ) : (
      <button
       onClick={() => setIsEditing(true)}
       className="h-11 border border-gray-300 rounded-md font-semibold text-gray-800 flex items-center justify-center gap-2"
      >
       <Edit size={18} />
       Editar
      </button>
     )}
     <button className="h-11 border border-gray-300 rounded-md font-semibold text-gray-800 flex items-center justify-center gap-2">
      <LogOut size={18} />
      Sair
     </button>
    </div>
   </div>
  </div>
 );
}
