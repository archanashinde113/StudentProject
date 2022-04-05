 module.exports = mongoose => {
     const Stud = mongoose.model(
       "Student",
       mongoose.Schema(
         {
           FirstName: String,
           LastName: String,
           Age: Number,
           RollNo : Number,
         },
         { timestamps: true },
         
       )
     );
     return Stud;
   };



   