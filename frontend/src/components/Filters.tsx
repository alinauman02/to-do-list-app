import React from "react";

interface filtersProps {
  categories: string[];
  filter: number;
  loadTodos: (check?: number, signal?: AbortSignal) => void;
}

export default function Filters({
  filter,
  categories,
  loadTodos,
}: filtersProps) {
  const filterLoadTodos = (check: string): void => {
    if (check === "ALL") loadTodos(1);
    else if (check === "PENDING") loadTodos(2);
    else loadTodos(3);
  };
  return (
    <ul className="filter-list">
      {categories.map((item, index) => (
        <li className="category-items">{item}</li>
        {
          if(index===file)
        }
      ))}
    </ul>
  );
}
