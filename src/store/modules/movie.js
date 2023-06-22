import axios from "axios";
import router from "@/router";

//movie vuex module 
const MY_API_KEY = process.env.VUE_APP_API_KEY;

const state = {
    Movies: [],
    MovieDetail: null,
    MovieId: "",
    MoviesTotal: "",
    Search: "",
    PageNum: 1,
    SearchResult: "",
    MoreBtnShow: true,
    isLoading: false,
};

const mutations = {
    setUserSearch(state,payload) {
        state.Search = payload;
        localStorage.setItem('userSearchData',payload);
    },

    getUserSearchData(state) {
        const getUserSavedSearchData = localStorage.getItem('userSearchData');
        if(getUserSavedSearchData) {
            state.Search = getUserSavedSearchData;
        }
    },

    setMovies(state, { result, total, response }) {
        if(result === undefined || response === "False") {
            state.SearchResult = "error";
        } else {
            state.SearchResult = "movieList";
            state.MoviesTotal = total;
        }

        state.Movies = result;
    },

    addMoreMovie(state, payload) {
        if(payload === undefined) {
            return state.MoreBtnShow = false;
        } else {
            state.MoreBtnShow = true;
        }

        state.PageNum++;
        state.Movies = state.Movies.concat(payload);

    },

    setLoading(state,payload) {
        state.isLoading = payload;
    },

    setMovieDetailInfo(state,{id,data}) {
        state.MovieId = id;
        state.MovieDetail = data;
        localStorage.setItem('MovieId',id);
        localStorage.setItem('MovieItem',JSON.stringify(data));
    },

    getSavedMovieData(state) {
        const getSavedMovieIdData = localStorage.getItem('MovieId');
        const savedMovieData = localStorage.getItem('MovieItem');
        const getSavedMovieData = JSON.parse(savedMovieData);
        state.MovieId = getSavedMovieIdData;
        state.MovieDetail = getSavedMovieData
    },

    pageNumReset(state) {
        state.PageNum = 1
    },

    MoreBtnShowHide(state,payload) {
        state.MoreBtnShow = payload;
    }
}

const actions = {
    async getMovie({commit}) {
        commit('setLoading',true);

        try {
            commit('pageNumReset');
            
            const res = await axios.get('http://www.omdbapi.com/', {
                params: {
                    apikey: MY_API_KEY,
                    s: state.Search,
                    page: state.PageNum,
                }
            });

            commit('setMovies', 
                {
                    result: res.data.Search,
                    total: res.data.totalResults,
                    response: res.data.Response,
                }
            );

            if(res.data.Search.length <= 8) {
                return commit('MoreBtnShowHide',false);
            } else {
                return commit('MoreBtnShowHide',true);
            }

        } catch(err) {
            console.log(err)
        } finally {
            router.push({ name: "movies", query: {search: state.Search}});
            commit('setLoading',false);
        }
    },

    async getMoreMovie({commit}) {
        commit('setLoading',true);
        try {
            const res = await axios.get('http://www.omdbapi.com/', {
                params: {
                    apikey: MY_API_KEY,
                    s: state.Search,
                    page: state.PageNum + 1,
                }
            });

            commit('addMoreMovie',res.data.Search);
        } catch(err) {
            console.log(err);
        } finally {
            commit('setLoading',false);
        }
    },

    async getMovieDetail({commit}) {
        commit('setLoading',true);
        commit('getSavedMovieData');
        await axios.get(`http://www.omdbapi.com/`, {
            params: {
                apikey: MY_API_KEY,
                i: state.MovieId,
                plot: "full"
            }
        }).then( (res) => {
            commit('setMovieDetailInfo',{
                id: res.data.imdbID,
                data: res.data
            });
        }).catch( (err) => {
            console.log(err);
        }); 
        commit('setLoading',false);
    },
}

export default {
    namespaced: true,
    state, 
    mutations, 
    actions
};