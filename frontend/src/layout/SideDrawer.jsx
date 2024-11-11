import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#362bd6] text-white text-3xl p-2 rounded-md hover:bg-[#362bd6] lg:hidden"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-[100%] sm:w-[300px] bg-[#f6f4f0] h-full fixed top-0 ${show ? "left-0" : "left-[-100%]"
          } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-stone-500 z-50`}  // Added z-50
      >
        <div className="relative">
          <Link to={"/"}>
            <h4 className="text-2xl font-semibold mb-4">
              Quick
              <span className="text-[#362bd6]">Bid</span>
            </h4>
          </Link>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to={"/auctions"}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/leaderboard"}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}

          </ul>
          {!isAuthenticated ? (
            <>
              <div className="my-4 flex gap-2">
                <Link
                  to={"/sign-up"}
                  className="bg-[#362bd6] font-semibold hover:bg-[#362bd6] text-xl py-1 px-4 rounded-md text-white"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#DECCBE] bg-transparent border-[#DECCBE] border-2 hover:bg-[#fffefd] hover:text-[#8890fd] font-bold text-xl py-1 px-4 rounded-md"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
                <button className="bg-[#362bd6] font-semibold hover:bg-[#362bd6] text-xl py-1 px-4 rounded-md text-white">
                  Logout
                </button>
              </div>
            </>
          )}
          <hr className="mb-4 border-t-[#362bd6]" />
          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6] hover:transition-all hover:duration-150"
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}

            <li>
              <Link
                to={"/how-it-works-info"}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="flex text-xl font-semibold gap-2 items-center"
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
            {isAuthenticated && user && user.role !== "Super Admin" && (
              <li>
                <Link
                  to={"/contact"}
                  className="flex text-xl font-semibold gap-2 items-center hover:text-[#362bd6]"
                >
                  <MdOutlineContactSupport /> Contact Us
                </Link>
              </li>
            )}
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden"
          />
        </div>

        <div>
          <p className="text-stone-500">&copy; QuickBid, LLC.</p>
          <p className="text-stone-500">
            Degined By{" "}
            <Link
              to={"/"}
              className="font-semibold hover:text-[#362bd6]"
            >
              Tarunkumar Gatla
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;