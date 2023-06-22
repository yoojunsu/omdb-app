import { createStore } from "vuex";
import Movie from "./modules/movie";

export default createStore({
    modules: {
        Movie: Movie,
    }
});
