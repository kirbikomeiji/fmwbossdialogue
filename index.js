function onInit() {
    document.querySelectorAll('.chapter_button').forEach((button) => {
        if (document.getElementById(button.innerHTML) !== null)
            button.style.display = 'inline-block';
        else
            button.style.display = 'none';
    });
    document.querySelectorAll('.chapters').forEach((dialogue) => {

        if(document.querySelector(`#b_${dialogue.title.toLowerCase()}`))
            document.querySelector(`#b_${dialogue.title.toLowerCase()}`).style.display = 'inline-block';
    });
    let path = window.location.pathname;
    name =  path.substring(path.lastIndexOf('/') + 1, path.length - 5);
    name =  String(name[0]).toUpperCase() + String(name).slice(1);
    document.querySelector('#title').innerHTML = `${name} <img src="./dialogue/face_${name}0a.png">`;
}

function showChapter(id) {
    document.getElementById('chapter_header').innerHTML = "Chapter " + id;

    document.querySelectorAll('.character_button').forEach((button) => {
        button.style.display = 'none';
    });
    document.querySelectorAll('.chapters').forEach((chapter) => {
        if (chapter.id === id) {
            chapter.style.display = "inline-block";

            chapter.querySelectorAll('.dialogue').forEach((dialogue) => {
                document.querySelector(`#b_${dialogue.title.toLowerCase()}`).style.display = 'inline-block';
            });
        } else
            chapter.style.display = "none";
    });
    document.querySelectorAll('.dialogue').forEach((char) => {
        char.style.display = "none";
    });
}

function showchar(id) {
    document.querySelectorAll('.dialogue').forEach((char) => {
        console.log(id);

        if (char.title === id) {
            char.style.display = "inline-block";
        } else
            char.style.display = "none";
    });
}

