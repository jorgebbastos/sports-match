import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Zap, Star, Trophy, Users, Shield, Target, Flame, ChevronRight, Lock, User } from 'lucide-react';

const LEAGUES = [
 { name: 'Bronze', color: '#CD7F32', bg: '#FDF0E6', min: 0, max: 100 },
 { name: 'Prata', color: '#A8A9AD', bg: '#F4F4F5', min: 100, max: 300 },
 { name: 'Ouro', color: '#FFD700', bg: '#FFFBEB', min: 300, max: 600 },
 { name: 'Diamante', color: '#12d875', bg: '#EFF4FF', min: 600, max: 1000 },
 { name: 'Elite', color: '#12d875', bg: '#F0FDF4', min: 1000, max: 1000 },
];

const XP_ACTIONS = [
 { label: 'Fazer login diário', xp: 5, icon: '' },
 { label: 'Marcar uma partida', xp: 20, icon: '' },
 { label: 'Completar uma partida', xp: 50, icon: '' },
 { label: 'Avaliar jogador', xp: 10, icon: '' },
 { label: 'Criar grupo', xp: 30, icon: '' },
 { label: 'Convidar amigo', xp: 40, icon: '' },
];

const ACHIEVEMENTS = [
 { id: 1, title: 'Primeira Partida', desc: 'Jogue sua primeira partida', icon: '', unlocked: true, xp: 50 },
 { id: 2, title: '5 Dias Seguidos', desc: 'Use o app por 5 dias seguidos', icon: '', unlocked: true, xp: 75 },
 { id: 3, title: '10 conversas', desc: 'Consiga 10 conversas', icon: '', unlocked: true, xp: 100 },
 { id: 4, title: 'Campeão da Semana', desc: 'Fique no top 3 da liga semanal', icon: '', unlocked: false, xp: 200 },
 { id: 5, title: 'Maratonista', desc: 'Jogue 20 partidas em um mês', icon: '', unlocked: false, xp: 150 },
 { id: 6, title: 'Capitão', desc: 'Crie e gerencie um grupo', icon: '', unlocked: false, xp: 120 },
 { id: 7, title: 'Social', desc: 'Convide 5 amigos para o app', icon: '', unlocked: false, xp: 180 },
 { id: 8, title: 'Lenda', desc: 'Alcance aLiga Elite', icon: '', unlocked: false, xp: 500 },
];

const LEADERBOARD = [
 { rank: 1, name: 'Ana Silva', xp: 840, avatar: '' },
 { rank: 2, name: 'Carlos Mendes', xp: 790, avatar: '' },
 { rank: 3, name: 'Marina Costa', xp: 750, avatar: '' },
 { rank: 4, name: 'Você', xp: 680, avatar: '', isMe: true },
 { rank: 5, name: 'Pedro Santos', xp: 610, avatar: '' },
 { rank: 6, name: 'Julia Mendes', xp: 570, avatar: '' },
 { rank: 7, name: 'Lucas Oliveira', xp: 520, avatar: '' },
];

const USER_XP = 680;
const USER_STREAK = 7;
const currentLeague = LEAGUES[3]; // Diamante
const nextLeague = LEAGUES[4];
const progressPct = ((USER_XP - currentLeague.min) / (nextLeague.min - currentLeague.min)) * 100;

export default function Gamification() {
 const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'league'>('overview');

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   {/* Header */}
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-2xl mx-auto px-6 py-4">
     <div className="flex items-center gap-3 mb-4">
      <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
       <ArrowLeft size={24} />
      </button>
      <div className="flex-1 text-center">
       <Zap className="w-8 h-8 text-[#12d875] mx-auto mb-1" />
       <h1 className="text-xl font-bold text-gray-900">Liga SportsMatch</h1>
      </div>
      <div className="w-10" />
     </div>
     <div className="flex gap-1 bg-gray-100 rounded-md p-1">
      {([['overview', ' Visão Geral'], ['achievements', 'Conquistas'], ['league', 'Liga']] as const).map(([key, label]) => (
       <button key={key} onClick={() => setActiveTab(key)}
        className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors ${activeTab === key ? 'bg-white text-gray-900 shadow-[0_1px_0_rgba(11,18,32,0.08)]' : 'text-gray-600'}`}>
        {label}
       </button>
      ))}
     </div>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 space-y-5">

    {/* VISÃO GERAL */}
    {activeTab === 'overview' && (
     <>
      {/* Streak */}
      <div className="bg-gradient-to-r from-white to-[#e8f8ef] border border-[#12d875]/20 rounded-md p-5 text-gray-900">
       <div className="flex items-center justify-between">
        <div>
         <p className="text-sm text-gray-600 mb-1">Sequência atual</p>
         <div className="flex items-end gap-2">
          <span className="text-5xl font-bold">{USER_STREAK}</span>
          <span className="text-xl mb-1">dias</span>
         </div>
         <p className="text-sm text-gray-700 mt-1">Continue assim! Não perca sua sequência.</p>
        </div>
        <Flame size={58} className="text-[#12d875] opacity-90" />
       </div>
       <div className="mt-4 flex gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
         <div key={i} className={`flex-1 h-2 rounded-full ${i < USER_STREAK ? 'bg-[#12d875]' : 'bg-[#12d875]/20'}`} />
        ))}
       </div>
       <p className="text-xs text-gray-500 mt-1">Meta semanal: 7 dias</p>
      </div>

      {/*Liga e XP */}
      <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-5">
       <div className="flex items-center justify-between mb-4">
        <div>
         <p className="text-sm text-gray-500">Liga Atual</p>
         <div className="flex items-center gap-2 mt-0.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: currentLeague.bg }}>
           
          </div>
          <span className="text-xl font-bold" style={{ color: currentLeague.color }}>{currentLeague.name}</span>
         </div>
        </div>
        <div className="text-right">
         <p className="text-sm text-gray-500">XP Total</p>
         <p className="text-2xl font-bold text-gray-900">{USER_XP} <span className="text-sm font-normal text-gray-500">xp</span></p>
        </div>
       </div>
       <div className="mb-2 flex justify-between text-xs text-gray-500">
        <span>{currentLeague.name}</span>
        <span>{nextLeague.name}</span>
       </div>
       <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, backgroundColor: currentLeague.color }} />
       </div>
       <p className="text-xs text-gray-500 mt-1.5">{nextLeague.min - USER_XP} XP para alcançar aLiga {nextLeague.name}</p>
      </div>

      {/* Como ganhar XP */}
      <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] p-5">
       <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Zap size={16} className="text-[#12d875]" />
        Como ganhar XP
       </h2>
       <div className="space-y-2">
        {XP_ACTIONS.map((action) => (
         <div key={action.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
          <span className="text-xl">{action.icon}</span>
          <span className="flex-1 text-sm text-gray-700">{action.label}</span>
          <span className="text-sm font-bold text-[#12d875]">+{action.xp} XP</span>
         </div>
        ))}
       </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
       <button onClick={() => setActiveTab('achievements')}
        className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] flex items-center gap-3 hover:shadow-md transition-shadow">
        <Shield size={22} className="text-[#12d875]" />
        <div className="text-left">
         <p className="font-semibold text-sm text-gray-900">Conquistas</p>
         <p className="text-xs text-gray-500">3/8 desbloqueadas</p>
        </div>
        <ChevronRight size={16} className="text-gray-400 ml-auto" />
       </button>
       <button onClick={() => setActiveTab('league')}
        className="bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] flex items-center gap-3 hover:shadow-md transition-shadow">
        <Trophy size={22} className="text-[#12d875]" />
        <div className="text-left">
         <p className="font-semibold text-sm text-gray-900">RankingLiga</p>
         <p className="text-xs text-gray-500">Você está em #4</p>
        </div>
        <ChevronRight size={16} className="text-gray-400 ml-auto" />
       </button>
      </div>
     </>
    )}

    {/* CONQUISTAS */}
    {activeTab === 'achievements' && (
     <>
      <div className="flex items-center justify-between">
       <p className="text-sm text-gray-600">3 de 8 desbloqueadas</p>
       <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#12d875] rounded-full" style={{ width: '37.5%' }} />
       </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
       {ACHIEVEMENTS.map((ach) => (
        <div key={ach.id} className={`bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] flex items-center gap-4 ${!ach.unlocked ? 'opacity-60' : ''}`}>
         <div className={`w-14 h-14 rounded-md flex items-center justify-center text-2xl flex-shrink-0 ${ach.unlocked ? 'bg-[#12d875]/10' : 'bg-gray-100'}`}>
          {ach.unlocked ? <Trophy size={22} className="text-[#12d875]" /> : <Lock size={20} className="text-gray-400" />}
         </div>
         <div className="flex-1">
          <div className="flex items-center gap-2">
           <p className="font-semibold text-gray-900">{ach.title}</p>
           {ach.unlocked && <span className="text-xs bg-[#12d875]/10 text-[#12d875] px-2 py-0.5 rounded-full font-medium">Desbloqueado</span>}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{ach.desc}</p>
         </div>
         <div className="text-right flex-shrink-0">
          <span className={`text-sm font-bold ${ach.unlocked ? 'text-[#12d875]' : 'text-gray-400'}`}>+{ach.xp}</span>
          <p className="text-xs text-gray-400">XP</p>
         </div>
        </div>
       ))}
      </div>
     </>
    )}

    {/* LIGA / LEADERBOARD */}
    {activeTab === 'league' && (
     <>
      {/*Liga info */}
      <div className="bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-md p-5 text-white text-center">
       <p className="text-sm text-white/80 mb-1">Liga da Semana</p>
       <div className="text-5xl mb-2"></div>
       <p className="text-2xl font-bold">Liga Diamante</p>
       <p className="text-sm text-white/80 mt-1">Top 3 sobem paraLiga Elite</p>
       <div className="mt-3 bg-white/20 rounded-md px-4 py-2 inline-block">
        <p className="text-sm font-medium">Termina em: <span className="font-bold">2d 14h 32m</span></p>
       </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] overflow-hidden">
       <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Ranking Semanal</h2>
       </div>
       <div className="divide-y divide-gray-50">
        {LEADERBOARD.map((user) => (
         <div key={user.rank}
          className={`flex items-center gap-4 px-5 py-3.5 ${user.isMe ? 'bg-[#12d875]/5' : ''}`}>
          <div className="w-8 text-center font-bold">
           {user.rank <= 3
            ? <span className="text-xl">{user.rank === 1 ? '' : user.rank === 2 ? '' : ''}</span>
            : <span className="text-gray-500 text-sm">#{user.rank}</span>
           }
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
           {user.avatar || <User size={18} className="text-gray-500" />}
          </div>
          <div className="flex-1">
           <p className={`font-semibold text-sm ${user.isMe ? 'text-[#12d875]' : 'text-gray-900'}`}>
            {user.name}
            {user.isMe && <span className="ml-2 text-xs bg-[#12d875]/10 px-1.5 py-0.5 rounded-full">Você</span>}
           </p>
          </div>
          <div className="flex items-center gap-1 bg-[#12d875]/10 px-2.5 py-1 rounded-full">
           <Zap size={12} className="text-[#12d875]" />
           <span className="text-sm font-bold text-[#12d875]">{user.xp}</span>
          </div>
         </div>
        ))}
       </div>
      </div>
     </>
    )}
   </div>
  </div>
 );
}
