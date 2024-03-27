const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
   // Validate request
   if (!req.body.name) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }
 
   // Create a Client
   const client = {
     name: req.body.name,
     email: req.body.email,
     password: req.body.password,
     documentation: req.body.documentation,
     phone: req.body.phone
   };
   // Save Client in the database
   Client.create(client)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the Client."
       });
     });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
   const name = req.query.name;
   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
 
   Client.findAll({ where: condition })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving clients."
       });
     });
};

// Find a single Client with an id
exports.findOne = async (req, res) => {
  try {
    const client = await Client.findOne(
      {
        raw: true, 
        where: { email: req.query.email } 
      }
    );
    if (!client) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    if (client.password !== req.query.password) {
      return res.status(404).send({ message: 'Senha incorreta' });
    }
    return res.status(200).send(client);
  } catch (err) {
    res.status(500).send({
      message: 'Erro ao buscar um cliente',
    });
  }
};

// exports.signIn = (req, res) => {
//   try {
//     const client = Client.findOne({
//       raw: true,
//       where: {
//         email: req.body.email
//       },
//     })
//     if(!client){
//       return res.status(404).send({ message: 'User not found'});
//     }

//     if(client.password !== req.body.password) {
//       return res.status(404).send({ message: 'Password doenst match'});
//     }

//     return res.status(200).send({
//       id: user.id,
//       name: user.username,
//       email: user.email,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: "Error to log a Client",
//     });
//   }
// };

// Update a Client by the id in the request
exports.update = (req, res) => {
   const id = req.params.id;
 
   Client.update(req.body, {
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Client was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating Client with id=" + id
       });
     });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
 
   Client.destroy({
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Client was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete Client with id=" + id
       });
     });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
   Client.destroy({
     where: {},
     truncate: false
   })
     .then(nums => {
       res.send({ message: `${nums} Clients were deleted successfully!` });
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all clients."
       });
     });
};