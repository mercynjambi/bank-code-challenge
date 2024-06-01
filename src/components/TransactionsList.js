import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, handleDelete, handleSort }) {
  const list = transactions.map((item) => {
    return (
      <Transaction
        key={item.id}
        id={item.id}
        date={item.date}
        description={item.description}
        category={item.category}
        amount={item.amount}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <table className="ui celled striped padded table">
      <thead>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th onClick={() => handleSort("description")}>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th onClick={() => handleSort("category")}>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Actions</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </table>
  );
}

export default TransactionsList;

