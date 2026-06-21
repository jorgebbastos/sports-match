import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User } from 'lucide-react';

interface SignupProps {
 onSignup: () => void;
}

export default function Signup({ onSignup }: SignupProps) {
 const navigate = useNavigate();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleSignup = (e: React.FormEvent) => {
  e.preventDefault();
  onSignup();
  navigate('/profile-setup');
 };

 return (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
   <div className="w-full max-w-md">
    <div className="text-center mb-8">
     <div className="w-20 h-20 bg-[#12d875] rounded-full mx-auto mb-4 flex items-center justify-center">
      <User size={40} className="text-white" />
     </div>
     <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
     <p className="text-gray-600">Junte-se à comunidade esportiva</p>
    </div>

    <form onSubmit={handleSignup} className="space-y-4">
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
      <div className="relative">
       <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        placeholder="Seu nome"
        required
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
      <div className="relative">
       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        placeholder="seu@email.com"
        required
       />
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
      <div className="relative">
       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
       <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12d875] focus:border-transparent"
        placeholder=""
        required
       />
      </div>
     </div>

     <button
      type="submit"
      className="w-full bg-[#12d875] text-white py-3 rounded-md font-semibold hover:bg-[#10c26a] transition-colors"
     >
      Criar Conta
     </button>
    </form>

    <div className="mt-6 text-center">
     <button
      onClick={() => navigate('/login')}
      className="text-[#12d875] font-medium hover:underline"
     >
      Já tem conta? Entrar
     </button>
    </div>
   </div>
  </div>
 );
}
