/* const mongoose = require('mongoose');

const args = [...process.argv];

if (args.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = args[2];

const url = `mongodb+srv://walrus:${password}@cluster0.c20eak1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (args.length === 5) {
  const person = new Person({
    name: args[3],
    number: args[4],
  });

  person.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
    process.exit(1);
  });
}

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
  process.exit(1);
});

*/
