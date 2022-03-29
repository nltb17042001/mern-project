const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
require("dotenv").config();
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-project.ngcxe.mongodb.net/MERN-Project?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect data Success");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// mongoose.connect('mongodb+srv://NLTB17042001:01655415679Binh@mern-project.ngcxe.mongodb.net/MERN-Project?retryWrites=true&w=majority').then(()=>{
//     console.log('Success');
// }).catch((err)=>{
//     console.log(err.message);
// })

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
