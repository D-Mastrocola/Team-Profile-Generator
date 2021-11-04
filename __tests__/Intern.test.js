const Intern = require('../lib/Intern.js');
test('creates an employee object', () => {
  const intern = new Intern('Dominic' , 1, 'mastrodomcola@gmail.com', 'Case Western');

  expect(intern.name).toBe("Dominic");
  expect(intern.id).toEqual(expect.any(Number));
  expect(intern.email).toBe('mastrodomcola@gmail.com')
  expect(intern.school).toBe('Case Western')
})

test('test methods', () => {
  const intern = new Intern('Dominic' , 1, 'mastrodomcola@gmail.com', 'Case Western');

  expect(intern.getName()).toBe("Dominic");
  expect(intern.getId()).toEqual(expect.any(Number));
  expect(intern.getEmail()).toBe('mastrodomcola@gmail.com');
  expect(intern.getRole()).toBe('Intern');
  expect(intern.getSchool()).toBe('Case Western');
})