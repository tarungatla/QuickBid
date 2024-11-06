import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    // Run every minute
    const now = new Date();
    console.log("Cron for ended auction running...");
    const allAuctions = await Auction.find({
      commissionCalculated: false,
    });
    const endedAuctions = allAuctions.filter(auction => {
      const endTimeStr = auction.endTime;
      const dateString = endTimeStr.replace(/\s*\([^)]+\)$/, ''); // Remove the part like "(India Standard Time)"
      const endTimeDate = new Date(dateString);
      return endTimeDate < now;
    });

    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
        console.log(highestBidder);
        const auctioneer = await User.findById(auction.createdBy);
        auctioneer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,  // Add the amount spent by the user
                auctionsWon: 1,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          const subject = `Congratulations! You won the auction for ${auction.title}`;
          const currentDate = new Date();

          currentDate.setDate(currentDate.getDate() + 2);

          const dueDate = currentDate.toISOString().split('T')[0];
          const message = `Dear ${bidder.userName},

        Congratulations! You have won the auction for ${auction.title}.

        Before proceeding with payment, please contact your auctioneer via email: ${auctioneer.email}.

        Please complete your payment using one of the following methods:

        1. Bank Transfer:
          - Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName}
          - Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}
          - Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}

        2. PayPal:
          - Send payment to: ${auctioneer.paymentMethods.paypal.paypalEmail}

        3. Cash on Delivery (COD):
          - If you prefer COD, you must pay 20% of the total amount upfront before delivery.
          - To pay the 20% upfront, use any of the above methods.            
          - The remaining 80% will be paid upon delivery.
          - If you want to see the condition of your auction item, please send an email to: ${auctioneer.email}.

        Please ensure your payment is completed by ${dueDate}. Once we confirm the payment, the item will be shipped to you.

        Thank you for participating!

        Best regards,  
        Tarunkumar Auction Team`;

          console.log("SENDING EMAIL TO HIGHEST BIDDER");

          sendEmail({ email: bidder.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  });
};
