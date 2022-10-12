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
      {categories.map((item) => {
        const filterStyle =
          selectedFilter === item
            ? "filter-items selected-filter"
            : "filter-items";
        return (
          <li key={item} className={filterStyle}>
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
