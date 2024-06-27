export default function validUsername(username) {
    const digits = "0123456789";
    return (
        username &&
        username.length >= 8 &&
        username
            .slice(-4)
            .split("")
            .every((char) => digits.includes(char)) &&
        !username.includes(" ")
    );
}
