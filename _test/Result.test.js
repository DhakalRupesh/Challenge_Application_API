const axios = require("axios");
const baseurl = "http://localhost:3002/result";
describe("Result Route Test", () => {
    let token;
    test("new result", () => {
        return axios
        .post(baseurl + "/", {
            ChallengeWon : "5efc8a8c7c36010d30075b07",
            WonBy : "5e997879257ee42d30615d87",
            confirmation: "waiting",
            proofing: "image goes here"
        })
    });

    test("get all result", () => {
        return axios
        .get(baseurl + "/", {
        })
        .then(response => {
            expect(response.status).toBe(200);
        });
    })

});