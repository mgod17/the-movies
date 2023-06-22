module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Actualiza la estructura de la tabla
    await queryInterface.dropTable("users");

    await queryInterface.createTable("users", {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
      },
      sessionToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Actualiza los registros existentes asignando valores para la columna "email"
    await queryInterface.bulkUpdate("users", {
      email: "example@example.com", // Cambia "example@example.com" por el valor que deseas asignar a los registros existentes
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revierte la actualización de la tabla
    await queryInterface.dropTable("users");

    // Vuelve a crear la tabla sin la columna "email" si es necesario
    await queryInterface.createTable("users", {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
      },
      sessionToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
};
