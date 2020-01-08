import { http } from "@/client/config";

export default {
  listUsers: () => {
    return http
      .get("/users")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        throw error;
      });
  },

  retrieveUser: id => {
    return http
      .get("/users/" + id)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        throw error;
      });
  },

  createUser: user => {
    return http
      .post("/users/", {
        username: user.username,
        password: user.first_password,
        email: user.email,
        name: user.name
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        throw error;
      });
  },

  extractMessageError: errors => {
    var array = [];
    if (errors["username"]) {
      array.push("Username " + errors["username"]);
    }
    if (errors["email"]) {
      array.push(errors["email"]);
    }

    return array;
  }
};
