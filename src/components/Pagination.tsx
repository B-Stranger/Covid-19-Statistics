import React from "react";

const Pagination: React.FC<any> = ({ linesPerPage, totalLines }): any => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLines / linesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
