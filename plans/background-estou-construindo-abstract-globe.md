# Plano: 6 Novas Features — Maps/WhatsApp, Ícones, Grupos vs Grupos, Rankings, Gamificação, Awards

## Contexto
App de esportes já tem login dual (Arena/Jogador), swipe, match, chat, grupos e jogos. Esta sprint adiciona 6 novas features.

---

## Feature 1 — Maps + WhatsApp ao marcar partida

**Arquivos:** `src/app/components/CreateMatch.tsx`, `src/app/components/Agenda.tsx`

Quando o jogador confirma uma partida, exibir um **modal de confirmação** com:
- Mapa estático via link do Google Maps (abre o app Maps no celular) com o endereço da arena parceira
- Informações da arena: nome, endereço, telefone, horário
- Botão **"Abrir no Maps"** → `window.open('https://maps.google.com/?q=ENDERECO', '_blank')`
- Botão **"Avisar Arena pelo WhatsApp"** → `window.open('https://wa.me/55TELEFONE?text=MENSAGEM_AUTOMATICA', '_blank')`

Mensagem automática pré-preenchida no WhatsApp:
```
Olá, Arena Esportiva Central! 🎾
Quero agendar uma partida:
• Esporte: Tênis
• Data: 18/06 às 15h
• Jogadores: João Silva vs Pedro Costa
Podem confirmar disponibilidade?
```

Dados mockados de arenas parceiras (objeto `PARTNER_ARENAS` em `CreateMatch.tsx`):
```ts
{ id: 'arena1', name: 'Arena Esportiva Central', address: 'R. das Palmeiras, 123 - SP', phone: '5511987654321', mapsUrl: 'https://maps.google.com/?q=Arena+Esportiva+Central+São+Paulo' }
```

O modal aparece **após** o submit do CreateMatch, antes de navegar para `/agenda`.

---

## Feature 2 — Ícone Explorar: Flame → Search (lupa)

**Arquivo:** `src/app/components/Navigation.tsx`

- Jogador: trocar `Flame` por `Search` no tab "Explorar"
- Arena: no tab "Meus Jogos" (Gamepad2), **adicionar tab "Explorar"** com ícone `Search` → `/swipe` para arenas descobrirem jogadores interessados em seus jogos

Nav de Arena atualizado (5 tabs):
- Explorar (Search) → /swipe
- Meus Jogos (Gamepad2) → /my-games
- Grupos (Users) → /my-groups
- Agenda (Calendar) → /agenda
- Perfil (Building2) → /profile

---

## Feature 3 — Criar Partida entre Grupos (dentro do Chat de Grupo)

**Arquivos:** `src/app/components/Chat.tsx`, `src/app/components/CreateMatch.tsx`

Dentro do Chat quando o contexto é **grupo** (IDs 2 e 4), adicionar botão **"Desafiar Grupo"** na área de ação (ao lado de "Marcar Partida").

Ao clicar → navega para `/create-match?type=group-vs-group&groupId=X`

No `CreateMatch.tsx`, detectar `type=group-vs-group` e mostrar:
- Seletor de **grupo adversário** (lista mockada de outros grupos disponíveis)
- Campos: esporte, data, horário, local, modo (amistoso/competitivo)
- Ao confirmar → exibir modal Maps+WhatsApp (Feature 1) endereçado à arena escolhida

---

## Feature 4 — Rankings de Grupos e Jogos

**Arquivo:** `src/app/components/Rankings.tsx`

Adicionar duas novas abas ao componente de Rankings existente:

**Aba "Grupos":**
- Interface `GroupRanking`: position, groupName, sport, members, wins, points, level
- Top 3 com medalhas, destaque visual igual ao ranking de jogadores
- Coluna: Pontos | Vitórias | Membros

**Aba "Jogos":**
- Interface `GameRanking`: position, gameName, sport, location, totalPlayers, completedGames, rating
- Ranking de jogos/arenas com mais partidas realizadas
- Coluna: Partidas | Jogadores | Avaliação

Estrutura de abas: `['Jogadores', 'Grupos', 'Jogos']` — reutilizar o sistema de pill-tabs existente.

---

## Feature 5 — Gamificação estilo Duolingo

**Arquivo novo:** `src/app/components/Gamification.tsx`
**Rota:** `/gamification`
**Nav do Jogador:** substituir tab "Torneios" por "Liga" (Zap icon) ou adicionar via Profile

Tela com:
- **Streak de uso** (sequência de dias ativos): contador + chama animada + mensagem motivacional
- **Liga atual**: Bronze → Prata → Ouro → Diamante → Elite
  - Barra de progresso para próxima liga
  - Posição no ranking semanal da liga (top 10 usuários)
- **Conquistas desbloqueáveis** (badges): "Primeira Partida", "5 Dias Seguidos", "10 Matches", "Campeão da Semana", etc.
- **XP system**: ações que dão XP — fazer login (+5), marcar partida (+20), completar partida (+50), dar rating (+10), criar grupo (+30)
- Leaderboard da liga: lista dos top 10 com avatar, nome, XP da semana

Rota adicionada em `App.tsx`: `<Route path="/gamification" element={<Gamification />} />`
Nav jogador: `Torneios (Trophy) → /tournaments` mantido, e acesso via atalho no Profile ou nova tab substituindo Torneios.

---

## Feature 6 — Awards Anuais estilo Spotify Wrapped

**Arquivo novo:** `src/app/components/Awards.tsx`
**Rota:** `/awards`
**Acesso:** botão no Profile ("Meu Ano no SportsMatch 🏆") e notificação anual

Tela animada com slides/cards revelando estatísticas do ano:
- **"Você jogou X partidas em 2025"** — número grande centralizado
- **"Seu esporte favorito foi..."** — com ícone e porcentagem
- **"Seu parceiro mais frequente foi..."** — avatar + nome
- **"Sua melhor fase: mês com mais vitórias"**
- **"Você fez X novos amigos via SportsMatch"** (total de matches)
- **"Sua conquista do ano:"** — badge especial desbloqueada (ex: "Atleta Dedicado 2025")
- Slide final: resumo visual compartilhável (botão "Compartilhar meu Ano")

Navegação entre slides: swipe horizontal ou botões próximo/anterior.
Dados: mockados para demonstração (ano 2025, valores fixos).

---

## Arquivos Modificados / Criados

| Arquivo | Ação |
|---|---|
| `src/app/components/CreateMatch.tsx` | Modal Maps+WhatsApp pós-confirmação; suporte group-vs-group |
| `src/app/components/Chat.tsx` | Botão "Desafiar Grupo" no contexto de grupo |
| `src/app/components/Navigation.tsx` | Search em vez de Flame; Arena com 5 tabs |
| `src/app/components/Rankings.tsx` | Novas abas Grupos e Jogos |
| `src/app/components/Gamification.tsx` | **NOVO** — streak, liga, XP, conquistas |
| `src/app/components/Awards.tsx` | **NOVO** — Spotify Wrapped anual |
| `src/app/App.tsx` | Adicionar rotas `/gamification` e `/awards` |

---

## Verificação

1. CreateMatch → confirmar partida → ver modal com mapa e botão WhatsApp → clicar abre WhatsApp com mensagem pré-preenchida
2. Chat de grupo → ver botão "Desafiar Grupo" → clicar → CreateMatch em modo grupo-vs-grupo
3. Navigation → Explorar com ícone de lupa para jogador e arena
4. Rankings → abas Grupos e Jogos funcionando com dados mockados
5. `/gamification` → streak, liga, XP visíveis; conquistas desbloqueadas
6. Profile → botão "Meu Ano" → `/awards` → slides animados com stats do ano
