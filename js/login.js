import { hex_sha256 } from "./sha256.js";
import { conteudo } from "./script.js";

const password = "senha123";
const password_hash = hex_sha256(password);

let body = document.body;
let error = document.getElementById("error");

const login = (password) => {
    function set_login() {
        console.log("Login com sucesso");
        sessionStorage.setItem("login", "true");
    }

    if (hex_sha256(password) === password_hash) {
        set_login();
        window.location.href = "index.html";
        return true;
    }

    console.log("Login fracassado");
    conteudo(error, "Senha incorreta!")
    return false;
};

const handleLogin = () => {
    document.getElementById("btn_login").onclick = () => {
        const password = document.getElementById("senha").value;
        login(password);
    }
}

if (sessionStorage.getItem("login")) {
    window.location.href = "index.html";
} else {
    conteudo(
        body,
        `
         <h1>Login</h1>
    
            <label for="senha">Senha:</label>
            <input id="senha" type="password" name="senha" required>
            <button id="btn_login" type="submit">Entrar</button>
            <p id="error"></p>
            <p>A senha é: SENHA123</p>
    `)
    handleLogin();
}