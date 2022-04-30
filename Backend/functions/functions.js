module.exports = {
    validateEmail: (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        };
        return false;
    },
    validatePassword: (password) => {
        if (password.length >= 8) {
            return true;
        }
        return false;
    },
    validateUser: (user) => {
        if (user.length >= 4) {
            return true;
        }
        return false;
    },
};