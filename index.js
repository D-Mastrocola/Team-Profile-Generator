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
      message: "What is the Manager's name?"
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Manager's email?"
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the Manager's office number?"
    }]).then((data) => {
      employeeData.managers.push(data);
    })
}
const promptEngineer = () => {
  return inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: "What is the Engineer's name?"
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Engineer's email?"
    },
    {
      type: 'input',
      name: 'github',
      message: "What is the Engineer's github?"
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
      message: "What is the Intern's name?"
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Intern's email?"
    },
    {
      type: 'input',
      name: 'school',
      message: "Where does the intern go to school?"
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