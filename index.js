const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");

const team = [];

const memberThing = {
  Manager: "officeNumber",
  Engineer: "gitHub",
  Intern: "school",
};

const getQuestions = (type) => [
  {
    type: "input",
    message: type + " name",
    name: "name",
  },
  {
    type: "input",
    message: type + " id",
    name: "id",
  },
  {
    type: "input",
    message: type + " email",
    name: "email",
  },
  {
    type: "input",
    message: type + " " + memberThing[type],
    name: "thing",
  },
];

const nextActionQuestion = {
  type: "list",
  message: "Next Action",
  name: "action",
  choices: ["Add Engineer", "Add Intern", "Finish"],
};

inquirer.prompt(getQuestions("Manager")).then(({ name, id, email, officeNumber }) => {
  console.log("================");
  team.push(new Manager(name, id, email, officeNumber));

  inquirer.prompt(nextActionQuestion).then(({ action }) => {
    doAction(action);
  });
});

function doAction(action) {
  console.log("================");
  switch (action) {
    case "Add Engineer":
      askFor("Engineer");
      break;
    case "Add Intern":
      askFor("Intern");
      break;
    case "Finish":
      finish("engineer");
      break;
  }
}

function askFor(type) {
  inquirer.prompt(getQuestions(type)).then(({ name, id, email, thing }) => {
    console.log("================");
    switch (type) {
      case "Manager":
        team.push(new Manager(name, id, email, thing));
        break;
      case "Intern":
        team.push(new Manager(name, id, email, thing));
        break;
    }
    inquirer.prompt(nextActionQuestion).then(({ action }) => {
      doAction(action);
    });
  });
}

function finish() {
  // const OUTPUT_DIR = path.resolve(__dirname, "output");
  // const outputPath = path.join(OUTPUT_DIR, "team.html");

  // const render = require("./src/page-template.js");
  console.log("FINISHED!");
}
