import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Building2, ChevronDown, MapPin, Dumbbell, Clock } from 'lucide-react';
import logoSportsMatch from '../../imports/logo-app-sports-match.png';
import { MOCK_PROFILES, MockProfile } from '../App';
import { useUserType } from '../App';

interface LoginProps {
 onLogin: (profile: MockProfile) => void;
}

export default function Login({ onLogin }: LoginProps) {
 const navigate = useNavigate();
 const { setCurrentProfile, setUserType } = useUserType();
 const [selectedProfileId, setSelectedProfileId] = useState(MOCK_PROFILES[0].id);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 const selectedProfile = MOCK_PROFILES.find(p => p.id === selectedProfileId) ?? MOCK_PROFILES[0];
 const isArena = selectedProfile.type === 'arena';

 const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  onLogin(selectedProfile);
  if (isArena) {
   navigate('/my-games');
  } else {
   navigate('/swipe');
  }
 };

 const accentColor = '#12d875';
 const accentHover = '#10c26a';

 return (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-[#f6f7f5] to-[#e8f8ef] relative overflow-hidden">
   <div className="w-full max-w-md relative z-10">
    {/* Logo */}
    <div className="text-center mb-8">
     <div className="mx-auto mb-5 flex items-center justify-center">
      <img src={logoSportsMatch} alt="Sports Match" className="w-full max-w-[300px] h-auto object-contain" />
     </div>
     <p className="text-gray-600 text-sm italic">
      {isArena ? 'Plataforma para Arenas Esportivas' : 'Encontre seu parceiro para esportes'}
     </p>
    </div>

    {/* Profile Selector */}
    <div className="mb-6">
     <label className="block text-sm font-medium text-gray-700 mb-2">
     Entrar como
     </label>
     <div className="relative">
      <button
       type="button"
       onClick={() => setIsDropdownOpen(!isDropdownOpen)}
       className="w-full flex items-center gap-3 p-4 border-2 rounded-md bg-white text-left transition-colors focus:outline-none"
       style={{ borderColor: accentColor }}
      >
       <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${accentColor}20` }}
       >
        {selectedProfile.type === 'arena' ? (
         <Building2 size={20} style={{ color: accentColor }} />
        ) : (
         <User size={20} style={{ color: accentColor }} />
        )}
       </div>
       <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{selectedProfile.name}</p>
        <p className="text-xs text-gray-500">
         {selectedProfile.type === 'arena' ? 'Arena Esportiva' : 'Jogador'}
         {selectedProfile.sport ? ` · ${selectedProfile.sport}` : ''}
        </p>
       </div>
       <ChevronDown
        size={18}
        className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
       />
      </button>

      {isDropdownOpen && (
       <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 overflow-hidden">
        {MOCK_PROFILES.map(profile => {
         const profileAccent = '#12d875';
         const isSelected = profile.id === selectedProfileId;
         return (
          <button
           key={profile.id}
           type="button"
           onClick={() => {
            setSelectedProfileId(profile.id);
            setIsDropdownOpen(false);
           }}
           className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50 ${
            isSelected ? 'bg-gray-50' : ''
           }`}
          >
           <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${profileAccent}20` }}
           >
            {profile.type === 'arena' ? (
             <Building2 size={20} style={{ color: profileAccent }} />
            ) : (
             <User size={20} style={{ color: profileAccent }} />
            )}
           </div>
           <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{profile.name}</p>
            <p className="text-xs text-gray-500">
             {profile.type === 'arena' ? 'Arena Esportiva' : 'Jogador'}
             {profile.sport ? ` · ${profile.sport}` : ''}
            </p>
           </div>
           {isSelected && (
            <div
             className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: profileAccent }}
            >
             <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
            </div>
           )}
          </button>
         );
        })}
       </div>
      )}
     </div>
    </div>

    {/* Profile Preview Card */}
    <div
     className="rounded-md p-4 mb-6 border bg-white transition-colors duration-300"
     style={{ borderColor: `${accentColor}55` }}
    >
     {isArena ? (
      <div className="space-y-2">
       <div className="flex items-center gap-2 text-sm text-gray-700">
        <MapPin size={14} style={{ color: accentColor }} />
        <span>{selectedProfile.location}</span>
       </div>
       <div className="flex items-center gap-2 text-sm text-gray-700">
        <Dumbbell size={14} style={{ color: accentColor }} />
        <span>{selectedProfile.sport}</span>
       </div>
       {selectedProfile.hours && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
         <Clock size={14} style={{ color: accentColor }} />
         <span>{selectedProfile.hours}</span>
        </div>
       )}
      </div>
     ) : (
      <div className="space-y-2">
       <div className="flex items-center gap-2 text-sm text-gray-700">
        <MapPin size={14} style={{ color: accentColor }} />
        <span>{selectedProfile.location}</span>
       </div>
       <div className="flex items-center gap-2 text-sm text-gray-700">
        <Dumbbell size={14} style={{ color: accentColor }} />
        <span>{selectedProfile.sport} · {selectedProfile.level}</span>
       </div>
      </div>
     )}
    </div>

    {/* Login Button */}
    <form onSubmit={handleLogin}>
     <button
      type="submit"
      className="w-full text-white py-3.5 rounded-md font-semibold transition-colors text-base"
      style={{ backgroundColor: accentColor }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = accentColor)}
     >
      {isArena ? 'Entrar como Arena' : 'Entrar como Jogador'}
     </button>
    </form>

    <div className="mt-5 text-center">
     <button
      onClick={() => navigate('/signup')}
      className="text-sm font-medium hover:underline"
      style={{ color: accentColor }}
     >
      Não tem conta? Cadastre-se
     </button>
    </div>
   </div>
  </div>
 );
}
