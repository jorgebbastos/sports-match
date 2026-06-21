import { useNavigate } from "react-router";
import {
 ArrowLeft,
 Users,
 MapPin,
 Edit,
 Trash2,
 MessageCircle,
} from "lucide-react";

interface Group {
 id: number;
 name: string;
 sport: string;
 location: string;
 level: string;
 members: number;
 description: string;
 matchRequests: number;
}

const mockGroups: Group[] = [
 {
  id: 1,
  name: "Time da Quarta",
  sport: "Futebol",
  location: "São Paulo, SP",
  level: "Intermediário",
  members: 18,
  description:
   "Jogamos toda quarta às 20h. Sempre precisamos de goleiro.",
  matchRequests: 3,
 },
 {
  id: 2,
  name: "Grupo Tênis Finals",
  sport: "Tênis",
  location: "São Paulo, SP",
  level: "Avançado",
  members: 12,
  description:
   "Grupo de tênis competitivo para treinos e torneios.",
  matchRequests: 5,
 },
];

export default function MyGroups() {
 const navigate = useNavigate();

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-md mx-auto px-6 py-4">
     <div className="flex items-center gap-4">
      <button
       onClick={() => navigate("/profile")}
       className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
       <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-900">
       Meus Grupos
      </h1>
     </div>
    </div>
   </div>

   <div className="max-w-md mx-auto p-6">
    {mockGroups.length > 0 ? (
     <div className="space-y-4">
      {mockGroups.map((group) => (
       <div
        key={group.id}
        className="bg-white rounded-md shadow-[0_1px_0_rgba(11,18,32,0.08)] overflow-hidden"
       >
        <div className="p-5">
         <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
           <div className="w-12 h-12 bg-gradient-to-br from-[#12d875] to-[#12d875] rounded-full flex items-center justify-center">
            <Users
             size={24}
             className="text-white"
            />
           </div>
           <div>
            <h3 className="font-semibold text-gray-900">
             {group.name}
            </h3>
            <p className="text-xs text-gray-500">
             {group.members} membros
            </p>
           </div>
          </div>
          {group.matchRequests > 0 && (
           <span className="px-2 py-1 bg-[#12d875] text-white rounded-full text-xs font-semibold">
            {group.matchRequests} solicitações
           </span>
          )}
         </div>

         <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-[#12d875]/10 text-[#12d875] rounded-full text-xs font-medium">
           {group.sport} · {group.level}
          </span>
         </div>

         <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">
           {group.location}
          </span>
         </div>

         <p className="text-sm text-gray-700 mb-4">
          {group.description}
         </p>

         <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#12d875] text-white rounded-md hover:bg-[#10c26a] transition-colors">
           <MessageCircle size={16} />
           <span className="text-sm font-medium">
            Ver Solicitações
           </span>
          </button>
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
           <Edit
            size={18}
            className="text-gray-600"
           />
          </button>
          <button className="p-2 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
           <Trash2
            size={18}
            className="text-red-500"
           />
          </button>
         </div>
        </div>
       </div>
      ))}
     </div>
    ) : (
     <div className="text-center py-12">
      <Users
       size={48}
       className="mx-auto mb-3 text-gray-300"
      />
      <p className="text-gray-500 mb-4">
       Você ainda não criou nenhum grupo
      </p>
      <button
       onClick={() => navigate("/create-group")}
       className="px-6 py-3 bg-gradient-to-r from-[#12d875] to-[#12d875] text-white rounded-md hover:shadow-md transition-shadow"
      >
       Criar Meu Primeiro Grupo
      </button>
     </div>
    )}

    {mockGroups.length > 0 && (
     <button
      onClick={() => navigate("/create-group")}
      className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:border-[#12d875] hover:text-[#12d875] transition-colors font-medium"
     >
      + Criar Novo Grupo
     </button>
    )}
   </div>
  </div>
 );
}