import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction); // Get all auctions from the store
  return (
    <>
      <section className="my-8">
        <h3 className="text-gray-800 text-2xl font-semibold mb-6 sm:text-3xl lg:text-4xl">
          Featured Auctions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allAuctions.slice(0, 8).map((element) => (
            <Card
              title={element.title}
              imgSrc={element.image?.url}
              startTime={element.startTime}
              endTime={element.endTime}
              startingBid={element.startingBid}
              id={element._id}
              key={element._id}
            />
          ))}
        </div>
      </section>
    </>
  );
};


export default FeaturedAuctions;