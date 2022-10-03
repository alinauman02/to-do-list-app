export enum Category {
  ALL = "ALL",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

interface FilterProps {
  categories: Category[];
  selectedFilter: Category;
  changeFilter: (filter: Category) => void;
}

export default function Filters({
  selectedFilter,
  categories,
  changeFilter,
}: FilterProps) {
  return (
    <ul className="filter-list">
      {categories.map((item: Category) => {
        return selectedFilter === item ? (
          <li key={item} className="category-items selected-filter">
            <button
              className="category-buttons"
              onClick={() => changeFilter(item)}
            >
              {item}
            </button>
          </li>
        ) : (
          <li key={item} className="category-items">
            <button
              className="category-buttons"
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
