// my API Key 4ec44032bc6307e6d5108c85f5016dc7

var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        popularMovies: [],
        votatedMovies: [],
        comingMovies: [],
        titleSearched: "",
        moviesSearched: [],
        
    },
    methods: {
        searchMovie: function (){
            var self = this;
            self.moviesSearched = [];
            
            axios
                .get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                        query: self.titleSearched,
                        language: 'it-IT',
                    }
                })
                .then(function (result) {
                    self.movies = result.data.results;
                });
            
        },
    },

    created: function () {
        var self = this;

        axios
            .get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                    language: 'it-IT',
                }
            })
            .then(function (result) {
                self.popularMovies = result.data.results;
            });

        axios
            .get('https://api.themoviedb.org/3/movie/top_rated', {
                params: {
                    api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                    language: 'it-IT',
                }
            })
            .then(function (result) {
                self.votatedMovies = result.data.results;
            });

        axios
            .get('https://api.themoviedb.org/3/movie/upcoming', {
                params: {
                    api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                    language: 'it-IT',
                }
            })
            .then(function (result) {
                self.comingMovies = result.data.results;
            });    
    },

});

