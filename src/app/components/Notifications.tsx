import { useNavigate } from 'react-router';
import { ArrowLeft, ThumbsUp, MessageCircle, Trophy, Calendar, Check, X } from 'lucide-react';

interface Notification {
 id: number;
 type: 'match' | 'message' | 'match_invite' | 'match_result' | 'tournament';
 title: string;
 message: string;
 time: string;
 read: boolean;
 actionable?: boolean;
}

const mockNotifications: Notification[] = [
 {
  id: 1,
  type: 'match',
  title: 'Novo Match!',
  message: 'Você e Marina Costa deram match! Comece a conversar.',
  time: 'há 5 min',
  read: false
 },
 {
  id: 2,
  type: 'match_invite',
  title: 'Convite de Partida',
  message: 'Carlos Silva te convidou para jogar tênis amanhã às 19h',
  time: 'há 1 hora',
  read: false,
  actionable: true
 },
 {
  id: 3,
  type: 'match_result',
  title: 'Confirmar Resultado',
  message: 'Pedro Santos registrou o resultado da partida. Confirme o placar.',
  time: 'há 2 horas',
  read: false,
  actionable: true
 },
 {
  id: 4,
  type: 'message',
  title: 'Nova Mensagem',
  message: 'Julia Mendes: "Boa! Confirmo para sexta às 18h"',
  time: 'há 3 horas',
  read: true
 },
 {
  id: 5,
  type: 'tournament',
  title: 'Novo Torneio Disponível',
  message: 'Campeonato de Tênis SP - Inscrições abertas até 01/06',
  time: 'há 1 dia',
  read: true
 }
];

export default function Notifications() {
 const navigate = useNavigate();

 const getIcon = (type: Notification['type']) => {
  const icons = {
   match: <ThumbsUp size={20} className="text-[#12d875]" />,
   message: <MessageCircle size={20} className="text-[#12d875]" />,
   match_invite: <Calendar size={20} className="text-purple-500" />,
   match_result: <Trophy size={20} className="text-[#12d875]" />,
   tournament: <Trophy size={20} className="text-[#12d875]" />
  };
  return icons[type];
 };

 return (
  <div className="min-h-screen bg-gray-50">
   <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
    <div className="flex items-center gap-3">
     <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <h1 className="text-xl font-bold text-gray-900">Notificações</h1>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-4 pb-24">
    <div className="space-y-2">
     {mockNotifications.map(notification => (
      <div
       key={notification.id}
       className={`bg-white rounded-md p-4 shadow-[0_1px_0_rgba(11,18,32,0.08)] ${
        !notification.read ? 'border-l-4 border-[#12d875]' : ''
       }`}
      >
       <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
         {getIcon(notification.type)}
        </div>

        <div className="flex-1 min-w-0">
         <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
          {!notification.read && (
           <div className="w-2 h-2 bg-[#12d875] rounded-full flex-shrink-0 mt-2" />
          )}
         </div>
         <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
         <p className="text-xs text-gray-400">{notification.time}</p>

         {notification.actionable && (
          <div className="flex gap-2 mt-3">
           <button className="flex-1 bg-[#12d875] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#10c26a] transition-colors flex items-center justify-center gap-1">
            <Check size={16} />
            Aceitar
           </button>
           <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
            <X size={16} />
            Recusar
           </button>
          </div>
         )}
        </div>
       </div>
      </div>
     ))}
    </div>

    {mockNotifications.filter(n => !n.read).length > 0 && (
     <button className="w-full mt-4 py-3 text-[#12d875] font-medium hover:bg-white rounded-md transition-colors">
      Marcar todas como lidas
     </button>
    )}
   </div>
  </div>
 );
}
