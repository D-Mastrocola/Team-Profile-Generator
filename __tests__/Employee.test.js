const Employee = require('../lib/Employee.js');
test('creates an employee object', () => {
  const employee = new Employee('Dominic' , 1, 'mastrodomcola@gmail.com');

  expect(employee.name).toBe("Dominic");
  expect(employee.id).toEqual(expect.any(Number));
  expect(employee.email).toBe('mastrodomcola@gmail.com')
})

test('test methods', () => {
  const employee = new Employee('Dominic' , 1, 'mastrodomcola@gmail.com');

  expect(employee.getName()).toBe("Dominic");
  expect(employee.getId()).toEqual(expect.any(Number));
  expect(employee.getEmail()).toBe('mastrodomcola@gmail.com');
  expect(employee.getRole()).toBe('Employee');
})