function onInit() {
    document.querySelectorAll('.chapter_button').forEach((button) => {
        if (document.getElementById(button.title) !== null)
            button.style.display = 'inline-block';
        else
            button.style.display = 'none';
    });
    document.querySelectorAll('.chapters').forEach((dialogue) => {

        if (document.querySelector(`#b_${dialogue.title.toLowerCase()}`))
            document.querySelector(`#b_${dialogue.title.toLowerCase()}`).style.display = 'inline-block';
    });
    let path = window.location.pathname;
    name = path.substring(path.lastIndexOf('/') + 1, path.length - 5);
    name = String(name[0]).toUpperCase() + String(name).slice(1);
    document.querySelector('#title').innerHTML = `${name} <img src="./dialogue/face_${name}0a.png">`;

    var url = new URL(window.location.href);
    var chapter = url.searchParams.get("chapter");
    var character = url.searchParams.get("character");

    if (chapter != null) {
        showChapter(chapter);
        if (character != null)
            showchar(character);
    }
}

let chapter_names = {
    "01Reimu": "Wonderful Shrine Maiden of Paradise",
    "01Marisa": "Departure",
    "02Reimu": "Visitor to the Human Village",
    "02Marisa": "Magicians and Lies",
    "03Common": "Silver Servant",
    "04Reimu": "Battle Amidst the Mist",
    "04Marisa": "Magicannon! Master Spark",
    "05Reimu": "Hurricane! Whirlwind! Aya Shameimaru!",
    "05Marisa": "Daiyousei SOS",
    "06Common": "Turmoil on the Lake (Part 1)",
    "07Common": "Turmoil on the Lake (Part 2)",
    "08Common": "Scarlet Boundary",
    "09Common": "Trap in the Great Library",
    "10Common": "Humans and Youkai",
    "11Common": "Eternally Young Scarlet Moon",
    "12Common": "Summer Villa",
    "13Reimu": "Echoing Bell of the Wind God",
    "13Marisa": "Sister of Scarlet",
    "14Common": "Into the Depths of Maddening Darkness",
    "15Common": "Scarlets",
    "16Common": "Revisit",
    "17Common": "The Mountain Where Gods Reside",
    "18Reimu": "Don't Lay a Finger on that Human",
    "18Marisa": "Laying a Finger on the Scarlet Mansion",
    "19Common": "Invasion! The Sacred Mountain of Autumn",
    "20Reimu": "The Great Misfortune God's Calamity",
    "20Marisa": "The Far Shores of Friendship",
    "21Common": "The Visible Path",
    "22Common": "Faith is From the Transient Peoples",
    "23Common": "Ah/ Gods and Mortals on the Grounds of a Divine Lake",
    "24Common": "Danmaku Chugfest",
    "25Reimu": "A Winter for Young Maidens",
    "25Marisa": "Visitor in the Snow",
    "26Common": "Spring Snow",
    "27Common": "Yesterday's Enemies and Today's Enemies",
    "28Reimu": "Seasonal Tradition",
    "28Marisa": "Cave of Fantasy",
    "29Reimu": "Encounter",
    "29Marisa": "Closed Runaway",
    "30Common": "Cherry Blossom Barrier Above the Clouds (Part 1)",
    "31Common": "Cherry Blossom Barrier Above the Clouds (Part 2)",
    "32Common": "At the Brink of Death on Hakugyokuro's Staircase",
    "33Common": "The Perfect Blackened Cherry Blossoms",
    "34Common": "Offerings to the Fallen Flowers",
    "35Common": "Surfacing",
    "36Common": "Fugitive",
    "37Reimu": "Enticing Singing Voice in the Black of Night",
    "37Marisa": "A Star on Earth Fluttering in the Night Sky",
    "38Reimu": "UNDEFINED",
    "38Marisa": "Inaba of the Earth/ Inaba of the Moon",
    "39Reimu": "The Hakurei Barrier",
    "39Marisa": "The Kirisame Hakkero",
    "40Reimu": "SHOWDOWN: Reimu vs Marisa",
    "40Marisa": "SHOWDOWN: Marisa vs Reimu",
    "41Common": "The Engraver's History",
    "42Common": "The Eternal Cage Concealing the Princess",
    "43Common": "The Five Impossible Requests",
    "44Common": "And then/ There were None",
    "45Common": "A Glimpse at a Future Sky",
    "46Common": "Setting Sail to a Sea of Stars",
    "47Common": "Fantasy Maidens On the Moon",
    "48Common": "Watatsuki's Spellcard",
    "49Common": "G Free Shrine Maiden",
    "50Common": "Rise of the Earth Spirits",
    "51Common": "Thread of Resentment Sinking into Darkness",
    "52Common": "A Bridge to the Surface",
    "53Common": "Passing by the Palace of Earth Spirits",
    "54Common": "Hell's Artificial Sun",
    "55Common": "Twisted Tomorrow",
    "56Common": "Thawing Shrine",
    "57Common": "Ecstasy Unceasing",
    "58Common": "Dream of the Stray Dreamer",
    "59Common": "Once Parted Hands",
    "60Common": "Innocent Poison",
    "61Common": "Surprised?! Danmaku Best of Three",
    "62Common": "The Judge of Paradise",
    "63Common": "The Closed Eye of Love",
    "64Common": "A Conversation of the Heart",
    "65Common": "Mystic Voyage",
    "66Common": "Beyond the Seal",
    "67Common": "Ties Lasting a Thousand Years (Part One)",
    "68Common": "Ties Lasting a Thousand Years (Part Two)",
    "69Common": "Ill Omen",
    "70Common": "Manifesting Dreams",
    "71Common": "Towards the Abyss of Dreams and Illusions",
    "72Common": "Our Hisoutensoku",
    "73Common": "Gensokyo Nightmare",
    "74Common": "Tribute",
    "75Common": "The Flower that Remains in Fantasy",
    "76Common": "The Dream the Sheep See",
    "77Common": "At a Dream's Distant End",
    "01Sakuya": "The Moon/ the Sun/ and the Servant",
    "02Sakuya": "The Wavering Luna Dial",
    "03Sakuya": "The Knife in Her Palm",
    "04Sakuya": "The Perfect and Elegant Maid",
    "01OST": "Dream on the Moon",
    "02OST": "Recollection's Spellcard",
    "03OST": "Fantasy Maidens in Dream Space",
    "04OST": "After Dream Again Cleared",
    "01Meko": "Mehko in a Danmaku Battle",
    "02Meko": "Danmaku Raining on an Afternoon Tea Party",
    "03Meko": "Red and White Danmaku Teams",
    "04Meko": "Dreaming Lamb",
    "05Meko": "One Step Beyond the End",
}

function showChapter(id) {
    const url = new URL(window.location.href);
    url.searchParams.set('chapter', id);
    url.searchParams.delete('character');
    window.history.replaceState(null, null, url);

    document.getElementById('chapter_header').innerHTML = "Chapter " + id;
    if (chapter_names[id])
        document.getElementById('chapter_header').innerHTML = chapter_names[id];

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
    const url = new URL(window.location.href);
    url.searchParams.set('character', id);
    window.history.replaceState(null, null, url);
    document.querySelectorAll('.dialogue').forEach((char) => {
        if (char.title === id) {
            char.style.display = "inline-block";
        } else
            char.style.display = "none";
    });
}

