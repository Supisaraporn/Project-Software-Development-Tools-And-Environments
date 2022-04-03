const axios = require("axios");

test("properly registers an account", async () => {
    const response = await axios({
        method: "POST",
        url: "https://read-like-a-book-api.herokuapp.com/user/register",
        data: {
            id: "integration-testing",
            password: "passforintegrate",
            name: "Integration",
            lastname: "Testing",
            user_address: "Working with Integration Testing",
            email: "randomly_generated_002@gmail.com",
            user_point: "0",
            role: "user",
        },
    });
    expect(response.data.success).toBe(true);
}, 10000);
