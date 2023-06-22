<template>
    <header>
        <div class="header-inner">
            <div class="left">
                <h1>
                    <router-link to="/">
                        <span>OMDb</span>
                        Movie
                    </router-link>
                </h1>
            </div>
            <div class="right">
                <input type="text" 
                class="search-input" 
                placeholder="Search Your Movie!"
                :value="Search"
                @input="updateSearchValue($event.target.value)"
                @keyup.enter="activeUserSearch"/>
                <button type="button" 
                class="search-btn"
                @click="activeUserSearch">Search</button>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: "SearchHeader",
    computed: {
        ...mapState(['Search']),
    },
    methods: {
        ...mapMutations('Movie',['setUserSearch','getUserSearchData']),
        ...mapActions('Movie',['getMovie']),

        updateSearchValue(value) {
            this.setUserSearch(value);
        },

        activeUserSearch() {
            this.getMovie();
        },
    },

    async mounted() {
        this.getUserSearchData();
    }
}
</script>

<style scoped>  
header {
    box-sizing: border-box;
    background: #555;
    width: 100%;
    padding: 30px 25px;
}

.header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

header h1 a {
    color: #fff;
    font-size: 2rem;
    font-family: 'Libre Franklin', sans-serif;
    letter-spacing: 0;
}

header h1 span {
    color: #ffff00;
}

.right {
    display: flex;
    gap: 0 7px;
}

.right .search-input {
    border-radius: 20px;
    font-size: 1.6rem;
    padding: 8px 7px;
    width: 100%;
}

.right .search-btn {
    border-radius: 20px;
    background: #ffff00;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 8px 25px;
}

@media screen and (max-width: 421px) {
    .header-inner {
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px 0;
    }

    .right {
        width: 100%;
    }
}
</style>