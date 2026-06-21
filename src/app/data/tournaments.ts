export interface Tournament {
 id: number;
 name: string;
 sport: string;
 date: string;
 location: string;
 participants: number;
 maxParticipants: number;
 prize: string;
 level: string;
 status: "open" | "full" | "ongoing" | "finished";
 organizer: string;
 registrationFee: string;
 format: string;
 description: string;
 schedule: string[];
 rules: string[];
 perks: string[];
}

export const REGISTERED_TOURNAMENTS_KEY = "sports-match-registered-tournaments";

export const mockTournaments: Tournament[] = [
 {
  id: 1,
  name: "Campeonato de T?nis SP",
  sport: "T?nis",
  date: "2026-06-15",
  location: "Clube Paineiras",
  participants: 24,
  maxParticipants: 32,
  prize: "R$ 5.000",
  level: "Intermedi?rio/Avan?ado",
  status: "open",
  organizer: "Sports Match Eventos",
  registrationFee: "R$ 80,00",
  format: "Chave eliminatoria com disputa de terceiro lugar",
  description:
   "Torneio competitivo para jogadores que querem testar seu nivel, registrar desempenho e ganhar visibilidade no ranking da plataforma.",
  schedule: ["08:00 - Credenciamento", "09:00 - Primeira rodada", "14:00 - Semifinais", "17:00 - Final"],
  rules: ["Partidas em melhor de 3 sets curtos", "W.O. apos 10 minutos de atraso", "Resultado confirmado pelos dois jogadores"],
  perks: ["Pontua no ranking", "Premiação em dinheiro", "Histórico completo no perfil"],
 },
 {
  id: 2,
  name: "Torneio de V?lei de Praia",
  sport: "V?lei",
  date: "2026-06-20",
  location: "Praia de Santos",
  participants: 16,
  maxParticipants: 16,
  prize: "R$ 3.000",
  level: "Todos os n?veis",
  status: "full",
  organizer: "Arena Litoral",
  registrationFee: "R$ 60,00",
  format: "Fase de grupos e mata-mata",
  description:
   "Evento em duplas para quem busca uma competição organizada, com avaliação dos jogos e classificação por campanha.",
  schedule: ["07:30 - Check-in", "08:30 - Fase de grupos", "13:30 - Quartas de final", "16:30 - Final"],
  rules: ["Duplas fixas durante todo o torneio", "Sets ate 21 pontos", "Troca de lado a cada 7 pontos"],
  perks: ["Medalhas para finalistas", "Registro de desempenho", "Fotos do evento"],
 },
 {
  id: 3,
  name: "Copa de Futebol Society",
  sport: "Futebol",
  date: "2026-05-25",
  location: "Arena Morumbi",
  participants: 8,
  maxParticipants: 16,
  prize: "R$ 10.000",
  level: "Avan?ado",
  status: "open",
  organizer: "Arena Morumbi",
  registrationFee: "R$ 150,00 por time",
  format: "Grupos com semifinal e final",
  description:
   "Campeonato para times formados na plataforma, com tabela acompanhada pelo app e atualizacao de resultados apos cada partida.",
  schedule: ["18:00 - Chegada dos times", "19:00 - Rodada 1", "21:00 - Semifinais", "22:30 - Final"],
  rules: ["Times de 7 jogadores", "Dois tempos de 20 minutos", "Cartao vermelho suspende a proxima partida"],
  perks: ["Premiação para o time campeão", "Ranking por equipe", "Destaques individuais"],
 },
];

export function readRegisteredTournamentIds() {
 if (typeof window === "undefined") return [];

 try {
  const stored = window.localStorage.getItem(REGISTERED_TOURNAMENTS_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "number") : [];
 } catch {
  return [];
 }
}

export function writeRegisteredTournamentIds(ids: number[]) {
 if (typeof window === "undefined") return;
 window.localStorage.setItem(REGISTERED_TOURNAMENTS_KEY, JSON.stringify(ids));
}
