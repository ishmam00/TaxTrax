import React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';

function Transactions() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  return (
    <TransactionsStyled>
      <InnerLayout>
        <h1>Transactions</h1>
        {history.map((item) => {
          const { _id, title, amount, type } = item;
          return (
            <div key={_id} className="history-item">
              <p
                style={{
                  color: type === 'expense' ? 'red' : 'var(--color-green)',
                }}
              >
                {title}
              </p>

              <p
                style={{
                  color: type === 'expense' ? 'red' : 'var(--color-green)',
                }}
              >
                {type === 'expense'
                  ? `-${amount <= 0 ? 0 : amount}`
                  : `+${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })}
      </InnerLayout>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  gap: 2rem;
  h1 {
    margin-bottom: 1rem;
  }
  .history-item {
    display: flex;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem 5rem;
    border-radius: 20px;
    font-size: 2rem;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export default Transactions;
