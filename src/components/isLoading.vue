<template>
    <div class="loading-wrap">
        <div class="spinner" />
    </div>
</template>

<script>
export default {
    name: "Loading"
}
</script>

<style scoped>
    .loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 5px solid #fff;
        border-bottom: 5px solid #ff0000;
        animation: loadingSpinner 1s linear infinite;
    }

    @keyframes loadingSpinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>