const { writeFile, readFile } = require("fs").promises;
const options = require("../options");

const Participants = {
  data: [],
  fileName: options.fileName,
  loadFromFile: async function() {
      const dataStr = await readFile(this.fileName, "utf-8");
      return JSON.parse(dataStr);
  },
  saveToFile: async function(data) {
      try {
          const dataStr = JSON.stringify(data);
          await writeFile(this.fileName, dataStr, "utf-8");
      } catch (e) {
          if (e.fileIsBusy) setInterval(() => { this.saveToFile(data) }, 1000); // to fix
      }
  },

  keys: ["age", "country", "com1", "com2","com3"],//виправити поля під турнір

  read: async function(condition) {
      this.data = await this.loadFromFile();
      if (condition)
          return this.data.filter(condition);
      return this.data;
  },
  find: async function(condition) {
      this.data = await this.loadFromFile();
      return this.data.find(condition);
  },
  delete: async function(condition) {
      this.data = await this.loadFromFile();
      let index = this.data.findIndex(condition);
      if (index === -1) return null;
      //if (index >= 0)
      let deletedParticipant = this.data[index];
      this.data.splice(index, 1);
      await this.saveToFile(this.data);
      return  deletedParticipant;
  },
  create: async function(options) {
      this.data = await this.loadFromFile();
      let newParticipant = {
          id: Number(Date.now()),
      };
      for (let key of this.keys) {
        newParticipant[key] = options[key];
      }
      this.data.push(newParticipant);
      await this.saveToFile(this.data);
      return newParticipant;
  },
  update: async function(condition, options) {
      this.data = await this.loadFromFile();
      let index = this.data.findIndex(condition);
      if (index === -1) return null;
      let updatedParticipant = this.data[index];
      for (let key of this.keys)
          if (options[key]) updatedParticipant[key] = options[key];
      await this.saveToFile(this.data);
      return updatedParticipant ;
  },
};

module.exports = Participants;




