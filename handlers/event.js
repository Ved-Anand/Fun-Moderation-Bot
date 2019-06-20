const { readdirSync } = require("fs")

module.exports = (bot) => {
  const load = dirs => {    
    const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
    //get all the js files in events/(dirs parameter)

    for (let file of events) { //for each of these files
      const evt = require(`../events/${dirs}/${file}`);

      let eName = file.split('.')[0]; //get the name of the file without the .js at the end
      bot.on(eName, evt.bind(null, bot));
      //names of those files are message, and ready, both bot events. Run these files with bot instead of null using bind
    };
  };
  
  ["client", "guild"].forEach(x => load(x)); //these are the two names of the directories in ./events
};