const Manager = require('../lib/Manager.js');
test('creates an employee object', () => {
  const manager = new Manager('Dominic' , 1, 'mastrodomcola@gmail.com', 1);

  expect(manager.name).toBe("Dominic");
  expect(manager.id).toEqual(expect.any(Number));
  expect(manager.email).toBe('mastrodomcola@gmail.com');
  expect(manager.officeNumber).toEqual(expect.any(Number));
  
});

test('test methods', () => {
  const manager = new Manager('Dominic' , 1, 'mastrodomcola@gmail.com');

  expect(manager.getName()).toBe("Dominic");
  expect(manager.getId()).toEqual(expect.any(Number));
  expect(manager.getEmail()).toBe('mastrodomcola@gmail.com');
  expect(manager.getRole()).toBe('Manager');
})