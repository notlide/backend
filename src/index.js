const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req,res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});


app.post("/create", async(req,res) => {
  const newUser = await prisma.user.create({data: req.body });
  res.json(newUser);
});

app.put("/settings/:id", async(req,res) => {
  const id = req.params.id;
  const updatedUsername = req.body.username;
  const updatedFirstname = req.body.firstname;
  const updatedLastname = req.body.lastname;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedAge = req.body.age;
  const updatedRole = req.body.role;

  const updatedUser = await prisma.user.update({
    where:{id: parseInt(id)}, 
    data: {
      username: updatedUsername,
      firstname: updatedFirstname,
      lastname: updatedLastname,
      email: updatedEmail,
      password: updatedPassword,
      age: updatedAge,
      role: updatedRole,
    } 
  });
  res.json(updatedUser);
});

app.delete("/settings/:id", async(req,res) => {
  const id = req.params.id;
  const deleteUser = await prisma.user.delete({
    where:{id: parseInt(id)}, 
  });
  res.json(deleteUser);
});

app.listen(8080,()=>{
  console.log("server running");
});