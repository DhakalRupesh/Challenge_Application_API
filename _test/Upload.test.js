const axios = require("axios");
const baseurl = "http://localhost:3002/uploads";

describe("upload route test", () => {
    let token;
    test("image upload test", () => {
        return axios
        .post(baseurl + "/", {
            imageFile : "test"
        })
    })

});
