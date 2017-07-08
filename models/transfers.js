var mongoose= require("mongoose");

var transfersSchema = new mongoose.Schema({
      pno: Number,
      ename: String,
      odivision:String,
      oposition: String,
      ndivision : String,
      nposition : String,
      edate : Date
     
    
});

var transfers = mongoose.model("transfers", transfersSchema);

module.exports = transfers;