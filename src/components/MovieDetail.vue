<template>
    <section class="detail-section">
        <div class="section-inner">
            <div class="btn-wrap">
                <button type="button" id="backBtn" @click="$router.back(-1)">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span>BACK</span>
                </button>
            </div>
            <div class="movie-info-wrap">
                <div class="movie-poster-box">
                    <img 
                    :src="MovieDetail && MovieDetail.Poster !== 'N/A' ? MovieDetail.Poster: `https://www.prokerala.com/movies/assets/img/no-poster-available.webp`" 
                    alt="" 
                    />
                </div>
                <div class="movie-info-box">
                    <h2 class="movie-title">
                        {{ MovieDetail.Title }}
                    </h2>

                    <ul class="movie-score">
                        <li class="score">
                            <b class="score-name">Score :</b> 
                            <br />
                            <span class="score-content">
                                {{ MovieDetail.Metascore }}
                            </span>
                        </li>
                        <li class="score">
                            <b class="score-name">Rating :</b>
                            <br />
                            <span class="score-content">
                                {{ MovieDetail.imdbRating }}
                            </span>
                        </li>
                        <li class="score">
                            <b class="score-name">Votes :</b>
                            <br />
                            <span class="score-content">
                                {{ MovieDetail.imdbVotes }}
                            </span>
                        </li>
                    </ul>

                    <ul class="movie-info">
                        <li class="info">
                            <b class="info-name">Year :</b>
                            <span class="info-content">
                                {{ MovieDetail.Year }}
                            </span>
                        </li>
                        <li class="info">
                            <b class="info-name">Rated :</b>
                            <span class="info-content">
                                {{ MovieDetail.Rated }}
                            </span>
                        </li>
                        <li class="info">
                            <b class="info-name">Genre</b>
                            <span class="info-content">
                                {{ MovieDetail.Genre }}
                            </span>
                        </li>
                        <li class="info">
                            <b class="info-name">Runtime :</b>
                            <span class="info-content">
                                {{ MovieDetail.Runtime }}
                            </span>
                        </li>
                        <li class="info" v-if="MovieDetail.Director && MovieDetail.Director !== 'N/A'">
                            <b class="info-name">Director :</b>
                            <span class="info-content">
                                {{ MovieDetail.Director }}
                            </span>
                        </li>

                        <li class="info">
                            <b class="info-name">Actors :</b>
                            <span class="info-content">
                                {{ MovieDetail.Actors }}
                            </span>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="movie-plot-box">
                <p class="movie-plot">
                    {{ MovieDetail.Plot !== 'N/A' ? MovieDetail.Plot: `Sorry, there's no content prepared` }}
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: "MovieDetail",
    computed: {
        ...mapState('Movie',['MovieDetail','MovieId']),
    },
    methods: {
        ...mapActions('Movie',['getMovieDetail']),
    },

    async created() {
        this.getMovieDetail();
    },
}
</script>

<style scoped>

    .btn-wrap {
        text-align: left;
    }
    
    #backBtn {
        display: flex;
        align-items: center;
        gap: 0 7px;
        background: transparent;
        margin-bottom: 50px;
        text-align: left;
        color: #fff;
    }

    #backBtn i,
    #backBtn span {
        font-size: 2rem;
    }

    .movie-title,b,span {
        color: #fff;
    }
    .detail-section {
        min-height: calc(91vh - -1px);
        padding: 75px 0;
    }

    .section-inner {
        max-width: 1300px;
    }

    .movie-info-wrap {
        display: flex;
        align-items: center;
        gap: 35px 50px;
        max-width: 75%;
        margin: 0 auto;
    }

    .movie-poster-box,
    .movie-info-box {
        width: 100%;
    }

    .movie-poster-box {
        max-width: 35%;
    }

    .movie-title {
        font-size: 3rem;
        word-break: keep-all;
        margin-bottom: 30px;
        letter-spacing: 0;
    }

    .movie-score {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }

    .score {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        padding: 25px 0;
    }

    .movie-score li .score-name {
        font-size: 1.4rem;
        margin-bottom: 10px;
    }

    .movie-score li .score-content {
        font-size: 1.8rem;
    }

    .movie-info {
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        padding: 35px 25px;
        text-align: left;
    }

    .info {
        display: flex; 
        gap: 0 8px;
        margin-bottom: 10px;
    }

    .info:last-child {
        margin-bottom: 0;
    }

    .info-name {
        width: 100%;
        max-width: 78px;
    }
    .info-name,
    .info-content {
        font-size: 1.8rem;
    }

    .movie-plot-box {
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        max-width: 75%;
        padding: 40px 20px;
        margin: 35px auto 0;
        text-align: left;
    }

    .movie-plot {
        color: #fff;
        font-size: 1.8rem;
        line-height: 1.6;
        word-break: keep-all;
    }

    @media screen and (max-width: 821px) {
        .movie-info-wrap {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    @media screen and (max-width: 421px) {
        .movie-info-wrap {
            max-width: 100%;
        }

        .movie-poster-box {
            max-width: 60%;
        }

        .movie-plot-box {
            max-width: 100%;
            margin-top: 20px;
        }
    }
</style>