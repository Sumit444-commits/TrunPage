import React, { useState, useMemo } from "react";
import BookCard from "../components/UI/BookCard";
import { useStore } from "../store/AppContext";
import SearchInput from "../components/UI/SearchInput";
import AnimatedTabs from "../components/UI/AnimatedTabs";

const Books = () => {
  const { books } = useStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(null); // "asc" | "desc"

  // Filtering logic
  const filterSearch = (book) =>
    search ? book.name.toLowerCase().includes(search.toLowerCase()) : true;

  const filterCategory = (book) => {
    if (filter === "All") return true;
    if (filter === "Free") return book.price === 0;
    return book.price > 0;
  };

  // Combine filter & sort using useMemo
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(
      (book) => filterSearch(book) && filterCategory(book)
    );

    if (sort === "asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [books, search, filter, sort]);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          📚 Browse Books
        </h1>
        <p className="mt-2 text-gray-500 text-base">
          Discover books, filter by price, and sort them with ease.
        </p>
      </div>

      {/* Controls: Search + Filters */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10">
        {/* Search */}
        <div className="w-full md:w-1/2">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
          />
        </div>

        {/* Filter Buttons */}
        <AnimatedTabs
          options={["All", "Free", "Paid"]}
          selected={filter}
          onSelect={setFilter}
          color="bg-indigo-600"
        />


        {/* Sort Buttons */}
    <AnimatedTabs
  options={["A–Z", "Z–A"]}
  selected={sort === "asc" ? "A–Z" : sort === "desc" ? "Z–A" : ""}
  onSelect={(value) => setSort(value === "A–Z" ? "asc" : "desc")}
  color="bg-green-600"
/>

    </div>


      {/* Books Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredAndSortedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg py-20">
            No books found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
