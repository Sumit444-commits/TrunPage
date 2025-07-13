// src/components/ReviewSection.jsx
import React from "react";

// Dummy data
const reviews = [
  {
    id: 1,
    name: "Ayesha R.",
    rating: 5,
    text: "TurnPage helped me discover life-changing books I would've never found. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Omar K.",
    rating: 4,
    text: "A clean and organized reading experience. Love the curated recommendations.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 3,
    name: "Sara B.",
    rating: 5,
    text: "I use TurnPage daily. It's the best place to build a personal reading habit!",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    id: 4,
    name: "Ali M.",
    rating: 4,
    text: "The UI is beautiful and the library is growing fast. Can’t wait to see what’s next.",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          What Readers Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Hear from people who have transformed their reading with TurnPage.
        </p>

        {/* Review Cards Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.693a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.294a1 1 0 00-.364 1.118l1.2 3.693c.3.921-.755 1.688-1.54 1.118l-3.158-2.294a1 1 0 00-1.175 0L5.47 17.65c-.784.57-1.838-.197-1.54-1.118l1.2-3.693a1 1 0 00-.364-1.118L1.607 9.12c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.2-3.693z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
