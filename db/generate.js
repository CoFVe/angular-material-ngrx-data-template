module.exports = () => {
  const faker = require("faker");
  const _ = require("lodash");
  const depts = ["Customer Support", "Engineering", "Sales"];

  return {
    people: _.times(100, (n) => {
      return {
        id: (n + 1).toString(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        departmentId: _.sample([1, 2, 3]).toString()
      };
    }),
    departments: _.times(3, (n) => {
      return {
        id: (n + 1).toString(),
        name: depts.shift()
      };
    })
  };
};
