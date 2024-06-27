export default function validPassword(password) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //const special = "!@#$%^&*()-_+=<>,./;:[]{}?|";
    const digits = "0123456789";
    return (
        password &&
        password.length >= 8 &&
        password.split("").some((char) => lowercase.includes(char)) &&
        password.split("").some((char) => uppercase.includes(char)) &&
        //password.split("").some((char) => special.includes(char)) &&
        password.split("").some((char) => digits.includes(char)) &&
        password[0] !== "a" &&
        password[0] !== 1
    );
}
