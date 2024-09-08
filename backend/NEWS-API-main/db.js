const mongoose = require("mongoose");
const DB = "mongodb+srv://rawantemmo:rawan445153@cluster0.fa1yc.mongodb.net/";
module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    };
    await mongoose.connect(DB, connectionParams);
    console.log("DB CONECTION");
  } catch (err) {
    console.log(err);
  }
};
