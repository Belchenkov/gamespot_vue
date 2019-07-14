<template>
    <header>
        <div class="container header_container">
            <div class="logo">
                <a href="/">
                    GameSpot
                </a>
            </div>
            <div class="login">
                <a href="/signin">
                    <img :src="require('../../assets/images/login.png')" alt="Login">
                </a>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>