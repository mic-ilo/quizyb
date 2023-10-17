class UserModel {
  constructor(user) {
    this.user = user;
  }

  async addUser(user) {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (response.status === 400) {
        throw new Error("Username already exists");
      } else if (!response.ok) {
        throw new Error("Failed to add user"); // Change this error message
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error
    }
  }

  async login(username, password) {
    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });

      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      throw new Error("Failed to login", err);
    }
  }

  async updatePassword(newPassword, userId) {
    try {
      const user = {
        newPassword: newPassword,
      };

      const response = await fetch(
        `http://localhost:3000/user/update-password/${userId}`,
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(user), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("failed to update user");
      }
    } catch (err) {
      throw new Error("failed to update user", err);
    }
  }

  async deleteUser(userId) {
    try {
      const user = {
        userId: userId,
      };

      const response = await fetch(
        `http://localhost:3000/user/deactivate/${userId}`,
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(user), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("failed to delete user");
      }
    } catch (err) {
      throw new Error("failed to delete user", err);
    }
  }
}

const model = new UserModel();
export default model;
