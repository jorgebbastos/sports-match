import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState, createContext, useContext } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfileSetup from './components/ProfileSetup';
import SwipeScreen from './components/SwipeScreen';
import Matches from './components/Matches';
import Chat from './components/Chat';
import CreateMatch from './components/CreateMatch';
import CreateGroup from './components/CreateGroup';
import CreateGame from './components/CreateGame';
import MyGroups from './components/MyGroups';
import MyGames from './components/MyGames';
import Agenda from './components/Agenda';
import Rankings from './components/Rankings';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import MatchResult from './components/MatchResult';
import RatePlayer from './components/RatePlayer';
import Tournaments from './components/Tournaments';
import TournamentDetails from './components/TournamentDetails';
import PremiumPlan from './components/PremiumPlan';
import Notifications from './components/Notifications';
import RescheduleMatch from './components/RescheduleMatch';
import CancelMatch from './components/CancelMatch';
import MatchDetails from './components/MatchDetails';
import PlayerHistory from './components/PlayerHistory';
import Gamification from './components/Gamification';
import Awards from './components/Awards';
import Navigation from './components/Navigation';

export type UserType = 'player' | 'arena';

export interface MockProfile {
 id: string;
 name: string;
 type: UserType;
 sport?: string;
 level?: string;
 location?: string;
 phone?: string;
 courts?: string[];
 hours?: string;
 description?: string;
}

export const MOCK_PROFILES: MockProfile[] = [
 {
  id: 'player1',
  name: 'João Silva',
  type: 'player',
  sport: 'Tênis / Padel',
  level: 'Intermediário',
  location: 'São Paulo, SP',
  description: 'Jogador de tênis e padel há 5 anos. Sempre buscando evoluir e conhecer novos parceiros de jogo!',
 },
 {
  id: 'arena1',
  name: 'Arena Esportiva Central',
  type: 'arena',
  sport: 'Tênis, Padel, Futebol',
  location: 'São Paulo, SP',
  phone: '(11) 98765-4321',
  courts: ['4 quadras de Tênis', '2 quadras de Padel', '1 campo de Futebol Society'],
  hours: 'SegSex: 07h23h | SábDom: 07h22h',
  description: 'Estrutura completa para seus esportes favoritos. Venha jogar conosco!',
 },
];

interface UserContextValue {
 userType: UserType;
 setUserType: (t: UserType) => void;
 currentProfile: MockProfile;
 setCurrentProfile: (p: MockProfile) => void;
}

export const UserContext = createContext<UserContextValue>({
 userType: 'player',
 setUserType: () => {},
 currentProfile: MOCK_PROFILES[0],
 setCurrentProfile: () => {},
});

export function useUserType() {
 return useContext(UserContext);
}

export default function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [hasProfile, setHasProfile] = useState(true);
 const [userType, setUserType] = useState<UserType>('player');
 const [currentProfile, setCurrentProfile] = useState<MockProfile>(MOCK_PROFILES[0]);

 const handleLogin = (profile: MockProfile) => {
  setCurrentProfile(profile);
  setUserType(profile.type);
  setIsAuthenticated(true);
 };

 return (
  <UserContext.Provider value={{ userType, setUserType, currentProfile, setCurrentProfile }}>
   <BrowserRouter>
    <div className="size-full bg-white">
     <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
      <Route
       path="/profile-setup"
       element={<ProfileSetup onComplete={() => setHasProfile(true)} />}
      />
      <Route path="/swipe" element={<SwipeScreen />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/chat/:matchId" element={<Chat />} />
      <Route path="/create-match" element={<CreateMatch />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="/create-game" element={<CreateGame />} />
      <Route path="/my-groups" element={<MyGroups />} />
      <Route path="/my-games" element={<MyGames />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/rankings" element={<Rankings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/match-result/:matchId" element={<MatchResult />} />
      <Route path="/rate-player/:matchId" element={<RatePlayer />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:tournamentId" element={<TournamentDetails />} />
      <Route path="/premium" element={<PremiumPlan />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/reschedule-match" element={<RescheduleMatch />} />
      <Route path="/cancel-match" element={<CancelMatch />} />
      <Route path="/match-details" element={<MatchDetails />} />
      <Route path="/player-history" element={<PlayerHistory />} />
      <Route path="/gamification" element={<Gamification />} />
      <Route path="/awards" element={<Awards />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
     </Routes>
     <Navigation />
    </div>
   </BrowserRouter>
  </UserContext.Provider>
 );
}


