import React from 'react';
import ReactDOM from 'react-dom/client';
import "@/assets/style.css";
import ConfigForm from '@/components/ConfigForm';
import Links from '@/components/Links';
import { CircleUser, Github, Linkedin, Twitter } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
    <div className='w-100 max-w-md h-auto space-y-2 p-4 bg-gray-800 text-gray-50'>

      <h2 className='text-3xl font-extrabold text-center bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>SmartForm Configure</h2>
      <p className='text-center text-sm text-gray-300'>Configure your form settings and preferences</p>
      <hr className='my-4' />
      {/* Configure form  */}
      <ConfigForm />
      {/* links  */}
      <Links />
      {/* footer */}
      <p className='text-center text-xs text-gray-400 mt-2'>
        © {new Date().getFullYear() > 2025 ? `2025-${new Date().getFullYear()}` : new Date().getFullYear()} SmartForm. All rights reserved.
      </p>
    </div>
    <Toaster />
    </>
  </React.StrictMode>,
);
