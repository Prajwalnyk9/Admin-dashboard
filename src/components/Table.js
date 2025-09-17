
import React from "react";

function Table({ className = '', children, ...props }) {
  return (
    <table className={`users-table ${className}`} {...props}>
      {children}
    </table>
  );
}

export default Table;
