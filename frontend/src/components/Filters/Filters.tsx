import "./Filters.css";

export enum Filter {
  ALL = "ALL",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

interface FilterProps {
  categories: Filter[];
  selectedFilter: Filter;
  changeFilter: (filter: Filter) => void;
}

export function Filters({
  selectedFilter,
  categories,
  changeFilter,
}: FilterProps) {
  return (
    <ul className="filter-list">
      {categories.map((item: Filter) => {
        return selectedFilter === item ? (
          <li key={item} className="filter-items selected-filter">
            <button
              className="filter-buttons"
              onClick={() => changeFilter(item)}
            >
              {item}
            </button>
          </li>
        ) : (
          <li key={item} className="filter-items">
            <button
              className="filter-buttons"
              onClick={() => changeFilter(item)}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
