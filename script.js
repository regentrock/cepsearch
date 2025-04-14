window.addEventListener("load", () => {
    const fields = ["cep", "street", "number", "bairro", "city", "state"];
    fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value) {
            document.getElementById(field).value = value;
        }
    });
});

function LocalStorageSave(event) {
    const campo = event.target;
    localStorage.setItem(campo.id, campo.value);
}

["cep", "street", "number", "bairro", "city", "state"].forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener("input", LocalStorageSave);
});

document.getElementById("cep").addEventListener("blur", (event) => {
    const element = event.target;
    const cepInput = element.value;

    if (!(cepInput.length === 8)) {
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById("street").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("city").value = data.localidade;
                document.getElementById("state").value = data.uf;

                localStorage.setItem("street", data.logradouro);
                localStorage.setItem("bairro", data.bairro);
                localStorage.setItem("city", data.localidade);
                localStorage.setItem("state", data.uf);
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar CEP: ", error));
});
