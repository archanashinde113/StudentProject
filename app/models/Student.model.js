 module.exports = mongoose => {
     const Stud = mongoose.model(
       "Student",
       mongoose.Schema(
         {
           FirstName: String,
           LastName: String,
           Age: Number,
           RollNo : Number,
           //description: String,
          // published: Boolean
        
         },
         { timestamps: true }
       )
     );
     return Stud;

  
   };

