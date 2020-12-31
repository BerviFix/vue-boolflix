// my API Key 4ec44032bc6307e6d5108c85f5016dc7

var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        tvShows: [],
        popularMovies: [],
        votatedMovies: [],
        comingMovies: [],
        moviesGenreList: [],
        showsGenreList: [],
        titleSearched: "",
        emptyResult: 1,
        suggestionSearch: 1,
        moviesGenre : "",
        showsGenre: "",
    },
    methods: {
        searchContent: function (){
            var self = this;
            self.movies = [];
            self.tvShows = [];
            self.emptyResult = 1;
            self.suggestionSearch = 0;
            self.moviesGenre = "";
            axios
                // chiamata ajax film
                .get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                        query: self.titleSearched,
                        language: 'it-IT',
                    }
                })
                .then(function (result) {
                    self.movies = result.data.results;
                    self.emptyResult = result.data.total_results;
                    const initialUrl = 'https://api.themoviedb.org/3/movie/';
                    const finalUrl = '/credits';

                    self.movies.forEach(
                        (element) => {
                            element.checkGenreMovies = true;
                            const rawVote = (element.vote_average) /2;
                            element.fullStar = Math.ceil(rawVote);

                            axios
                                // chiamata ajax cast film
                                .get(initialUrl + element.id + finalUrl, {
                                    params: {
                                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                                        language: 'it-IT',
                                    }
                                })
                                .then(function (result) {
                                    
                                    element.actors = [];
                                    element.cast = result.data.cast.slice(0, 5);
                                    
                                    for (let i = 0; i < element.cast.length; i++) {
                                        const actor = element.cast[i];
                                        element.actors.push(actor.name);
                                    }

                                });
                            // chiamata ajax  cast film\
                        },

                    );
                });
                // chiamata ajax film\

            
            axios
                // chiamata ajax serie tv
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                        query: self.titleSearched,
                        language: 'it-IT',
                    }
                })
                .then(function (result) {
                    self.tvShows = result.data.results;
                    self.emptyResult = result.data.total_results;

                    self.tvShows.forEach(
                        (element) => {
                            element.checkGenretvShows = true;
                            const rawVote = (element.vote_average) / 2;
                            element.fullStar = Math.ceil(rawVote);
                        }
                    );
                    
                });
                // chiamata ajax serie tv\
            
            
            if (self.titleSearched  == "") {
                self.suggestionSearch = 1;
            }
        },

        clickLogo: function () {
            var self = this;
            self.titleSearched = '';
            self.movies = [];
            self.tvShows = [];
            self.emptyResult = 1;
            self.suggestionSearch = 1;
        },

        // getVote: function (number) {
        //     return Math.ceil(number / 2);
        // },

        suggestionMovies: function () {
            var self = this;
            self.emptyResult = 1;
            self.movies = [];
            self.tvShows = [];
            self.moviesGenre = "";
            const initialUrl = 'https://api.themoviedb.org/3/movie/';
            const finalUrl = '/credits';
            axios
                // chiamata ajax film
                .get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                        query: self.titleSearched,
                        language: 'it-IT',
                    }
                })
                .then(function (result) {
                    self.movies = result.data.results;
                    self.emptyResult = result.data.total_results;

                    self.movies.forEach(
                        (element) => {
                            element.checkGenreMovies = true;
                            const rawVote = (element.vote_average) / 2;
                            element.fullStar = Math.ceil(rawVote);
                            
                            axios
                                // chiamata ajax cast film
                                .get(initialUrl + element.id + finalUrl, {
                                    params: {
                                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                                        language: 'it-IT',
                                    }
                                })
                                .then(function (result) {
                                   
                                    element.actors = [];
                                    element.cast = result.data.cast.slice(0, 5);

                                    for (let i = 0; i < element.cast.length; i++) {
                                        const actor = element.cast[i];
                                        element.actors.push(actor.name);
                                    }
                                    self.$forceUpdate();
                                });
                            // chiamata ajax cast film\
                        }
                    );
                });
                // chiamata ajax film\

            axios
                // chiamata ajax serie tv
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                        query: self.titleSearched,
                        language: 'it-IT',
                    }
                })
                .then(function (result) {
                    self.tvShows = result.data.results;
                    self.emptyResult = result.data.total_results;

                    self.tvShows.forEach(
                        (element) => {
                            element.checkGenretvShows = true;
                            const rawVote = (element.vote_average) / 2;
                            element.fullStar = Math.ceil(rawVote);
                        }
                    );
                });
        },

        moviesGenreCheck: function () {
            var self = this;
            if (self.moviesGenre == "") {
                for (let i = 0; i < self.movies.length; i++) {
                    self.movies[i].checkGenreMovies = true;
                }
            }

            if (self.moviesGenre != "") {
                for (let i = 0; i < self.movies.length; i++) {
                    self.movies[i].checkGenreMovies = self.movies[i].genre_ids.includes(self.moviesGenre);
                }
            }
        },

        showsGenreCheck: function () {
            var self = this;
            if (self.showsGenre == "") {
                for (let i = 0; i < self.tvShows.length; i++) {
                    self.tvShows[i].checkGenretvShows = true;
                }
            }

            if (self.showsGenre != "") {
                for (let i = 0; i < self.tvShows.length; i++) {
                    self.tvShows[i].checkGenretvShows = self.tvShows[i].genre_ids.includes(self.showsGenre);
                }
            }
        }
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

        axios
            // chiamata generi film
            .get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                    language: 'it-IT',
                }
            })
            .then(function (result) {
                self.moviesGenreList = result.data.genres;
            });

        
            // chiamata generi film\
        
        axios
            // chiamata generi serie tv
            .get('https://api.themoviedb.org/3/genre/tv/list', {
                params: {
                    api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                    language: 'it-IT',
                }
            })
            .then(function (result) {
                self.showsGenreList = result.data.genres;
            });


            // chiamata generi serie tv\

    },

});

