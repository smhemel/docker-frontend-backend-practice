import React from 'react';
import UserForm from './components/UserForm';
import PdfForm from './components/PdfForm';
import CacheForm from './components/CacheForm';

const App = () => {
  return (
    <div>
      <h1>Microservice App</h1>
      <UserForm />
      <PdfForm />
      <CacheForm />
    </div>
  );
};

export default App;
