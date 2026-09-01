import { useLocation, useNavigate } from 'react-router';
import { Search, MessageCircle, Calendar, User, Building2 } from 'lucide-react';
import { useUserType } from '../App';

export default function Navigation() {
 const location = useLocation();
 const navigate = useNavigate();
 const { userType } = useUserType();

 const playerNavItems = [
  { path: '/swipe', icon: Search, label: 'Explorar' },
  { path: '/matches', icon: MessageCircle, label: 'Conversas' },
  { path: '/agenda', icon: Calendar, label: 'Agenda' },
  { path: '/profile', icon: User, label: 'Perfil' },
 ];

 const arenaNavItems = [
  { path: '/my-games', icon: Calendar, label: 'Meus jogos' },
  { path: '/agenda', icon: Calendar, label: 'Agenda' },
  { path: '/profile', icon: Building2, label: 'Perfil' },
 ];

 const navItems = userType === 'arena' ? arenaNavItems : playerNavItems;
 const accentColor = userType === 'arena' ? '#12d875' : '#12d875';

 const hideNavPaths = ['/login', '/signup', '/profile-setup', '/chat', '/create-match', '/create-game', '/user', '/match-result', '/rate-player', '/notifications', '/reschedule-match', '/cancel-match', '/match-details'];
 const shouldHide = hideNavPaths.some(path => location.pathname.startsWith(path));

 if (shouldHide) return null;

 return (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
   <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
    {navItems.map(({ path, icon: Icon, label }) => {
     const isActive = location.pathname === path;
     return (
      <button
       key={path}
       onClick={() => navigate(path)}
       className="flex flex-col items-center justify-center flex-1 h-full transition-colors relative"
      >
       {isActive && (
        <span
         className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
         style={{ backgroundColor: accentColor }}
        />
       )}
       <Icon
        size={22}
        strokeWidth={isActive ? 2.2 : 1.8}
        style={{ color: isActive ? accentColor : '#9ca3af' }}
       />
       <span
        className="text-xs mt-1"
        style={{ color: isActive ? accentColor : '#9ca3af', fontWeight: isActive ? 600 : 400 }}
       >
        {label}
       </span>
      </button>
     );
    })}
   </div>
  </nav>
 );
}
