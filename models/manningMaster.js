var mongoose= require("mongoose");

var manningMasterSchema = new mongoose.Schema({
     
      PersNo: Number,
      PersonnelNumber: String,
      CostCtr: Number,
      CostCenter: String,
      Division: String,
      OrganizationalUnit: String,
      PArea: String,
    PayrollArea: String,
      PSGroup: String,
    Department: String,
    Entry: Date, 
       PSubarea: String,
      PersonnelSubarea: String,
           Position: Number,
    GenderKey: Number,
      Type: String,
         PayScaleType: String,
           PSA: String,
        PayScaleArea: String,
             Lv: Number,
           WageType: String,
                  Amount: Number,
               Crcy: String,
       Number: Number,
                  Total: Number,
                Crcy: String,
           Prcnt: Number,
  Order: Number,
          OrderNumber: Number,
            ZLOCATION: String,
           Section: String,
    WorkPerm: Number,
      PersonnelArea: String,
      Location: String
     
    
});

var manningMaster = mongoose.model("manningMaster", manningMasterSchema);

module.exports = manningMaster;