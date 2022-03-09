const db = require("../models");
const Stud = db.students;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.FirstName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const Student = new Stud({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Age: req.body.Age,
      RollNo: req.body.RollNo
     // description: req.body.description,
     // published: req.body.published ? req.body.published : false
    });
    // Save Tutorial in the database
    Student
      .save(Student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      });
  };
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const FirstName = req.query. FirstName;
    var condition =  FirstName ? {  FirstName: { $regex: new RegExp( FirstName), $options: "i" } } : {};
    Stud.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Stud.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Student with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Student with id=" + id });
      });
  };
// Update a Student by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Stud.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found!`
          });
        } else res.send({ message: "Student was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
  };
// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Stud.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
          });
        } else {
          res.send({
            message: "Student was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
      });
  };
// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Stud.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Students were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Students."
        });
      });
  };
// Find all published Students
exports.findAllPublished = (req, res) => {
    Stud.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Students."
        });
      });
  };