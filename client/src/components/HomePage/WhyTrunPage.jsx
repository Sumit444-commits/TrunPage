
import React from "react";
import { FaBook, FaUsers, FaChartLine, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaBook className="text-indigo-600 text-3xl mb-4" />,
    title: "Curated Library",
    description: "Get access to thoughtfully selected books across every genre, handpicked by readers and editors.",
  },
  {
    icon: <FaUsers className="text-indigo-600 text-3xl mb-4" />,
    title: "Community-Powered",
    description: "Read reviews, build reading lists, and connect with fellow readers who share your interests.",
  },
  {
    icon: <FaChartLine className="text-indigo-600 text-3xl mb-4" />,
    title: "Track Your Progress",
    description: "Keep a smart log of books you've read, what’s next, and where you left off — all in one place.",
  },
  {
    icon: <FaMobileAlt className="text-indigo-600 text-3xl mb-4" />,
    title: "Access Anywhere",
    description: "Mobile-first design ensures TurnPage works great on every device — read, review, and discover on the go.",
  },
];

const WhyTurnPage = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Why Choose <span className="text-indigo-600">TurnPage?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We don’t just give you books — we help you build your reading lifestyle.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              {feature.icon}
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTurnPage;
