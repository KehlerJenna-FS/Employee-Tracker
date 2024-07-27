//class for all employees
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}

//class for managers that extends to employee class
class Manager extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.type = "Manager";
  }
  //calculates annual salary for manager
  calculatePay() {
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}
//class for part time employees that extends to employee class
class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.type = "PT";
  }
  //calculates annual salary for part time employees
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}
//main class for employees
class Main {
  constructor() {
    this.employees = [];
    this.allEmployees();
  }
  //three employees added to the list
  allEmployees() {
    let employeeOne = new PartTime("Jenna", 25, 15, 25);
    employeeOne.calculatePay();
    this.employees.push(employeeOne);

    let employeeTwo = new Manager("Brianna", 38, 25, 40);
    employeeTwo.calculatePay();
    this.employees.push(employeeTwo);

    let employeeThree = new PartTime("Austin", 24, 20, 12);
    employeeThree.calculatePay();
    this.employees.push(employeeThree);

    this.displayEmployees();
    this.displayMenu();
  }

  displayMenu() {
    let prompts = prompt(
      `Main Menu:\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees`
    );
    switch (prompts) {
      case "1":
        this.addEmployee();
        break;
      case "2":
        this.removeEmployee();
        break;
      case "3":
        this.editEmployee();
        break;
      case "4":
        this.displayEmployees();
        break;
      default:
        console.log("Invalid option, please choose a valid option.");
        this.displayMenu();
        break;
    }
  }
  //prompt to add a new employee to the list
  addEmployee() {
    let employeeData = prompt(
      "Add Employee Name, age, hours, and pay rate (seperate each with a comma)"
    );
    let [name, age, payRate, hours] = employeeData
      .split(",")
      .map((item) => item.trim());
    age = parseInt(age);
    payRate = parseFloat(payRate);
    hours = parseFloat(hours);

    if (hours < 40) {
      let partTimeEmployee = new PartTime(name, age, payRate, hours);
      partTimeEmployee.calculatePay();
      this.employees.push(partTimeEmployee);
    } else {
      let manager = new Manager(name, age, payRate, hours);
      manager.calculatePay();
      this.employees.push(manager);
    }

    this.displayEmployees();
    this.displayMenu();
  }
  //prompt to remove an employee from the list
  removeEmployee() {
    let identifier = prompt("Enter employee number or name to remove:");
    if (isNaN(identifier)) {
      this.employees = this.employees.filter(
        (emp) => emp.name.toLowerCase() !== identifier.toLowerCase()
      );
    } else {
      let index = parseInt(identifier) - 1;
      if (index >= 0 && index < this.employees.length) {
        this.employees.splice(index, 1);
      }
    }
    this.displayEmployees();
    this.displayMenu();
  }
  //prompt to edit an employee
  editEmployee() {
    let employeeNumber = parseInt(prompt("Enter employee number to edit:")) - 1;
    if (employeeNumber >= 0 && employeeNumber < this.employees.length) {
      let newPayRate = parseFloat(prompt("Enter new pay rate:"));
      let employee = this.employees[employeeNumber];
      employee.payRate = newPayRate;
      employee.calculatePay();
    }
    this.displayEmployees();
    this.displayMenu();
  }
  //list that displays all employees in the console with their name, age, salary, hours, pay, and employee type
  displayEmployees() {
    console.clear();
    console.log("My Wonderful Employees!");
    console.log("ID\tName\tAge\tSalary\tHours\tPay\tType");
    this.employees.forEach((emp, index) => {
      console.log(
        `${index + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary.toFixed(
          2
        )}\t${emp.hours ? emp.hours : "N/A"}\t${emp.payRate}\t${emp.type}`
      );
    });
  }
}
//IIFE for the main class that starts the employee tracker
(() => {
  const main = new Main();
})();
