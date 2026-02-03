import React from 'react';
import ReactDOM from 'react-dom/client';
import "../../assets/style.css"
import { ConfForm } from './components/ConfForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='w-100 max-w-md space-y-2 p-4 bg-gray-800 text-gray-50'>

      <h2 className='text-3xl font-bold text-gray-100 text-center'>SmartForm Configure</h2>
      <p className='text-center text-sm text-gray-300'>Configure your form settings and preferences</p>
      <hr  className='my-4'/>
      <ConfForm />
      <p className='text-center text-xs text-gray-400 mt-4 pt-4 border-t border-gray-700'>
        © {new Date().getFullYear() > 2025 ? `2025-${new Date().getFullYear()}` : new Date().getFullYear()} SmartForm. All rights reserved.
      </p>
    </div>

  </React.StrictMode>,
);
