let body = document.body;

const handleLogout = () => {
    let btnLogout = document.getElementById("btn_logout");
    btnLogout.onclick = () => {
        sessionStorage.removeItem("login");
        window.location.href = "login.html";
    }
}

if (!sessionStorage.getItem("login")) {
    body.innerHTML = `
    <h1>Você não está logado!</h1>
    <button id="btn_login">Login</button>
    `;
} else {
    body.innerHTML = `
    <h1>Logado com sucesso!</h1>
    <button id="btn_logout">Logout</button>
    `;
}

handleLogout();