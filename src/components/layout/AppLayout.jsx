import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ChatBot from '../shared/ChatBot';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <ChatBot />
    </div>
  );
}