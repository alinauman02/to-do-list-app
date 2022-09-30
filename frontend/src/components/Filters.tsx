export type Category = "ALL" | "PENDING" | "COMPLETED";

interface filtersProps {
  categories: Category[];
  selectedFilter: Category;
  changeFilter: (filter: Category) => void;
}

export default function Filters({
  selectedFilter,
  categories,
  changeFilter,
}: filtersProps) {
  return (
    <ul className="filter-list">
      {categories.map((item: "ALL" | "PENDING" | "COMPLETED") => {
        return selectedFilter === item ? (
          <li
            key={item}
            className="category-items selected-filter"
            onClick={() => changeFilter(item)}
          >
            {item}
          </li>
        ) : (
          <li
            key={item}
            className="category-items"
            onClick={() => changeFilter(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
