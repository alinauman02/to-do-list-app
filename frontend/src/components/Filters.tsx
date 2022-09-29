import React from "react";

interface filtersProps {
  categories: string[];
  loadTodos: (check?: number) => void;
}

export default function Filters({ categories, loadTodos }: filtersProps) {
  const filterLoadTodos = (check: string): void => {
    if (check === "ALL") loadTodos(1);
    else if (check === "PENDING") loadTodos(2);
    else loadTodos(3);
  };
  return (
    <ul className="filter-list">
      {categories.map((filter: string) => (
        <li
          className="category-items"
          key={filter}
          onClick={() => filterLoadTodos(filter)}
        >
          {filter}
        </li>
      ))}
    </ul>
  );
}
