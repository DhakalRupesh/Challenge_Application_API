const axios = require("axios");
const baseurl = "http://localhost:3002/challenge";

describe("challenge route test", () => {
    let token;
    test("add a new challenge", () => {
        return axios
        .post(baseurl + "/", {
            chType: "solo",
            chGame: "Mario",
            chAmt: "100"
        })
    })

    test("get all challenges", () => {
        return axios
        .get(baseurl + "/", {
        })
        .then(response => {
            expect(response.status).toBe(200);
        });
    })

    test("get one challenges", () => {
        return axios
        .get(baseurl + "/5f66b760e4d8c911d0f1dcae", {
        })
        .then(response => {
            expect(response.status).toBe(200);
        });
    })

    test("update one challenges", () => {
        return axios
        .put(baseurl + "/5f66b760e4d8c911d0f1dcae", {
            chType: "solo",
            chGame: "MarioBros",
            chAmt: "100"
        })
        .then(response => {
            expect(response.status).toBe(200);
        });
    })

});
