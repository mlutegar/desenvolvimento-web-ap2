import { hex_sha256 } from "./sha256.js";

const password = "senha123";
const password_hash = hex_sha256(password);

let error = document.getElementById("error");

const login = (password) => {
    if (hex_sha256(password) === password_hash) {
        console.log("Login com sucesso");
        sessionStorage.setItem("login", "true");
        window.location.href = "index.html";
        return true;
    }

    console.log("Login fracassado");
    error.innerHTML = "Senha incorreta!";
    return false;
};

const handleLogin = () => {
    document.getElementById("btn_login").onclick = () => {
        const password = document.getElementById("senha").value;
        login(password);
    }
}

handleLogin();

if (sessionStorage.getItem("login")) {
    window.location.href = "index.html";
}