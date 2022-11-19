let getpeople = (req, res) => {  
  const dbInstance = req.app.get("db");
  dbInstance
    .get_people()
    .then((peopletravelling) => res.status(200).send(peopletravelling))
    .catch((err) => {
      res.status(500).send({
        errorMessage:
          "Oops! Something went wrong. Our engineers have been informed!",
      });
      console.log(err);
    });
};
let newperson = (req, res) => {
  const dbInstance = req.app.get("db");
  dbInstance
    .new_person([
      req.body.firstname,
      req.body.lastname,
      req.body.hometown,
      req.body.location,
    ])
    .then((peopletravelling) => {
      res.status(200).send(peopletravelling);
    })
    .catch((err) => {
      res.status(500).send({
        errorMessage:
          "Oops! Something went wrong. Our engineers have been informed!",
      });
      console.log(err);
    });
};

let editdetails = (req, res) => {
const dbInstance = req.app.get("db");
dbInstance
.edit_person([req.body.firstname, req.body.lastname, req.body.hometown, req.body.location, req.params.id])
.then((peopletravelling) => {
    res.status(200).send(peopletravelling);
})
.catch((err) => {
    res.status(500).send({
        errorMessage:
        err
    })
})
}
// let deletePerson = (req, res) => {
//     const dbInstance = req.app.get("db")
//     dbInstance
//     .delete_person
// }

module.exports = {
  getpeople,
  newperson,
  editdetails
  
};
