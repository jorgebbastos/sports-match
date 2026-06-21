import { ArrowLeft, CheckCircle2, Crown, ShieldCheck, Sparkles, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const PLAN_KEY = "sports-match-current-plan";

type Plan = "free" | "premium";

const freeFeatures = [
 "Criacao e edicao de perfil",
 "Matchmaking entre jogadores",
 "Chat interno",
 "Criacao de partidas",
 "Agenda simplificada",
 "Rankings p?blicos",
 "Visualizacao de perfis",
];

const premiumFeatures = [
 "Tudo do plano Free",
 "M?tricas detalhadas de desempenho",
 "Histórico completo de partidas",
 "Acompanhamento de evolução",
 "Ranking individual competitivo",
 "Agenda avançada",
 "Prioridade em torneios exclusivos",
 "Recursos premium do sistema competitivo",
];

export default function PremiumPlan() {
 const navigate = useNavigate();
 const [plan, setPlan] = useState<Plan>(() => {
  const stored = window.localStorage.getItem(PLAN_KEY);
  return stored === "premium" ? "premium" : "free";
 });

 const selectPlan = (nextPlan: Plan) => {
  setPlan(nextPlan);
  window.localStorage.setItem(PLAN_KEY, nextPlan);
 };

 return (
  <div className="min-h-screen bg-gray-50 pb-10">
   <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-2xl mx-auto p-4 flex items-center gap-3">
     <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
      <ArrowLeft size={24} />
     </button>
     <div>
      <h1 className="font-bold text-gray-900">Planos Sports Match</h1>
      <p className="text-sm text-gray-600">Escolha como quer competir</p>
     </div>
    </div>
   </div>

   <div className="max-w-2xl mx-auto p-6 space-y-5">
    <div className="bg-[#0b1220] rounded-md p-6 text-white">
     <div className="w-12 h-12 rounded-full bg-[#12d875] text-[#0b1220] flex items-center justify-center mb-4">
      <Crown size={26} />
     </div>
     <h2 className="text-2xl font-bold mb-2">Competidor Premium</h2>
     <p className="text-white/80">
      Mais dados, mais competição e mais controle sobre sua evolução esportiva.
     </p>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
     <PlanCard
      title="Free"
      price="R$ 0"
      subtitle="Para jogar, conversar e marcar partidas"
      selected={plan === "free"}
      buttonLabel={plan === "free" ? "Plano atual" : "Selecionar Free"}
      onSelect={() => selectPlan("free")}
      features={freeFeatures}
     />
     <PlanCard
      title="Premium"
      price="R$ 19,90/mes"
      subtitle="Para acompanhar desempenho e competir melhor"
      selected={plan === "premium"}
      highlighted
      buttonLabel={plan === "premium" ? "Premium ativo" : "Assinar Premium"}
      onSelect={() => selectPlan("premium")}
      features={premiumFeatures}
     />
    </div>

    <div className="bg-white rounded-md p-5">
     <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <Sparkles size={20} className="text-[#12d875]" />
      O que muda no Premium
     </h3>
     <div className="space-y-3">
      {[
       ["M?tricas completas", true],
       ["Histórico competitivo completo", true],
       ["Ranking individual e acompanhamento de evolução", true],
       ["Acesso básico ao app", false],
      ].map(([label, premiumOnly]) => (
       <div key={String(label)} className="flex items-center justify-between gap-3 text-sm">
        <span className="text-gray-700">{label}</span>
        {premiumOnly ? (
         <span className="flex items-center gap-1 text-[#12d875] font-medium">
          <CheckCircle2 size={16} />
          Premium
         </span>
        ) : (
         <span className="flex items-center gap-1 text-gray-500 font-medium">
          <ShieldCheck size={16} />
          Free
         </span>
        )}
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}

function PlanCard({
 title,
 price,
 subtitle,
 selected,
 highlighted = false,
 buttonLabel,
 onSelect,
 features,
}: {
 title: string;
 price: string;
 subtitle: string;
 selected: boolean;
 highlighted?: boolean;
 buttonLabel: string;
 onSelect: () => void;
 features: string[];
}) {
 return (
  <div className={`rounded-md p-5 border bg-white ${highlighted ? "border-[#12d875]" : "border-gray-200"}`}>
   <div className="flex items-start justify-between gap-3 mb-4">
    <div>
     <h3 className="text-xl font-bold text-gray-900">{title}</h3>
     <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
    {selected && (
     <span className="px-3 py-1 rounded-full bg-[#12d875]/10 text-[#0b1220] text-xs font-semibold">
      Selecionado
     </span>
    )}
   </div>
   <div className="mb-4">
    <span className="text-2xl font-bold text-gray-900">{price}</span>
   </div>
   <div className="space-y-2 mb-5">
    {features.map((feature) => (
     <div key={feature} className="flex items-start gap-2 text-sm text-gray-700">
      {highlighted || !feature.includes("M?tricas") ? (
       <CheckCircle2 size={16} className="text-[#12d875] mt-0.5 flex-shrink-0" />
      ) : (
       <XCircle size={16} className="text-gray-300 mt-0.5 flex-shrink-0" />
      )}
      <span>{feature}</span>
     </div>
    ))}
   </div>
   <button
    onClick={onSelect}
    className={`w-full py-3 rounded-md font-semibold transition-colors ${
     selected
      ? "bg-gray-100 text-gray-700"
      : highlighted
      ? "bg-[#12d875] text-white hover:bg-[#10c26a]"
      : "bg-[#0b1220] text-white hover:bg-gray-800"
    }`}
   >
    {buttonLabel}
   </button>
  </div>
 );
}
