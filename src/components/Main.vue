<template>
    <section class="main-section">
        <div class="intro-content">
            <h2>
                Search Your <br />
                Movie!
            </h2>
            <p>
                by.OMDb API
            </p>
        </div>
    </section>
</template>

<script>
export default {
    name: "Main",
    components: {
    },
}
</script>

<style scoped>
.main-section {
    height: calc(91vh - -1px);
    background-image: url('../assets/intro-bg.png');
    background-size: cover;
    background-position: center;
}
.intro-content {
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.intro-content h2 {
    color: #fff;
    font-size: 4rem;
    font-family: 'Libre Franklin', sans-serif;
}

.intro-content p {
    color: #fff;
    font-size: 1.6rem;
    margin-top: 7px;
}
</style>