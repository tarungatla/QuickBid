import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");  // Pad single digit numbers with 0
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <Link
        to={`/auction/item/${id}`}
        className="flex-grow basis-full bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 group sm:basis-56 lg:basis-60 2xl:basis-80"
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full aspect-[4/3] m-auto object-contain rounded-t-lg group-hover:opacity-90 transition-opacity duration-300 bg-gray-100"
        />

        <div className="px-4 pt-4 pb-3">
          <h5 className="font-semibold text-lg text-gray-800 group-hover:text-[#362bd6] mb-2 transition-colors duration-300">
            {title}
          </h5>

          {startingBid && (
            <p className="text-gray-600 font-light mb-1">
              Starting Bid:
              <span className="text-[#8890fd] font-semibold ml-1">
                ₹{startingBid}
              </span>
            </p>
          )}

          <p className="text-gray-600 font-light">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#8890fd] font-semibold ml-1">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#8890fd] font-semibold ml-1">Time's up!</span>
            )}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Card;