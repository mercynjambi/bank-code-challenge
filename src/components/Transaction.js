import React from "react";

function Transaction({ id, date, description, category, amount, handleDelete }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button className="ui button" onClick={() => handleDelete(id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;
