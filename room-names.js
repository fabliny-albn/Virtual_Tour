// Nomes das salas, na ordem do tour
const roomNames = [
    "Galeria Gilberto Gerlach",
    "Sala Militar",
    "Sala Indígena",
    "Sala de Arte Sacra",
    "Sala de Ofícios Antigos",
    "Galeria de Artes"
];

let currentRoom = 0;

const roomNameEl = document.getElementById("room-name");
const nextBtn = document.getElementById("next-image");
const prevBtn = document.getElementById("prev-image");

// Escreve o nome da sala atual na tela
function updateRoomName() {
    roomNameEl.innerText = roomNames[currentRoom];
}

// Próximo: avança um nome (depois do último, volta ao primeiro)
nextBtn.addEventListener("click", () => {
    currentRoom = (currentRoom + 1) % roomNames.length;
    updateRoomName();
});

// Anterior: volta um nome (antes do primeiro, vai ao último)
prevBtn.addEventListener("click", () => {
    currentRoom = (currentRoom - 1 + roomNames.length) % roomNames.length;
    updateRoomName();
});

// Mostra o nome da primeira sala ao abrir a página
updateRoomName();
