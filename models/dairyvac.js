var mongoose= require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

var dvSchema = new mongoose.Schema({
      s_no: Number,
      position: String,
      region:String,
      division: String,
      ta_fp : String,
      tier : String,
      last_incumbent:String,
      vacant_since : Date,
      ceo_approval_date:Date,
      n_candidates_sourced: Number,
      n_candidates_tested: Number,
      interviews: Number,
      shortlisted: String,
      offer_date: Date,
      acceptance_date: Date,
      doj: Date,
      status: String,
      days_to_hire: Number
    
});

var DairyVacancy = mongoose.model("DairyVacancy", dvSchema);

module.exports = DairyVacancy;