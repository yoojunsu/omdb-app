import { createWebHistory, createRouter } from "vue-router"
import Main from "@/components/Main.vue";
import Movies from "@/components/Movies.vue";
import MovieDetail from "@/components/MovieDetail.vue";

const routes = [
    {
        path: "/",
        component: Main,
    },
    {
        path: "/movies/",
        name: "movies",
        component: Movies,
        query: {
            search: "",
        }
    },
    {
        path: "/detail/",
        name: "detail",
        component: MovieDetail,
        query: {
            id: "",
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach( (to, from, next) => {
    window.scrollTo(0, 0);
    
    next();
});

export default router;