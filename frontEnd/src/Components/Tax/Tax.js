import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from './TaxForm';
import TaxItem from '../IncomeItem/TaxItem';

function Tax() {
  const {
    addTax,
    taxes,
    getTaxes,
    deleteTax,
    totalTaxes,
    categoryIncome,
    categoryTaxes,
  } = useGlobalContext();

  useEffect(() => {
    getTaxes();
  }, []);
  return (
    <TaxStyled>
      <InnerLayout>
        <h1>Taxes</h1>
        <h2 className="total-tax">
          {' '}
          Total Tax: <span>৳‎{totalTaxes()}</span>
        </h2>
        <h2 className="total-tax">
          Salary Tax:{' '}
          <span>
            {categoryTaxes('salary')}% , ৳‎
            {(categoryIncome('salary') * categoryTaxes('salary')) / 100}
          </span>
        </h2>
        <h2 className="total-tax">
          Youtube Tax:{' '}
          <span>
            {categoryTaxes('youtube')}% , ৳‎
            {(categoryIncome('youtube') * categoryTaxes('youtube')) / 100}
          </span>
        </h2>
        <h2 className="total-tax">
          Freelancing Tax:{' '}
          <span>
            {categoryTaxes('freelancing')}% , ৳‎
            {(categoryIncome('freelancing') * categoryTaxes('freelancing')) /
              100}
          </span>
        </h2>
        <h2 className="total-tax">
          Investments Tax:{' '}
          <span>
            {categoryTaxes('investments')}% , ৳‎
            {(categoryIncome('investments') * categoryTaxes('investments')) /
              100}
          </span>
        </h2>
        <h2 className="total-tax">
          Stocks Tax:{' '}
          <span>
            {categoryTaxes('stocks')}% , ৳‎
            {(categoryIncome('stocks') * categoryTaxes('stocks')) / 100}
          </span>
        </h2>
        <div className="tax-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="taxes">
            {taxes.map((tax) => {
              const { _id, title, amount, date, category, description, type } =
                tax;
              return (
                <TaxItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteTax}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </TaxStyled>
  );
}

const TaxStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-tax {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .tax-content {
    display: flex;
    gap: 2rem;
    .taxes {
      flex: 1;
    }
  }
`;

export default Tax;
