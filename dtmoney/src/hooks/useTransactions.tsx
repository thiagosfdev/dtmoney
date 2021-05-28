import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface Transaction {
  amount: number;
  category: string;
  createdAt: string;
  id: number;
  title: string;
  type: string;
};

type TransactionInput = Omit<Transaction, 'createdAt' | 'id'>; // herda tudo menos os informados
// type TransactionInput = Pick<Transaction, 'amount' | 'category' | 'title' | 'type'>; // herda apenas os informados

interface TransactionsProviderProps {
  children: ReactNode; // aceitar qualquer tipo de conteúdo válido para o React
};

interface TransactionsContextData {
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  transactions: Transaction[];
};

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData); // força o objeto vazio a ter uma tipagem

export function TransactionsProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );

}

export function useTransactions() {
  return useContext(TransactionsContext);
}
