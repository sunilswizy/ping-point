import "./search.styles.css";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="search-bar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="search-bar-icon"
      >
        <path
          fillRule="evenodd"
          d="M11 4a7 7 0 105.292 12.292l4.707 4.706a1 1 0 001.414-1.414l-4.706-4.707A7 7 0 0011 4zm-5 7a5 5 0 1110 0 5 5 0 01-10 0z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
