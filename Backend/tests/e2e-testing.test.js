require("dotenv").config();

const {
    checkLogin,
    login,
    checkRegister,
    register,
    pointIncrementer,
    deleteUser,
    getUserData,
} = require("../model/user-model");

const {
    getAllBook,
    getBookById,
    insertBook,
    updateBook,
    deleteBook,
} = require("../model/book-model");

const {
    getOwnedBook,
    buyBook,
} = require("../model/owned-book-model");

const {
    getAllReward,
    getRewardById,
    insertReward,
    updateReward,
    deleteReward,
} = require("../model/reward-model");

const {
    getAllHistory,
    getAllUserHistory,
    addHistory,
} = require("../model/reward-history-model");

describe("E2E Testing", () => {
    test("properly verifies a registration", async () => {
        const response01 = await checkRegister({
            email: "randomly_generated_002@gmail.com",
        });
        const response02 = await checkRegister({
            id: "integration-testing-tested",
        });
        expect(response01.success).toBe(true);
        expect(response02.success).toBe(false);
    }, 10000);
    test("properly inserts a user", async () => {
        const response = await register({
            id: "e2e-testing",
            password: "passforintegrate",
            name: "E2E",
            lastname: "Testing",
            user_address: "Working with E2E Testing",
            email: "randomly_generated_002@gmail.com",
            user_point: "0",
            role: "user",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly verifies a login attempt", async () => {
        const response = await checkLogin({
            id: "e2e-testing",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly login a user", async () => {
        const response = await login({
            id: "e2e-testing",
            password: "passforintegrate",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly get user datas", async () => {
        const response01 = await login({
            id: "e2e-testing",
            password: "passforintegrate",
        });
        const response02 = await getUserData(response01.payload.token);
        expect(response02.success).toBe(true);
        expect(response02.payload.data.id).toEqual("e2e-testing");
    }, 10000);
    test("properly gets all books", async () => {
        const response = await getAllBook();
        expect(response.success).toBe(true);
    }, 10000);
    test("properly inserts a book", async () => {
        const response = await insertBook({
            id: "e2e-testing-id",
            name: "e2e-testing-book",
            price: 100,
            publisher: "e2e-testing-publisher",
            story: "e2e-testing",
            synopsis: "e2e-testing",
            cover_img: "e2e-testing",
            author: ["e2e-testing"],
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets a specified book", async () => {
        const response = await getBookById({
            id: "e2e-testing-id",
        });
        expect(response.success).toBe(true);
        expect(response.payload.data.name).toEqual("e2e-testing-book");
    }, 10000);
    test("properly inserts a book to a specific user", async () => {
        const response = await buyBook({
            book_id: "e2e-testing-id",
            user_id: "e2e-testing",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets user owned books", async () => {
        const response = await getOwnedBook("e2e-testing");
        expect(response.success).toBe(true);
    }, 10000);
    test("properly deletes a book", async () => {
        const response = await deleteBook({
            id: "e2e-testing-id",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly increments user points", async () => {
        const response = await pointIncrementer({
            id: "e2e-testing",
            point: 50,
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly inserts a reward", async () => {
        const response = await insertReward({
            id: "e2e-testing-reward-id",
            name: "e2e-testing-reward",
            price: "100",
            cover_img: "e2e-testing-reward",
            in_stock: 1,
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets a specific reward", async () => {
        const response = await getRewardById({
            id: "e2e-testing-reward-id",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets all rewards", async () => {
        const response = await getAllReward();
        expect(response.success).toBe(true);
    }, 10000);
    test("properly deletes a reward", async () => {
        const response = await deleteReward({
            id: "e2e-testing-reward-id",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly deletes a user", async () => {
        const response = await deleteUser({
            id: "e2e-testing",
        });
        expect(response.success).toBe(true);
    }, 10000);


    // // Test for Reward History Model
    // test("properly adds a reward history to a specific user", async () => {
    //     const response01 = await login({
    //         id: "integration-testing-tested",
    //         password: "passforintegrate",
    //     });
    //     const response02 = await addHistory({
    //         id: "integration-testing-reward-id-updated",
    //     });
    //     expect(response02.success).toBe(true);
    // }, 10000);
    // test("properly gets all reward history of a specific user", async () => {
    //     const response01 = await login({
    //         id: "integration-testing-tested",
    //         password: "passforintegrate",
    //     });
    //     const response02 = await getAllUserHistory({
    //         id: "integration-testing-reward-id-updated",
    //     });
    //     expect(response02.success).toBe(true);
    // }, 10000);
    // test("properly gets reward history of all users", async () => {
    //     const response = await getAllHistory();
    //     expect(response.success).toBe(true);
    // }, 10000);

});