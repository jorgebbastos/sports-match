import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Send, Calendar, User, MapPin, Edit, History, Users, Swords } from 'lucide-react';

interface Message {
 id: number;
 text: string;
 sender: 'user' | 'other';
 timestamp: string;
}

export default function Chat() {
 const navigate = useNavigate();
 const { matchId } = useParams();

 // Detectar tipo
 const isGroup = matchId === '2' || matchId === '4';
 const isGame = matchId === '6' || matchId === '7';

 const groupInfo = matchId === '2'
  ? { name: 'Time da Quarta', representative: 'Carlos Mendes', members: 18 }
  : matchId === '4'
  ? { name: 'Grupo Vôlei de Praia', representative: 'Ana Paula', members: 24 }
  : null;

 const gameInfo = matchId === '6'
  ? {
    name: 'Racha de Futebol - Arena SP',
    creator: 'Ricardo Silva',
    creatorType: 'player' as const,
    date: '18/05/2026',
    time: '19:00',
    location: 'Arena SP - Pinheiros',
    playersNeeded: 10,
    currentPlayers: 6
   }
  : matchId === '7'
  ? {
    name: 'Basquete 3x3 - Sports Center',
    creator: 'Sports Center Arena',
    creatorType: 'arena' as const,
    date: '17/05/2026',
    time: '15:00',
    location: 'Sports Center Arena',
    playersNeeded: 6,
    currentPlayers: 4
   }
  : null;

 const individualName = matchId === '1' ? 'Marina Costa' : matchId === '3' ? 'Pedro Santos' : 'Julia Mendes';

 const [messages, setMessages] = useState<Message[]>(
  isGame
   ? [
     { id: 1, text: 'Opa! Vi seu interesse no jogo. Você confirma presença?', sender: 'other', timestamp: '16:15' },
     { id: 2, text: 'Sim! Pode me confirmar', sender: 'user', timestamp: '16:17' },
     { id: 3, text: 'Confirmado! Faltam poucos jogadores agora', sender: 'other', timestamp: '16:20' },
     { id: 4, text: 'Leva chuteira de campo, o gramado é sintético', sender: 'other', timestamp: '16:21' }
    ]
   : isGroup
   ? [
     { id: 1, text: 'Fala! Vi que você joga bem de goleiro!', sender: 'other', timestamp: '14:20' },
     { id: 2, text: 'Opa, obrigado! Procuro um time fixo', sender: 'user', timestamp: '14:22' },
     { id: 3, text: 'A gente joga toda quarta às 20h. Sempre precisa de goleiro', sender: 'other', timestamp: '14:25' },
     { id: 4, text: 'Que tal marcar um jogo pra você conhecer o pessoal?', sender: 'other', timestamp: '14:26' }
    ]
   : [
     { id: 1, text: 'Oi! Vi que você também joga vôlei!', sender: 'other', timestamp: '10:30' },
     { id: 2, text: 'Oi! Sim, jogo há uns 3 anos. E você?', sender: 'user', timestamp: '10:32' },
     { id: 3, text: 'Jogo há 5 anos! Que tal marcarmos uma partida?', sender: 'other', timestamp: '10:35' },
     { id: 4, text: 'Boa! Que tal sexta às 19h?', sender: 'other', timestamp: '10:36' }
    ]
 );
 const [newMessage, setNewMessage] = useState('');
 const [showMatchDetails, setShowMatchDetails] = useState(false);

 // Simular que existe uma partida agendada para matchId 1
 const hasScheduledMatch = matchId === '1';
 const scheduledMatch = hasScheduledMatch ? {
  sport: 'Vôlei',
  date: '15/05/2026',
  time: '19:00',
  location: 'Quadra Central',
  mode: 'competitive'
 } : null;

 const handleSend = () => {
  if (newMessage.trim()) {
   setMessages([...messages, {
    id: messages.length + 1,
    text: newMessage,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
   }]);
   setNewMessage('');
  }
 };

 return (
  <div className="min-h-screen flex flex-col bg-white">
   <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 sticky top-0 z-10">
    <button onClick={() => navigate('/matches')} className="p-2 hover:bg-gray-100 rounded-full">
     <ArrowLeft size={24} />
    </button>
    <div className="w-12 h-12 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
     {isGroup ? (
      <Users size={24} className="text-white" />
     ) : isGame ? (
      <Calendar size={24} className="text-white" />
     ) : (
      <User size={24} className="text-white" />
     )}
    </div>
    <div className="flex-1">
     {isGame && gameInfo ? (
      <>
       <div className="flex items-center gap-2">
        <h2 className="font-semibold text-gray-900 text-sm">{gameInfo.name}</h2>
        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
         Jogo
        </span>
       </div>
       <p className="text-xs text-gray-600">
        {gameInfo.creatorType === 'arena' ? 'Arena' : 'Organizador'}: {gameInfo.creator}
       </p>
       <p className="text-xs text-gray-500">
        {gameInfo.currentPlayers}/{gameInfo.playersNeeded} confirmados
       </p>
      </>
     ) : isGroup && groupInfo ? (
      <>
       <div className="flex items-center gap-2">
        <h2 className="font-semibold text-gray-900">{groupInfo.name}</h2>
        <span className="px-2 py-0.5 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">
         Grupo
        </span>
       </div>
       <p className="text-xs text-gray-600">
        com {groupInfo.representative} {groupInfo.members} membros
       </p>
      </>
     ) : (
      <>
       <h2 className="font-semibold text-gray-900">{individualName}</h2>
       <p className="text-sm text-gray-600">Online</p>
      </>
     )}
    </div>
    {!isGroup && !isGame && (
     <>
      <button
       className="p-2 hover:bg-gray-100 rounded-full"
       title="Ver histórico de partidas"
      >
       <History size={20} />
      </button>
      <button
       onClick={() => navigate(`/user/${matchId}`)}
       className="p-2 hover:bg-gray-100 rounded-full"
      >
       <User size={20} />
      </button>
     </>
    )}
   </div>

   <div className="flex-1 p-4 overflow-y-auto space-y-3">
    {messages.map(message => (
     <div
      key={message.id}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
     >
      <div
       className={`max-w-[70%] rounded-md px-4 py-2 ${
        message.sender === 'user'
         ? 'bg-[#12d875] text-white'
         : 'bg-gray-100 text-gray-900'
       }`}
      >
       <p>{message.text}</p>
       <p
        className={`text-xs mt-1 ${
         message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
        }`}
       >
        {message.timestamp}
       </p>
      </div>
     </div>
    ))}
   </div>

   <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
    {isGroup && (
     <button
      onClick={() => navigate(`/create-match?type=group-vs-group&groupId=${matchId}`)}
      className="w-full bg-orange-50 text-orange-700 border border-orange-200 py-2.5 rounded-md font-semibold hover:bg-orange-100 transition-colors mb-3 flex items-center justify-center gap-2"
     >
      <Swords size={18} />
      Desafiar outro Grupo
     </button>
    )}
    {hasScheduledMatch ? (
     <>
      {showMatchDetails && (
       <div className="bg-gray-50 rounded-md p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
         <h3 className="font-semibold text-gray-900">Partida Agendada</h3>
         <button
          onClick={() => setShowMatchDetails(false)}
          className="text-gray-500 hover:text-gray-700"
         >
          
         </button>
        </div>
        <div className="space-y-2 text-sm mb-3">
         <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-gray-900">{scheduledMatch?.date} às {scheduledMatch?.time}</span>
         </div>
         <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <span className="text-gray-900">{scheduledMatch?.location}</span>
         </div>
         <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full font-medium">
           {scheduledMatch?.mode === 'competitive' ? 'Competitivo' : 'Casual'}
          </span>
         </div>
        </div>
        <button
         onClick={() => navigate(`/reschedule-match?matchId=${matchId}`)}
         className="w-full bg-[#12d875]/10 text-[#0b1220] py-2 rounded-md text-sm font-medium hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2"
        >
         <Edit size={16} />
         Remarcar Partida
        </button>
       </div>
      )}
      <button
       onClick={() => setShowMatchDetails(!showMatchDetails)}
       className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors mb-3 flex items-center justify-center gap-2"
      >
       <Calendar size={20} />
       {showMatchDetails ? 'Ocultar Detalhes' : 'Partida Marcada - Ver Detalhes'}
      </button>
     </>
    ) : (
     <button
      onClick={() => navigate(`/create-match?matchId=${matchId}`)}
      className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors mb-3 flex items-center justify-center gap-2"
     >
      <Calendar size={20} />
      Marcar Partida
     </button>
    )}
    <div className="flex gap-2">
     <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      placeholder="Digite sua mensagem..."
      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
     />
     <button
      onClick={handleSend}
      className="w-10 h-10 bg-[#12d875] text-white rounded-full flex items-center justify-center hover:bg-[#10c26a] transition-colors"
     >
      <Send size={20} />
     </button>
    </div>
   </div>
  </div>
 );
}
