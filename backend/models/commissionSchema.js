import mongoose from "mongoose";

// For approved commissions
const commissionSchema = new mongoose.Schema({  // Settled Commissions
  amount: Number,  
  user: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Commission = mongoose.model("Commission", commissionSchema);