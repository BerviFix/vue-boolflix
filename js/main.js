var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        titleSearched: "",
        moviesSearched: [],
        
    },
    methods: {
        searchMovie: function (){
            var self = this;
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

    mounted: function () {
    },

});

