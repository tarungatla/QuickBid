import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="my-8">
      <h3 className="text-[#111] text-2xl font-bold mb-4 md:text-3xl lg:text-4xl">
        Auctions For Today
      </h3>
      <div className="flex flex-wrap gap-6">
        <div className="bg-[#161613] w-full p-6 rounded-lg flex flex-col justify-between items-start lg:flex-1 lg:h-auto lg:p-8 2xl:basis-64 shadow-lg">
          <span className="rounded-full bg-[#8890fd] text-white w-fit p-4 flex items-center justify-center shadow-md">
            <RiAuctionFill size={28} />
          </span>
          <div className="mt-4">
            <h3 className="text-[#8890fd] text-3xl font-bold mb-1 lg:text-4xl">
              Auctions For
            </h3>
            <h3 className="text-white text-3xl font-bold lg:text-4xl">
              Today
            </h3>
          </div>
        </div>

        {/* Auction Items */}
        {auctionsStartingToday.map((element, index) => (
          <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:basis-64 2xl:flex-grow" key={element._id}>
            <Link
              to={`/auction/item/${element._id}`}
              className="w-full flex flex-col gap-4 bg-white p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <img
                  src={element.image?.url}
                  alt={element.title}
                  className="w-20 h-20 rounded-md shadow-sm"
                />
                <p className="font-medium text-[#111] text-base">
                  {element.title}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600 font-semibold">Starting Bid:</p>
                <p className="text-[#8890fd] font-semibold">₹{element.startingBid}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-600 font-bold">Starting Time:</p>
                <p className="text-black text-sm">{element.startTime}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingAuctions;