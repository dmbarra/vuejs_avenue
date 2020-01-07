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

  extractMessageError: error => {
    return error["error"];
  }
};
