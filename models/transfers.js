var mongoose= require("mongoose");

var transfersSchema = new mongoose.Schema({
      pno: Number,
      ename: String,
      odivision:String,
      oposition: String,
      ndivision : String,
      nposition : String,
      edate : Date,
      e_status : String,
      ap_tr : String
    
});

var transfers = mongoose.model("transfers", transfersSchema);

module.exports = transfers;