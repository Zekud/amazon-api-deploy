const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "it is running",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).json({
      message: "please enter a valid amount",
    });
  }
});
app.listen(5000, (err) => {
  if (err) console.log(err);
  console.log("server is running");
});
