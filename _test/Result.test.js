const axios = require("axios");
const baseurl = "http://localhost:3002/user";
describe("Users Route Test", () => {
  let token;
  test("sign up of new user", () => {
    return axios
      .post(baseurl + "/register", {
        fname: "rupesh dhakal",
        email: "test@gmail.com",
        uname: "rupesh",
        pass: "dhakal",
        amt: "123",
        amt: "123",
        amt: "123",
        phone: "123456789",
        proImg: "image"
      })
      // .then(response => {
      //   expect(response.data.status).toMatch("Signup success!");
      // })
      // .catch(err => {
      //   expect(err.response.status).toBe(500);
      //   expect(err.response.data.status).toMatch("Username already exists!");
      // });
  });

  test("login of existing user", () => {
    return axios
      .post(baseurl + "/login", {
        uname: "rupesh",
        pass: "dhakal"
      })
      .then(response => {
        token = response.data.token;
        expect(response.status).toBe(200);
        expect(response.data.status).toMatch("Login success!");
      })
      .catch(err => {
        expect(err.response.status).toBe(500);
      });
  });
  
  test("User should be able to view profile", () => {
    return axios
      .get(baseurl + "/retriveme", {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
});