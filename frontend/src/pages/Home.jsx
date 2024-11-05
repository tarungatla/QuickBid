import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays, auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen justify-center">
        <div className="mb-8">
          <h1 className="text-[#111] text-3xl font-extrabold mb-1 sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
            Transparent Auctions
          </h1>
          <h1 className="text-[#362bd6] text-3xl font-extrabold sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
            Be The Winner
          </h1>
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#362bd6] font-semibold hover:bg-[#362bd6] rounded-md px-8 py-3 text-white text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-[#DECCBE] bg-transparent border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-[#8890fd] font-semibold text-lg rounded-md px-8 py-3 shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-8">
          <h3 className="text-[#111] text-2xl font-semibold mb-2 sm:text-3xl">
            How it works
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element) => (
              <div
                key={element.title}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 md:w-[48%] lg:w-[47%] 2xl:w-[24%] transform hover:-translate-y-1"
              >
                <h5 className="font-semibold text-lg text-gray-800">{element.title}</h5>
                <p className="text-gray-600 text-sm">{element.description}</p>
              </div>
            ))}
          </div>
        </div>

        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>

    </>
  );
};

export default Home;