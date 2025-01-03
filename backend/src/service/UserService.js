const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      if (!userData || !userData.name) {
        throw new Error("Invalid user data");
      }
      // Simulate user creation logic
      resolve(`User ${userData.name} created successfully`);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createUser };
