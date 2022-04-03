test("for future component testing", () => {
    const testPage = require("../views/layouts/home");
    global.window = Object.create(window);
    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
        value: {
            href: jest.href(),
        }
    });
    console.log(window.location.href);
    expect(true).toBe(true);
});