const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template");
const team = [];

const validateInt = (value) => {
  if (value.trim() === "") {
    return "You have to input a value";
  } else {
    return true;
  }
};
const getManagerInfo = async() =>{

    const ManagerInfo = [
        {
            type: "input",
            name: "name",
            message: "What is your name? ",
            validate: validateInt,
        },
        {
            type: "input",
            name: "employeeId",
            message: "What is your Employee ID? ",
            validate: validateInt,
        },
        {
            type: "input",
            name: "emailaddress",
            message: "What is your email address? ",
            validate: validateInt,
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your Office Number? ",
            validate: validateInt,
        },
    ];
    const mangAnswers = await inquirer.prompt(ManagerInfo);
    const manager = new Manager( mangAnswers.name,
        mangAnswers.employeeId,
        mangAnswers.emailaddress,
        mangAnswers.officeNumber);
    team.push(manager);
    console.log(manager);
}

const getEngInfo = async () => {
  const engQuestions = [
    {
      type: "input",
      name: "name",
      message: "Please Enter Engineer Name: ",
      validate: validateInt,
    },
    {
      type: "input",
      name: "id",
      message: "Please Enter Engineer ID: ",
      validate: validateInt,
    },
    {
      type: "input",
      name: "email",
      message: "Please Enter Engineer Email: ",
      validate: validateInt,
    },
    {
      type: "input",
      name: "github",
      message: "Please Enter Engineer Github Username: ",
      validate: validateInt,
    },
  ];
  const engAnswers = await inquirer.prompt(engQuestions);
  const engineer = new Engineer( engAnswers.name,
    engAnswers.id,
    engAnswers.email,
    engAnswers.github);
  team.push(engineer);
  console.log(engineer);
};

const getInternInfo = async () => {
  internQuestions = [
    {
        type: "input",
        name: "name",
        message:'What is the name?',
        validate:validateInt,
    },
    {
            type:'input',
            name:'id',
            message:'What is your Intern ID?',
            validate:validateInt,
    },
    {
            type:'input',
            name:'email',
            message:'What is your email address?',
            validate:validateInt,
    },
    {
            type:'input',
            name:'school',
            message:'What is the name of your School/Uni?',
            validate:validateInt,
    },
    ];

    const internAnswers = await inquirer.prompt(internQuestions);
    const intern = new Intern(internAnswers.name, 
        internAnswers.id, 
        internAnswers.email, 
        internAnswers.school);
    team.push(intern);
    console.log(intern);
};

const generateTeam = () => {
    console.log('Profile has been created!!!');
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath,render(team),'utf-8');
};
const init = async () => {
    console.log("Please enter your Manager information:");
    await getManagerInfo();
    let addEmployee = true;
    while (addEmployee) {
        const employeeQuestions = [
            {
                type: "list",
                name: "employeeType",
                message: "Select the type of employee you would like to add to your team:",
                choices: [
                    { name: "Engineer" },
                    { name: "Intern" },
                    { name: "I'm done adding employees" },
                ],
            },
        ];
        const { employeeType } = await inquirer.prompt(employeeQuestions);
        if (employeeType === "None") {
            generateTeam();
        } else if (employeeType === "Engineer") {
            await getEngInfo();
            await generateTeam();
        } else if (employeeType === "Intern") {
            await getInternInfo();
            await init();
        }
        break
    };
};
init();