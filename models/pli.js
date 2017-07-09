var mongoose= require("mongoose");

var pliSchema = new mongoose.Schema({
      s_no: Number,
      name: String,
      cnic:String,
      date: Date,
      position : String,
      status : String,
      
     
    
});

var pli = mongoose.model("pli", pliSchema);

module.exports = pli;