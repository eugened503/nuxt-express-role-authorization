require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

const { loadNuxt, build } = require("nuxt");
const isDev = process.env.NODE_ENV !== "production";

const start = async () => {
  try {
    const nuxt = await loadNuxt(isDev ? "dev" : "start");
    app.use(nuxt.render);
    if (isDev) {
      build(nuxt);
    }

    await mongoose.connect(
      `mongodb+srv://user:GAS-SMp-Y22-DSj@cluster0.hnra0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    );

    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
