/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Alex",
          email: "1@1",
        },
        {
          username: "Bob",
          email: "2@2",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Messages",
      [
        { text: "Hello", Uid: 1 },
        { text: "Hi", Uid: 2 },
        { text: "How are you?", Uid: 1 },
        { text: "I am fine", Uid: 2 },
        { text: "What is your name?", Uid: 1 },
        { text: "My name is Alex", Uid: 2 },
        { text: "What is your phone number?", Uid: 1 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
