import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="w-full min-h-screen bg-gray-50 px-4 pt-24 lg:pl-[320px] flex flex-col">
        {/* Breadcrumb */}
        <div className="text-sm flex flex-wrap gap-2 items-center mb-8">
          <Link
            to="/"
            className="font-medium text-gray-600 transition-colors duration-200 hover:text-[#D6482B]"
          >
            Home
          </Link>
          <FaGreaterThan className="text-gray-400 w-3 h-3" />
          <Link
            to={"/auctions"}
            className="font-medium text-gray-600 transition-colors duration-200 hover:text-[#D6482B]"
          >
            Auctions
          </Link>
          <FaGreaterThan className="text-gray-400 w-3 h-3" />
          <p className="text-gray-400">{auctionDetail.title}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <div className="flex gap-8 flex-col lg:flex-row">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Item Details */}
              <div className="flex gap-6 flex-col lg:flex-row bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-gray-50 rounded-lg w-full lg:w-48 lg:h-48 flex justify-center items-center p-4">
                  <img
                    src={auctionDetail.image?.url}
                    alt={auctionDetail.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-between py-2">
                  <h3 className="text-gray-900 text-2xl font-bold mb-4 min-[480px]:text-2xl md:text-3xl lg:text-4xl">
                    {auctionDetail.title}
                  </h3>
                  <div className="space-y-3">
                    <p className="text-lg">
                      <span className="text-gray-600 font-medium">Condition: </span>
                      <span className="text-[#D6482B] font-semibold">
                        {auctionDetail.condition}
                      </span>
                    </p>
                    <p className="text-lg">
                      <span className="text-gray-600 font-medium">Minimum Bid: </span>
                      <span className="text-[#D6482B] font-semibold">
                        ₹{auctionDetail.startingBid}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-xl text-gray-900 font-bold mb-4">
                  Auction Item Description
                </p>
                <hr className="mb-6 border-gray-200" />
                <ul className="space-y-3">
                  {auctionDetail.description &&
                    auctionDetail.description.split(". ").map((element, index) => (
                      <li key={index} className="text-gray-600 text-lg leading-relaxed">
                        {element}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <header className="bg-gray-900 py-4 px-6">
                  <h2 className="text-xl text-white font-semibold">BIDS</h2>
                </header>

                <div className="px-6 min-h-fit lg:min-h-[650px]">
                  {auctionBidders &&
                    new Date(auctionDetail.startTime) < Date.now() &&
                    new Date(auctionDetail.endTime) > Date.now() ? (
                    auctionBidders.length > 0 ? (
                      <div className="py-4 space-y-3">
                        {auctionBidders.map((element, index) => (
                          <div
                            key={index}
                            className="p-4 flex items-center justify-between bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={element.profileImage}
                                alt={element.userName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm hidden md:block"
                              />
                              <p className="text-gray-900 font-medium">
                                {element.userName}
                              </p>
                            </div>
                            <div className={`px-4 py-1 rounded-full font-semibold ${index === 0 ? "bg-green-100 text-green-700" :
                                index === 1 ? "bg-blue-100 text-blue-700" :
                                  index === 2 ? "bg-yellow-100 text-yellow-700" :
                                    "bg-gray-100 text-gray-700"
                              }`}>
                              {index === 0 ? "1st" :
                                index === 1 ? "2nd" :
                                  index === 2 ? "3rd" :
                                    `${index + 1}th`}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[400px]">
                        <p className="text-gray-500 text-lg">No bids for this auction</p>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center">
                      <img
                        src={Date.now() < new Date(auctionDetail.startTime) ? "/notStarted.png" : "/auctionEnded.png"}
                        alt={Date.now() < new Date(auctionDetail.startTime) ? "not-started" : "ended"}
                        className="w-full max-h-[650px] object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-[#D6482B] p-6">
                  {Date.now() >= new Date(auctionDetail.startTime) &&
                    Date.now() <= new Date(auctionDetail.endTime) ? (
                    <>
                      <div className="flex gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <p className="text-white font-medium">Place Bid</p>
                          <input
                            type="number"
                            className="w-32 px-3 py-2 rounded-lg bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 text-lg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <button
                          className="p-4 text-white bg-black rounded-full shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                          onClick={handleBid}
                        >
                          <RiAuctionFill className="w-6 h-6" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-white font-semibold text-xl text-center">
                      {new Date(auctionDetail.startTime) > Date.now()
                        ? "Auction has not started yet!"
                        : "Auction has ended!"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AuctionItem;