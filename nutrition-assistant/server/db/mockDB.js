// Mock in-memory database for testing when MongoDB is not available
// This provides basic CRUD operations for Users

const mockUsers = new Map();
let userIdCounter = 1;

const mockDB = {
  // Create user
  createUser: async (userData) => {
    // Check for duplicates
    for (const [, user] of mockUsers) {
      if (user.email === userData.email) {
        throw new Error("User with that email already exists");
      }
      if (user.username === userData.username) {
        throw new Error("User with that username already exists");
      }
    }

    const newUser = {
      _id: userIdCounter++,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers.set(newUser._id, newUser);
    return newUser;
  },

  // Find user by email
  findUserByEmail: async (email) => {
    for (const [, user] of mockUsers) {
      if (user.email === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  },

  // Find user by ID
  findUserById: async (id) => {
    return mockUsers.get(id) || null;
  },

  // Find user by email or username
  findUserByEmailOrUsername: async (email, username) => {
    for (const [, user] of mockUsers) {
      if (user.email === email.toLowerCase() || user.username === username) {
        return user;
      }
    }
    return null;
  },

  // Update user
  updateUser: async (id, updates) => {
    const user = mockUsers.get(id);
    if (!user) throw new Error("User not found");

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };

    mockUsers.set(id, updatedUser);
    return updatedUser;
  },

  // Get all users
  getAllUsers: async () => {
    return Array.from(mockUsers.values());
  },

  // Clear all data (for testing)
  clear: () => {
    mockUsers.clear();
    userIdCounter = 1;
  },
};

module.exports = mockDB;
