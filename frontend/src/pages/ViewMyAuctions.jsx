import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
        <h1 className="text-[#362bd6] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          My Auctions
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div
            className={`${myAuctions.length > 2 ? "flex-grow" : ""
              } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((element) => (
                <CardTwo
                  title={element.title}
                  startingBid={element.startingBid}
                  endTime={element.endTime}
                  startTime={element.startTime}
                  imgSrc={element.image?.url}
                  id={element._id}
                  key={element._id}
                />
              ))
            ) : (
              <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl mt-5">
                You have not posted any auction.
              </h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewMyAuctions;