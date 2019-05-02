// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
function set_introducao(text){
    localStorage.setItem("episode", text);
    $(".reading-animation").html(text);
};

function id_to_ep(id){
    let eps = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
    return eps[parseInt(id)];
};

$(document).ready(() => {
    let ep = localStorage.getItem("episode");
    if (ep) set_introducao(ep);
});

$.ajax({
    url: "https://swapi.co/api/films/",
    method: "get",
    success: response => {
        let $movie_ul = $("#movies ul");
        let movies = response.results.sort((a, b) => a.episode_id > b.episode_id);

        movies.forEach(film => {
			let $li = $("<li>", {
				"data-url-episode": film.url,
				text: "Episode " + id_to_ep(film.episode_id) + " : " + film.title
			});
			$movie_ul.append($li);
        });
    }
});

$("#movies ul").on("click", "li", function(e) {
    let url = $(e.target).data("url-episode");
    $.ajax({
        url: url,
        method: "get",
        success: response => {
			let ep = id_to_ep(response.episode_id);
			let text = "Episode " + ep + "\n" + response.title + "\n\n" + response.opening_crawl;
			set_introducao(text);
        }
    });
});
