// my API Key 4ec44032bc6307e6d5108c85f5016dc7

var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        tvShows: [],
        popularMovies: [],
        votatedMovies: [],
        comingMovies: [],
        titleSearched: "",
        emptyResult: 1,
        suggestionSearch: 1,
    },
    methods: {
        searchContent: function (){
            var self = this;
            self.movies = [];
            self.tvShows = [];
            self.emptyResult = 1;
            self.suggestionSearch = 0;
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
                            const rawVote = (element.vote_average) /2;
                            element.fullStar = Math.ceil(rawVote);
                        }
                    );

                });
                // chiamata ajax film\

            axios
                // chiamata ajax cast film
                .get('https://api.themoviedb.org/3/movie/this.movies.id/credits', {
                    params: {
                        api_key: "4ec44032bc6307e6d5108c85f5016dc7",
                        language: 'it-IT',
                    }
                })
                .then(function (result) {
                    self.movies.forEach(
                        (element) => {
                            element.cast = result.data.cast;
                        }
                    );

                });
                // chiamata ajax  cast film\

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
                            const rawVote = (element.vote_average) / 2;
                            element.fullStar = Math.ceil(rawVote);
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
                            const rawVote = (element.vote_average) / 2;
                            element.fullStar = Math.ceil(rawVote);
                        }
                    );
                });
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

    },

});

