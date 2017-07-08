var mongoose= require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

var numbers = new mongoose.Schema({
      nmpts: Number,
      tierv: Number,
      tieriv: Number,
      tieriii: Number,
      tierii: Number,
      tieri: Number
});

var actualSchema = new mongoose.Schema({

      year: String,
      month: String,
      marketing: numbers,
      dairy_sales: numbers,
      technical_operation : numbers,
      finance_sbd : numbers,
      hr_admin : numbers,
      ice_cream : numbers,
      audit : numbers,
      general_management : numbers,
      legal : numbers
    
});

var actual = mongoose.model("actual", actualSchema);

module.exports = actual;