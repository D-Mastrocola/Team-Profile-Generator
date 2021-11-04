const Engineer = require('../lib/Engineer.js');
test('creates an employee object', () => {
  const engineer = new Engineer('Dominic' , 1, 'mastrodomcola@gmail.com', 'D-Mastrocola');

  expect(engineer.name).toBe("Dominic");
  expect(engineer.id).toEqual(expect.any(Number));
  expect(engineer.email).toBe('mastrodomcola@gmail.com');
  expect(engineer.github).toBe('D-Mastrocola');
})

test('test methods', () => {
  const engineer = new Engineer('Dominic' , 1, 'mastrodomcola@gmail.com', 'D-Mastrocola');

  expect(engineer.getName()).toBe("Dominic");
  expect(engineer.getId()).toEqual(expect.any(Number));
  expect(engineer.getEmail()).toBe('mastrodomcola@gmail.com');
  expect(engineer.getRole()).toBe('Engineer');
  expect(engineer.getGithub()).toBe('D-Mastrocola')
})