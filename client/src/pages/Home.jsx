import { Link } from "react-router-dom";
import { FaBookOpen, FaUserFriends, FaSearch } from "react-icons/fa";
import { useStore } from "../store/AppContext";
import HeroSection from "../components/HomePage/HeroSection";
import GetStartedSection from "../components/HomePage/GetStartedSection";
import ReviewSection from "../components/HomePage/ReviewsSection";
import AboutSection from "../components/HomePage/AboutSection";
import WhyTurnPage from "../components/HomePage/WhyTrunPage";

const Home = () => {
  const { isLoggedIn, books } = useStore();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}

      <HeroSection />

      {/* Scrolling Card Section */}
      <GetStartedSection />

      {/* Review Cards Grid */}

      <ReviewSection />

      <AboutSection />
    </div>
  );
};

export default Home;
