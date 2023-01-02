const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    email: {
        type: String,
    },
    Discribe_Your_Company_And_Products: {
        type: String,
    },
    company_name: {
        type: String,
    },
    competitive_advantage: {
        type: String,
    },
    incubation_type: {
        type: String,
    },
    market_plan: {
        type: String,
    },
    market_size: {
        type: String,
    },
    problem: {
        type: String,
    },
    proposal: {
        type: String,
    },
    revenue_model: {
        type: String,
    },
    solution: {
        type: String,
    },
    team_and_background: {
        type: String,
    },
    value_proposition: {
        type: String,
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    isBooked:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
