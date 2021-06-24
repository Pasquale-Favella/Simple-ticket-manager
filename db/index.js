const Datastore = require("nedb");
const db = {};

db.users = new Datastore({ filename: __dirname+"/users.db", autoload: true });
db.tickets = new Datastore({ filename: __dirname+"/tickets.db", autoload: true });

let initialSeedData = {
    lanes: [
      {
        id: '1',
        title: 'Nuovi',
        
        cards: []
      },
      {
        id: '2',
        title: 'In Carico',  
        cards: [
        ]
      },
      {
        id: '3',
        title: 'Completed',
        
        cards: []
      }
    ]
  }



//Look-Up for seed initial structure data
db.tickets.count({}, function (err, count) {
  if(err)return
  console.log('COUNT',count)
  if(count===0)db.tickets.insert(initialSeedData)
});
module.exports = db;