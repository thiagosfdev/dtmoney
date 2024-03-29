import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

Modal.setAppElement('#root');

interface NewTranscationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewTransactionModal({ isOpen, onRequestClose }: NewTranscationModalProps) {

  const { createTransaction } = useTransactions();

  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      amount,
      category,
      title,
      type
    });

    setAmount(0);
    setCategory('');
    setTitle('');
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-moda-content"
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="fechar modal" />
      </button>

      <Container
        onSubmit={handleCreateNewTransaction}
      >
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={type === `deposit`}
            activeColor="green"
            type="button"
            onClick={() => { setType('deposit') }}
          >
            <img src={incomeImg} alt="entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            isActive={type === `withdraw`}
            activeColor="red"
            type="button"
            onClick={() => { setType('withdraw') }}
          >
            <img src={outcomeImg} alt="saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}
