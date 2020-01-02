import { http } from "@/client/config";

export default {
  generateToken: (username, password) => {
    return http
      .post("/login", {
        username: username,
        password: password
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        throw error;
      });
  },
  extractMessageError: error => {
    return error["error"];
  }
};
