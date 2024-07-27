class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}

class Manager extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.type = "manager";
  }

  calculatePay() {
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.type = "PT";
  }

  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

class Main {
  constructor() {
    this.employees = [];
    this.allEmployees();
  }

  allEmployees() {
    let employeeOne = new PartTime("Jenna", 25, 15, 25);
    employeeOne.calculatePay();
    this.employees.push(employeeOne);

    let employeeTwo = new Manager("Brianna", 38, 25, 40, 20);
    employeeTwo.calculatePay();
    this.employees.push(employeeTwo);

    let employeeThree = new PartTime("Austin", 24, 20, 12);
    employeeThree.calculatePay();
    this.employees.push(employeeThree);

    this.displayEmployees();
    this.displayMenu();
  }

  displayMenu() {
    let option = prompt(
      `Employee Tracker Menu:\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees`
    );
    switch (option) {
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

  addEmployee() {
    let name = prompt("Enter the employee's name:");
    let age = parseInt(prompt("Enter the employee's age:"));
    let payRate = parseFloat(prompt("Enter the employee's pay rate:"));
    let hours = parseFloat(prompt("Enter the number of hours per week:"));

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

  displayEmployees() {
    console.clear();
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

(() => {
  const main = new Main();
})();
