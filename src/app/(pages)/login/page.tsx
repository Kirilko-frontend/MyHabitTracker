'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/habits',
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          className="p-2 rounded text-black bg-white"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-2 rounded text-black bg-white"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 p-2 rounded text-white">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
