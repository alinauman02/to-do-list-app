export type Category = "ALL" | "PENDING" | "COMPLETED";

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
    <div className="filter-list">
      {categories.map((item: "ALL" | "PENDING" | "COMPLETED") => {
        return selectedFilter === item ? (
          <button
            key={item}
            className="category-items selected-filter"
            onClick={() => changeFilter(item)}
          >
            {item}
          </button>
        ) : (
          <button
            key={item}
            className="category-items"
            onClick={() => changeFilter(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
