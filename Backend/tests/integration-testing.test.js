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

describe("Integration Testing", () => {
    // Test for User Model
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
            id: "integration-testing",
            password: "passforintegrate",
            name: "Integration",
            lastname: "Testing",
            user_address: "Working with Integration Testing",
            email: "randomly_generated_002@gmail.com",
            user_point: "0",
            role: "user",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly verifies a login attempt", async () => {
        const response01 = await checkLogin({
            id: "integration-testing",
        });
        const response02 = await checkLogin({
            id: "integration-testing-not-tested",
        });
        expect(response01.success).toBe(true);
        expect(response02.success).toBe(false);
    }, 10000);
    test("properly login a user", async () => {
        const response01 = await login({
            id: "integration-testing",
            password: "passforintegrate",
        });
        const response02 = await login({
            id: "integration-testing",
            password: "not-passforintegrate",
        });
        expect(response01.success).toBe(true);
        expect(response02.success).toBe(false);
    }, 10000);
    test("properly increments user points", async () => {
        const response = await pointIncrementer({
            id: "integration-testing",
            point: 50,
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly get user datas", async () => {
        const response01 = await login({
            id: "integration-testing-tested",
            password: "passforintegrate",
        });
        const response02 = await getUserData(response01.payload.token);
        expect(response02.success).toBe(true);
        expect(response02.payload.data.id).toEqual("integration-testing-tested");
    }, 10000);
    test("properly deletes a user", async () => {
        const response = await deleteUser({
            id: "integration-testing",
        });
        expect(response.success).toBe(true);
    }, 10000);

    // Test for Book Model
    test("properly inserts a book", async () => {
        const response = await insertBook({
            id: "integration-testing-id",
            name: "integration-testing-book",
            price: 100,
            publisher: "integration-testing-publisher",
            story: "integration-testing",
            synopsis: "integration-testing",
            cover_img: "integration-testing",
            author: ["integration-testing"],
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly updates a book", async () => {
        const response = await updateBook({
            oldId: "integration-testing-id",
            id: "integration-testing-id-updated",
            name: "integration-testing-book",
            price: 100,
            publisher: "integration-testing-publisher",
            story: "integration-testing",
            synopsis: "integration-testing",
            cover_img: "integration-testing",
            author: ["integration-testing"],
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets a specified book", async () => {
        const response = await getBookById({
            id: "integration-testing-id-updated",
        });
        expect(response.success).toBe(true);
        expect(response.payload.data.name).toEqual("integration-testing-book");
    }, 10000);
    test("properly gets all books", async () => {
        const response = await getAllBook();
        expect(response.success).toBe(true);
    }, 10000);
    test("properly deletes a book", async () => {
        const response = await deleteBook({
            id: "integration-testing-id-updated",
        });
        expect(response.success).toBe(true);
    }, 10000);

    // Test for Owned Book Model
    test("properly inserts a book to a specific user", async () => {
        const response = await buyBook({
            book_id: "1",
            user_id: "integration-testing-tested",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets user owned books", async () => {
        const response = await getOwnedBook("integration-testing-tested");
        expect(response.success).toBe(true);
    }, 10000);

    // Test for Reward Model
    test("properly inserts a reward", async () => {
        const response = await insertReward({
            id: "integration-testing-reward-id",
            name: "integration-testing-reward",
            price: "100",
            cover_img: "integration-testing-reward",
            in_stock: 1,
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly updates a reward", async () => {
        const response = await updateReward({
            oldId: "integration-testing-reward-id",
            id: "integration-testing-reward-id-updated",
            name: "integration-testing-reward",
            price: "100",
            cover_img: "integration-testing-reward",
            in_stock: 1,
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets a specific reward", async () => {
        const response = await getRewardById({
            id: "integration-testing-reward-id-updated",
        });
        expect(response.success).toBe(true);
    }, 10000);
    test("properly gets all rewards", async () => {
        const response = await getAllReward();
        expect(response.success).toBe(true);
    }, 10000);
    test("properly deletes a reward", async () => {
        const response = await deleteReward({
            id: "integration-testing-reward-id-updated",
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