// CURRENTLY NOT IN USE - WAS USED FOR TESTING PURPOSES

// const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://arjunbalaji08:ohQTIA6gr0pLJRBK@cluster0.mes8j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const client = new MongoClient(uri);

// async function connectToDatabase() {
//     try {
//         console.log('Connecting to MongoDB...');
//         await client.connect();
//         console.log('Connected to MongoDB');
//         const database = client.db('sample_mflix');
//         return database;
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         process.exit(1);
//     }
// }

// module.exports = { connectToDatabase, client };


// CURRENTLY NOT IN USE - WAS USED FOR TESTING PURPOSES

// let database;
// (async () => {
//   try {
//     console.log('Connecting to the database...');
//     database = await connectToDatabase();
//     // let collection = await database.collection('movies');
//     // console.log('Database connected and collection initialized.');
//     // const movies = await collection.find({"title": "Dune"}).toArray();
//     // console.log(movies[0]);
//     // console.log('Movies fetched from the database.');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     process.exit(1);
//   }
// })();
  
// const events = [];

// app.get('/api/events', (req, res) => {
//   res.status(201).json(events);
// });

// app.post('/api/events', (req, res) => {
//   const newEvent = req.body; 
//   events.push(newEvent);
//   res.status(201).json(newEvent); 
// });
