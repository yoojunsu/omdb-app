<template>
    <section class="movie-section" v-if="SearchResult === 'movieList'">
        <div class="section-inner">
            <p class="search-total-txt">
                검색한 영화의 총 갯수는 {{ MoviesTotal }}개 입니다.
            </p>
            <ul class="movie-list">
                <li class="movie"
                v-for="(movie,i) in Movies" 
                :key="i" @click="getChoiceMovieDetail(movie.imdbID,movie)">
                    <div class="thumb">
                        <img 
                        :src="movie && movie.Poster !== 'N/A' ? movie.Poster : 'https://www.prokerala.com/movies/assets/img/no-poster-available.webp'" 
                        alt="" 
                        />
                    </div>
                    <div class="info">
                        <h3 class="name" v-if="movie && movie.Title">
                            {{ movie.Title }}
                        </h3>
                        <p class="year" v-if="movie && movie.Year">
                            {{ movie.Year }}
                        </p>
                    </div>
                </li>
            </ul>
            
            <div class="more-btn-wrap" v-if="MoreBtnShow === true">
                <button type="button" id="moreBtn" @click="loadMoreMovies()">
                    MORE
                </button>
            </div>
        </div>
    </section>

    <section class="notfound-section" v-else-if="SearchResult === 'error'">
        <div class="section-inner">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p class="notfound-txt">No Result</p>
        </div>
    </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    name: "Movie",
    computed: {
        ...mapState('Movie', ['Search','Movies','SearchResult','MoviesTotal','MoreBtnShow','SearchResult'])
    },
    methods: {
        ...mapMutations('Movie', ['setMovieDetailInfo']),
        ...mapActions('Movie', ['getMovie','getMoreMovie','getMovieDetail']),

        getChoiceMovieDetail(id,data) {
            this.setMovieDetailInfo({id: id, data: data});
            this.getMovieDetail();
            this.$router.push({ name: 'detail', query: {id: id}})
        },
        
        async loadMoreMovies() {
            await this.getMoreMovie();
        },

    },

    mounted() {
        if(!this.Search.trim()) {
            return this.$router.push('/');
        } else {
            return this.getMovie();
        }
    },
}
</script>

<style scoped>
.movie-section {
    min-height: calc(91vh - -1px);
    padding: 50px 0; 
}
.section-inner {
    max-width: 850px;
}

.search-total-txt {
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 30px;
}
.movie-list {
    display: grid;
    grid-template-areas: ". . .";
    grid-auto-columns: 1fr;
    grid-gap: 50px 30px;
}

.movie {
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.thumb {
    width: 100%;
    height: 0;
    padding-bottom: calc(413 / 300 * 100%);
    position: relative;
}

.thumb img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.info {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 25px 15px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.8);
}

.info .name,
.info .year {
    color: #fff;
    word-break: keep-all;
}

.info .name {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 7px;
}

.info .year {
    font-size: 1.3rem;
}

.more-btn-wrap {
    margin-top: 50px;
}

#moreBtn {
    border: 2px solid #fff;
    border-radius: 20px;
    background: transparent;
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    padding: 15px 0;
    width: 100%;
    transition: all 0.2s;
}

#moreBtn:hover {
    background: #fff;
    color: #000;
}

.notfound-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(91vh - -1px);
}

.notfound-section .notfound-txt,
.notfound-section i {
    color: #999;
    font-size: 3rem;
}

.notfound-section .notfound-txt {
    font-size: 5rem;
    font-weight: 500;
    
}
</style>