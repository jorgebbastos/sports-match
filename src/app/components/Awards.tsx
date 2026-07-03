import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
 ChevronLeft,
 ChevronRight,
 Share2,
 X,
 Trophy,
 Flame,
 Dumbbell,
 Users,
 CalendarDays,
 Medal,
 Sparkles,
 Network,
} from 'lucide-react';

type SlideTone = 'dark' | 'green' | 'white' | 'mint' | 'soft' | 'outline';

interface Slide {
 id: number;
 tone: SlideTone;
 icon: typeof Trophy;
 label: string;
 headline: string;
 sub: string;
 detail?: string;
}

const SLIDES: Slide[] = [
 {
  id: 1,
  tone: 'dark',
  icon: Trophy,
  label: 'Seu ano em esportes',
  headline: '35',
  sub: 'partidas jogadas em 2025',
  detail: 'Você jogou mais que 78% dos usuários SportsMatch!',
 },
 {
  id: 2,
  tone: 'green',
  icon: Flame,
  label: 'Sua sequencia maxima',
  headline: '14 dias',
  sub: 'de uso consecutivo',
  detail: 'Em março, você estava imparável.',
 },
 {
  id: 3,
  tone: 'white',
  icon: Dumbbell,
  label: 'Esporte favorito',
  headline: 'Tênis',
  sub: '62% das suas partidas',
  detail: '22 partidas jogadas, 68% de vitorias.',
 },
 {
  id: 4,
  tone: 'mint',
  icon: Users,
  label: 'Parceiro mais frequente',
  headline: 'Marina Costa',
  sub: '8 partidas juntos',
  detail: 'Excelente parceiro. Jogo limpo e tecnico.',
 },
 {
  id: 5,
  tone: 'soft',
  icon: CalendarDays,
  label: 'Sua melhor fase',
  headline: 'Agosto',
  sub: '9 vitorias em 11 partidas',
  detail: 'Mes com melhor aproveitamento: 82% de vitorias.',
 },
 {
  id: 6,
  tone: 'outline',
  icon: Network,
  label: 'Conexoes feitas',
  headline: '24',
  sub: 'novos parceiros via SportsMatch',
  detail: 'Você expandiu sua rede esportiva em 240%.',
 },
 {
  id: 7,
  tone: 'green',
  icon: Medal,
  label: 'Sua conquista do ano',
  headline: 'Atleta Dedicado',
  sub: 'Badge exclusivo 2025',
  detail: 'Concedido a quem jogou mais de 30 partidas no ano.',
 },
 {
  id: 8,
  tone: 'dark',
  icon: Sparkles,
  label: 'Seu Ano no SportsMatch',
  headline: '2025',
  sub: 'foi incrivel!',
  detail: '35 partidas / 24 parceiros / 14 dias de sequencia / Liga Diamante',
 },
];

const toneStyles: Record<SlideTone, {
 page: string;
 text: string;
 eyebrow: string;
 sub: string;
 detail: string;
 brand: string;
 ghost: string;
 shapeOne: string;
 shapeTwo: string;
 iconWrap: string;
 icon: string;
 close: string;
 dot: string;
 dotIdle: string;
 primary: string;
 secondary: string;
 back: string;
}> = {
 dark: {
  page: 'bg-[#07111f]',
  text: 'text-white',
  eyebrow: 'text-[#12d875]',
  sub: 'text-white/90',
  detail: 'text-white/70',
  brand: 'text-white/45',
  ghost: 'text-white/[0.04]',
  shapeOne: 'bg-[#12d875]/18',
  shapeTwo: 'bg-white/[0.06]',
  iconWrap: 'bg-[#12d875]/14 border-[#12d875]/30',
  icon: 'text-[#12d875]',
  close: 'bg-white/12 text-white hover:bg-white/18',
  dot: 'bg-[#12d875]',
  dotIdle: 'bg-white/25',
  primary: 'bg-[#12d875] text-[#07111f] hover:bg-[#10c26a]',
  secondary: 'bg-white/10 text-white hover:bg-white/16',
  back: 'bg-white/12 text-white hover:bg-white/18',
 },
 green: {
  page: 'bg-[#12d875]',
  text: 'text-[#07111f]',
  eyebrow: 'text-[#07111f]/70',
  sub: 'text-[#07111f]/90',
  detail: 'text-[#07111f]/65',
  brand: 'text-[#07111f]/45',
  ghost: 'text-white/14',
  shapeOne: 'bg-white/28',
  shapeTwo: 'bg-[#07111f]/8',
  iconWrap: 'bg-white/24 border-white/35',
  icon: 'text-[#07111f]',
  close: 'bg-white/85 text-[#07111f] hover:bg-white',
  dot: 'bg-[#07111f]',
  dotIdle: 'bg-white/45',
  primary: 'bg-white text-[#07111f] hover:bg-gray-50',
  secondary: 'bg-[#07111f]/10 text-[#07111f] hover:bg-[#07111f]/15',
  back: 'bg-white/28 text-[#07111f] hover:bg-white/40',
 },
 white: {
  page: 'bg-white',
  text: 'text-[#07111f]',
  eyebrow: 'text-[#12d875]',
  sub: 'text-gray-800',
  detail: 'text-gray-600',
  brand: 'text-gray-400',
  ghost: 'text-[#12d875]/8',
  shapeOne: 'bg-[#12d875]/12',
  shapeTwo: 'bg-gray-100',
  iconWrap: 'bg-[#12d875]/10 border-[#12d875]/20',
  icon: 'text-[#12d875]',
  close: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  dot: 'bg-[#12d875]',
  dotIdle: 'bg-[#12d875]/25',
  primary: 'bg-[#07111f] text-white hover:bg-[#13233b]',
  secondary: 'bg-[#12d875]/10 text-[#07111f] hover:bg-[#12d875]/18',
  back: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
 },
 mint: {
  page: 'bg-[#e8f8ef]',
  text: 'text-[#07111f]',
  eyebrow: 'text-[#12d875]',
  sub: 'text-gray-800',
  detail: 'text-gray-600',
  brand: 'text-gray-500',
  ghost: 'text-[#12d875]/12',
  shapeOne: 'bg-white/70',
  shapeTwo: 'bg-[#12d875]/15',
  iconWrap: 'bg-white/80 border-[#12d875]/20',
  icon: 'text-[#12d875]',
  close: 'bg-white/85 text-gray-900 hover:bg-white',
  dot: 'bg-[#12d875]',
  dotIdle: 'bg-[#12d875]/25',
  primary: 'bg-[#12d875] text-[#07111f] hover:bg-[#10c26a]',
  secondary: 'bg-white/80 text-[#07111f] hover:bg-white',
  back: 'bg-white/72 text-gray-800 hover:bg-white',
 },
 soft: {
  page: 'bg-[#f6f7f5]',
  text: 'text-[#07111f]',
  eyebrow: 'text-[#12d875]',
  sub: 'text-gray-800',
  detail: 'text-gray-600',
  brand: 'text-gray-500',
  ghost: 'text-[#07111f]/6',
  shapeOne: 'bg-[#12d875]/12',
  shapeTwo: 'bg-white',
  iconWrap: 'bg-white border-gray-200',
  icon: 'text-[#12d875]',
  close: 'bg-white text-gray-900 hover:bg-gray-100',
  dot: 'bg-[#12d875]',
  dotIdle: 'bg-gray-300',
  primary: 'bg-[#12d875] text-[#07111f] hover:bg-[#10c26a]',
  secondary: 'bg-white text-[#07111f] hover:bg-gray-100',
  back: 'bg-white text-gray-800 hover:bg-gray-100',
 },
 outline: {
  page: 'bg-white',
  text: 'text-[#07111f]',
  eyebrow: 'text-[#07111f]/60',
  sub: 'text-gray-800',
  detail: 'text-gray-600',
  brand: 'text-gray-400',
  ghost: 'text-[#12d875]/10',
  shapeOne: 'bg-[#12d875]/10',
  shapeTwo: 'bg-[#07111f]/5',
  iconWrap: 'bg-[#07111f] border-[#07111f]',
  icon: 'text-white',
  close: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  dot: 'bg-[#07111f]',
  dotIdle: 'bg-gray-300',
  primary: 'bg-[#12d875] text-[#07111f] hover:bg-[#10c26a]',
  secondary: 'bg-gray-100 text-[#07111f] hover:bg-gray-200',
  back: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
 },
};

export default function Awards() {
 const navigate = useNavigate();
 const [current, setCurrent] = useState(0);
 const slide = SLIDES[current];
 const isLast = current === SLIDES.length - 1;
 const tone = toneStyles[slide.tone];
 const SlideIcon = slide.icon;

 const prev = () => current > 0 && setCurrent(c => c - 1);
 const next = () => !isLast && setCurrent(c => c + 1);

 return (
  <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500 ${tone.page} ${tone.text}`}>
   <div className={`absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl ${tone.shapeOne}`} />
   <div className={`absolute bottom-28 -left-24 h-64 w-64 rounded-full blur-3xl ${tone.shapeTwo}`} />
   <div className={`absolute left-5 top-28 pointer-events-none select-none text-[150px] font-black italic leading-none ${tone.ghost}`}>
    {slide.headline}
   </div>

   <div className="relative z-10 flex items-center justify-between p-5 pt-8">
    <button onClick={() => navigate(-1)} className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-[0_1px_0_rgba(11,18,32,0.08)] ${tone.close}`}>
     <X size={20} />
    </button>
    <div className="flex gap-1.5">
     {SLIDES.map((_, i) => (
      <button
       key={i}
       onClick={() => setCurrent(i)}
       className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? `w-6 ${tone.dot}` : `w-1.5 ${tone.dotIdle}`}`}
      />
     ))}
    </div>
    <div className="w-11" />
   </div>

   <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
    <div className={`mb-7 flex h-20 w-20 items-center justify-center rounded-full border ${tone.iconWrap}`}>
     <SlideIcon size={38} strokeWidth={1.9} className={tone.icon} />
    </div>
    <p className={`text-xs font-bold uppercase tracking-[0.18em] mb-4 ${tone.eyebrow}`}>{slide.label}</p>
    <h1 className="text-5xl font-black mb-4 leading-none">{slide.headline}</h1>
    <p className={`text-xl font-bold ${tone.sub}`}>{slide.sub}</p>
    {slide.detail && (
     <p className={`mt-5 text-sm max-w-xs mx-auto leading-relaxed ${tone.detail}`}>{slide.detail}</p>
    )}
    <div className={`mt-auto mb-2 text-xs ${tone.brand}`}>
     <span>SportsMatch / Retrospectiva 2025</span>
    </div>
   </div>

   <div className="relative z-10 p-6 pb-10">
    {isLast ? (
     <div className="space-y-3">
      <button
       className={`w-full flex items-center justify-center gap-2 py-4 rounded-md font-bold text-base transition-colors shadow-md ${tone.primary}`}
       onClick={() => alert('Compartilhar em breve!')}
      >
       <Share2 size={20} />
       Compartilhar meu Ano
      </button>
      <button onClick={() => navigate('/profile')}
       className={`w-full py-3.5 rounded-md font-semibold transition-colors ${tone.secondary}`}>
       Voltar ao Perfil
      </button>
     </div>
    ) : (
     <div className="flex items-center gap-4">
      <button onClick={prev}
       className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-[0_1px_0_rgba(11,18,32,0.08)] ${tone.back} ${current === 0 ? 'opacity-40 pointer-events-none' : ''}`}>
       <ChevronLeft size={23} />
      </button>
      <button onClick={next}
       className={`flex-1 py-4 rounded-md font-bold text-base transition-colors shadow-md flex items-center justify-center gap-2 ${tone.primary}`}>
       Proximo
       <ChevronRight size={20} />
      </button>
     </div>
    )}
   </div>
  </div>
 );
}
