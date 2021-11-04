const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const generateHTML = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generate-files.js');

let employeeData = {
  managers: [],
  engineers: [],
  interns: []
}
let employees = []

const proccessData = () => {
  let counter = 1;
  console.log(employeeData);
  employeeData.managers.forEach((manager) => {
    let newManager = new Manager(manager.name, counter, manager.email, manager.officeNumber);
    employees.push(newManager);
    counter++;
  });
  employeeData.engineers.forEach((engineer) => {
    let newEngineer = new Engineer(engineer.name, counter, engineer.email, engineer.github);
    employees.push(newEngineer)
    counter++;
  })
  employeeData.interns.forEach((intern) => {
    let newIntern = new Intern(intern.name, counter, intern.email, intern.school);
    employees.push(newIntern);
    counter++;
  });
}
const promptEmployees = () => {
  return promptManager()
    .then(promptEngineer)
    .then(promptIntern)
}
const promptManager = () => {
  return inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: "What is the Manager's name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter the Manager's name!");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Manager's email?",
      validate: (emailInput) => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(emailInput)) {
          return true;
        } else {
          console.log("Please enter a valid email!");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the Manager's office number?",
      validate: (officeNumberInput) => {
        let regex = /^[0-9]*$/;
        if (regex.test(officeNumberInput)) {
          return true;
        } else {
          console.log("Please enter the Manager's office number(must be an integer)!");
          return false;
        }
      },
    }]).then((data) => {
      employeeData.managers.push(data);
    })
}
const promptEngineer = () => {
  return inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: "What is the Engineer's name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter the Engineer's name!");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Engineer's email?",
      validate: (emailInput) => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(emailInput)) {
          return true;
        } else {
          console.log("Please enter a valid email!");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'github',
      message: "What is the Engineer's github?",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter the Engineer's github!");
          return false;
        }
      },
    },
    {
      type: 'confirm',
      name: 'confirmAddEngineer',
      message: 'Would you like to add another engineer?',
      default: false
    }]).then((data) => {
      employeeData.engineers.push(data);

      if (data.confirmAddEngineer) {
        return promptEngineer();
      }
    })
}
const promptIntern = () => {
  return inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: "What is the Intern's name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter the Intern's name!");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Intern's email?",
      validate: (emailInput) => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(emailInput)) {
          return true;
        } else {
          console.log("Please enter a valid email!");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'school',
      message: "Where does the intern go to school?",
      validate: (schoolInput) => {
        if (schoolInput) {
          return true;
        } else {
          console.log("Please enter where the intern attends school!");
          return false;
        }
      },
    },
    {
      type: 'confirm',
      name: 'confirmAddIntern',
      message: 'Would you like to add another intern?',
      default: false
    }]).then((data) => {
      employeeData.interns.push(data);

      if (data.confirmAddIntern) {
        return promptIntern();
      }
    })
}
promptEmployees()
  .then(proccessData)
  .then(() => {
    return generateHTML(employees)
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });