var mongoose= require("mongoose");

var attritionSchema = new mongoose.Schema({
      ecategories: String,
      month: String,
      average: Number,
      left: Number,
      percentage: Number
   
     
    
});

var attrition = mongoose.model("attrition", attritionSchema);

module.exports = attrition;