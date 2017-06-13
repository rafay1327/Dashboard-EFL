var mongoose= require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var date = new Date();
var dvSchema = new mongoose.Schema({
      s_no: Number,
      position: String,
      region:String,
      vacant_since:date,
      ceo_approval_date:date,
      n_candidates_sourced: Number,
      n_candidates_tested: Number,
      interviews: Number,
      shortlisted: String,
      offer_date: date,
      acceptance_date: date,
      doj: date,
      status: String,
      days_to_hire: Number
    
});

var DairyVacancy = mongoose.model("DairyVacancy", dvSchema);

module.exports = DairyVacancy;