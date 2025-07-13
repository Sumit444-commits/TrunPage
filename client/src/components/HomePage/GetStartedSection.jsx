// src/components/GetStartedSection.jsx
import React, { useEffect, useRef } from "react";
import { useStore } from "../../store/AppContext";

// Sample book data
const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://m.media-amazon.com/images/I/41-cd1GbTTL.jpg",
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    image: "https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg",
  },
];

const GetStartedSection = () => {
    const {books} = useStore()
  const scrollRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        // Reset scroll if near end
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 2500); // Scroll every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Get Started with <span className="text-indigo-600">TurnPage</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Explore some of the most impactful reads to kickstart your journey.
        </p>

        {/* Scrolling Card Section */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-1"
        >
          {books.map((book) => (
            <div
              key={book._id}
              className="flex-shrink-0 w-60 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 transition-transform hover:scale-105"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-72 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-500">Title: {book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
