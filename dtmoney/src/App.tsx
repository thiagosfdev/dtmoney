import { useState } from 'react';

import { GlobalStyle } from "./styles/global";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from './components/NewTransactionModal';

export function App() {

  const [isNewTransactionaModalOpen, setIsNewTransactionaModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionaModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionaModalOpen(false);
  }

  return (
    <>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionaModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}
