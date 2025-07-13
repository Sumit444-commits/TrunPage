import { NavLink } from "react-router-dom";
import { useStore } from "../store/AppContext";
import { useState, useEffect } from "react";

const about = [
  {
    title: "📚 Intelligent Discovery",
    description:
      "Get curated book suggestions based on your reading preferences, habits, and mood — not algorithms alone.",
  },
  {
    title: "🗂️ Personalized Library",
    description:
      "Create collections, track your reads, and organize by theme, genre, or emotion.",
  },
  {
    title: "📖 Minimal Reading Tools",
    description:
      "No distractions. Just you, the book, and gentle guidance to help you stay focused and engaged.",
  },
  {
    title: "🌍 Community Input",
    description:
      "TurnPage grows with its readers — powered by your feedback, reviews, and shelves.",
  },
  {
    title: "📱 Mobile-Friendly",
    description:
      "Use TurnPage from any device, anywhere. It's built for readers on the go.",
  },
  {
    title: "🎯 Reader-First Design",
    description:
      "Built with empathy for students, professionals, and lifelong learners who love a clean UI.",
  },
];

const About = () => {
  const { user } = useStore();
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    if (user && userData) {
      setUserData(false);
    }
  }, [user, userData]);

  return (
    <main className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero / Welcome */}
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-4">
            About TurnPage
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome{user ? `, ${user.username}` : ""}! At TurnPage, we help you
            unlock the full power of reading — smarter discovery, personal
            shelves, and stories that stick with you.
          </p>
        </section>

        {/* Who We Are Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="/images/about.jpg"
            alt="Bookshelf and reading"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              TurnPage is more than just a digital bookshelf — it's a platform
              designed to inspire, organize, and personalize your reading
              journey. Our mission is to connect curious minds with powerful
              stories that ignite change and spark growth.
            </p>
            <p className="mt-6 text-gray-500 text-sm">
              We bring books to life with modern tools that help readers stay
              engaged, track progress, and explore curated recommendations
              without the overwhelm.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-gray-50 rounded-xl p-10 sm:p-12 shadow-sm text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">
            What Makes TurnPage Different?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left text-gray-700">
            {about.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2 text-indigo-600">
                  {feature.title}
                </h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center">
          <p className="text-gray-700 text-lg mb-4">
            Join thousands of readers turning pages that matter. Ready to start?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink to="/books">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Browse Our Books
              </button>
            </NavLink>
            <NavLink to="/contact">
              <button className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">
                Contact the Team
              </button>
            </NavLink>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
