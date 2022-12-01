const albumSelect = document.getElementById("albumSelect");
const selectedSongsEl = document.getElementById("selectedSongs")


const albumEnima = [
    {navn: "Stinkfist", lydfil: "stinkfist.mp3"},
    {navn: "Forty Six & 2", lydfil: "fortysixandtwo.mp3"}
];
const albumDays = [
    {navn: "Vicarious", lydfil: "vicarious.mp3"},
    {navn: "Rosetta Stoned", lydfil: "rosettastoned.mp3"},
    {navn: "Right in Two", lydfil: "rightintwo.mp3"},
];



albumSelect.addEventListener("change", albumClick);

function albumClick() {
    let albumSelected = albumSelect.value

    if (albumSelected=="enima") {
        console.log(albumSelected)
        ifEnima();
        play(albumEnima);
    }
    if(albumSelected=="days") {
        console.log(albumSelected)
        ifDays();
        play(albumDays);
    }
}


function ifEnima() {
    selectedSongsEl.innerHTML = ""
    for (var i=0; i < albumEnima.length; i++) {
        let divTag = document.createElement("div");
        let audioTag = document.createElement("audio");
        let pTag = document.createElement("p");

        let iTag = document.createElement("i");
        iTag.setAttribute("class", "fa fa-play");

        pTag.innerHTML = albumEnima[i].navn;
        pTag.appendChild(iTag);

        audioTag.setAttribute("src", "vedlegg/" + albumEnima[i].lydfil);

        divTag.setAttribute("id", i);
        divTag.appendChild(pTag);
        divTag.appendChild(audioTag);
        selectedSongsEl.appendChild(divTag);
    }

}

function ifDays() {
    selectedSongsEl.innerHTML = ""
    for (var i=0; i < albumDays.length; i++) {
        let divTag = document.createElement("div");
        let audioTag = document.createElement("audio");
        let pTag = document.createElement("p");

        let iTag = document.createElement("i");
        iTag.setAttribute("class", "fa fa-play");

        pTag.innerHTML = albumDays[i].navn;
        pTag.appendChild(iTag);

        audioTag.setAttribute("src", "vedlegg/" + albumDays[i].lydfil);

        divTag.setAttribute("id", i);
        divTag.appendChild(pTag);
        divTag.appendChild(audioTag);
        selectedSongsEl.appendChild(divTag);
    }
}
function play(album) {
    for (var i=0; album.length; i++) {
            let songClick = document.getElementById(i);
            songClick.addEventListener("click", function() {
            audioFile = songClick.getElementsByTagName("audio");
            playButton = songClick.getElementsByTagName("i");

            if(audioFile.paused) {
                audioFile.play;
                //playButton.classList.remove("fa fa-play")
                //playButton.classList.add("fa fa-pause");
  

            } else {
                audioFile.pause;
                //playButton.classList.remove("fa fa-pause");
                //playButton.classList.add("fa fa-play")
            }
        });

    }
}