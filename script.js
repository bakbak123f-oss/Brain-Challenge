const vragen = [
    {
        vraag: "Hoeveel is 7 x 9 ?",
        antwoorden: ["69", "81", "97", "63"],
        goed: "63",
        type: "keuze"
    },
    {
        vraag: "Hoeveel is 12 x 5 ?",
        antwoorden: ["60", "80", "70", "90"],
        goed: "60",
        type: "keuze"
    },
    {
        vraag: "Hoeveel is 597 + 303 ?",
        antwoorden: ["685", "900", "745", "880"],
        goed: "900",
        type: "keuze"
    },
    {
        vraag: "Hoeveel is 550 : 11 ?",
        goed: "50",
        type: "invullen"
    },
    {
        vraag: "Hoeveel is 217 + 117 ?",
        goed: "334",
        type: "invullen"
    },
    {
        vraag: "Hoeveel is 15 x 15 ?",
        antwoorden: ["125", "142", "160", "225"],
        goed: "225",
        type: "keuze"
    },
    {
        vraag: "Hoeveel is 180 - 80 ?",
        antwoorden: ["100", "80", "90", "110"],
        goed: "100",
        type: "keuze"
    },
    {
        vraag: "Hoeveel is 20 x 20 ?",
        antwoorden: ["220", "400", "360", "420"],
        goed: "400",
        type: "keuze"
    },
    {
        vraag: "105 + 50 = 150",
        antwoorden: ["Waar", "Niet waar"],
        goed: "Niet waar",
        type: "keuze"
    },
    {
        vraag: "9 x 4 = 32",
        antwoorden: ["Waar", "Niet waar"],
        goed: "Niet waar",
        type: "keuze"
    },
    {
        vraag: "RER STUDIO is de beste gaming studio in de wereld",
        antwoorden: ["Waar", "Niet waar"],
        goed: "Waar",
        type: "keuze"
    },
    {
        vraag: "Hoeveel is 7 + 8 x 3 - 1 x 1 ?",
        goed: "30",
        type: "invullen"
    }
];

let huidigeVraag = 0;
let punten = 0;
let naam = "";
let gekozenAntwoord = "";

function startQuiz() {
    naam = document.getElementById("spelerNaam").value.trim();

    if (naam === "") {
        alert("Vul eerst je naam in!");
        return;
    }

    huidigeVraag = 0;
    punten = 0;

    document.getElementById("startPagina").style.display = "none";
    document.getElementById("eindPagina").style.display = "none";
    document.getElementById("quizPagina").style.display = "block";

    toonVraag();
}

function toonVraag() {
    let vraag = vragen[huidigeVraag];

    gekozenAntwoord = "";

    document.getElementById("vraagNummer").textContent =
        "Vraag " + (huidigeVraag + 1) + " van 12";

    document.getElementById("rekenVraag").textContent = vraag.vraag;
    document.getElementById("resultaat").textContent = "";
    document.getElementById("antwoorden").innerHTML = "";

    document.getElementById("beantwoordKnop").style.display = "inline-block";
    document.getElementById("volgendeKnop").style.display = "none";

    if (vraag.type === "invullen") {
        document.getElementById("antwoorden").innerHTML =
            '<input type="number" id="eigenAntwoord" placeholder="Jouw antwoord">';
    } else {
        for (let i = 0; i < vraag.antwoorden.length; i++) {
            let knop = document.createElement("button");

            knop.textContent = vraag.antwoorden[i];
            knop.className = "antwoord";

            knop.onclick = function () {
                gekozenAntwoord = this.textContent;

                let knoppen = document.getElementsByClassName("antwoord");

                for (let j = 0; j < knoppen.length; j++) {
                    knoppen[j].classList.remove("gekozen");
                }

                this.classList.add("gekozen");
            };

            document.getElementById("antwoorden").appendChild(knop);
        }
    }
}

function controleerAntwoord() {
    let vraag = vragen[huidigeVraag];
    let antwoord = gekozenAntwoord;

    if (vraag.type === "invullen") {
        let invoer = document.getElementById("eigenAntwoord");

        if (invoer.value.trim() === "") {
            alert("Vul eerst je antwoord in!");
            return;
        }

        antwoord = invoer.value.trim();
    } else if (antwoord === "") {
        alert("Kies eerst een antwoord!");
        return;
    }

    if (antwoord.toLowerCase() === vraag.goed.toLowerCase()) {
        punten++;
        document.getElementById("resultaat").textContent =
            "Goed gedaan, " + naam + "! Je verdient 1 punt.";
    } else {
        document.getElementById("resultaat").textContent =
            "Helaas, het goede antwoord is: " + vraag.goed;
    }

    document.getElementById("beantwoordKnop").style.display = "none";
    document.getElementById("volgendeKnop").style.display = "inline-block";
}

function volgendeVraag() {
    huidigeVraag++;

    if (huidigeVraag < vragen.length) {
        toonVraag();
    } else {
        toonEindPagina();
    }
}

function toonEindPagina() {
    document.getElementById("quizPagina").style.display = "none";
    document.getElementById("eindPagina").style.display = "block";

    let score = Math.round((punten / vragen.length) * 100);

    document.getElementById("eindScore").textContent =
        "Score: " + score + " / 100";

    document.getElementById("goedeAntwoorden").textContent =
        "Je hebt " + punten + " van de 12 vragen goed beantwoord, " + naam + "!";
}

function opnieuwSpelen() {
    huidigeVraag = 0;
    punten = 0;
    document.getElementById("eindPagina").style.display = "none";
    document.getElementById("quizPagina").style.display = "block";
    toonVraag();
}

function terugNaarMenu() {
    document.getElementById("eindPagina").style.display = "none";
    document.getElementById("startPagina").style.display = "block";
    document.getElementById("spelerNaam").value = naam;
}
