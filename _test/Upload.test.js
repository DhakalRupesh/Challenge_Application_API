const axios = require("axios");
const baseurl = "http://localhost:3002/uploads";

describe("upload route test", () => {
    let token;
    test("add a new challenge", () => {
        return axios
        .post(baseurl + "/", {
            imageFile : "test"
        })
    })

});
