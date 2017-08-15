var mongoose= require("mongoose");

var attritionMasterSchema = new mongoose.Schema({
     
      PersNo: Number,
      PersonnelNumber: String,
      ResignationMonth: String,
      GenderKey: String,
      Entry: Date,
      Tenure: Number,
      Position: String,
      PSGroup: String,
      Tier: String,
      Division: String,
      Resignation: String,
      ResignationReason: String,
      NewCompany: String,
      PArea: String,
      NewEmployeeCode: String,
      Location: String
     
    
});

var attritionMaster = mongoose.model("attritionMaster", attritionMasterSchema);

module.exports = attritionMaster;