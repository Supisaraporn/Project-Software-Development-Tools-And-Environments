const {
    validateEmail,
    validateUser,
    validatePassword,
} = require("../functions/functions");

describe("Unit Testing", () => {
    test("properly validates an email", () => {
        expect(validateEmail("unit-testing-00@gmail.com")).toBe(true);
        expect(validateEmail("unit-testing-00@kmitl.ac.th")).toBe(true);
        expect(validateEmail("unittesting00@outlook.com")).toBe(true);
        expect(validateEmail("unit-testing-00@hotmail.com")).toBe(true);
        expect(validateEmail("unit-testing-00@gmail.ac.ac.acac")).toBe(false);
        expect(validateEmail("unit-testing-00@")).toBe(false);
        expect(validateEmail("unit!^#&00@gmail.com")).toBe(false);
        expect(validateEmail("unit!^#&00@gmail")).toBe(false);
    });

    test("properly checks a username input", () => {
        expect(validateUser("unit-testing-00")).toBe(true);
        expect(validateUser("unit")).toBe(true);
        expect(validateUser("u")).toBe(false);
        expect(validateUser("uni")).toBe(false);
    });

    test("properly checks a password input", () => {
        expect(validatePassword("unit-testing-00")).toBe(true);
        expect(validatePassword("unit-testing")).toBe(true);
        expect(validatePassword("unit")).toBe(false);
        expect(validatePassword("unit-te")).toBe(false);
    });
});
