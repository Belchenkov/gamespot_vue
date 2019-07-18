<template>
    <div class="container">
        <div class="signin_container">
            <h1>Sign in</h1>

            <form @submit.prevent="onSubmit">
                <div class="input_field">
                    <label>Email</label>
                    <input
                        type="email"
                        v-model="formData.email"
                    >
                </div>
                <div class="input_field">
                    <label>Password</label>
                    <input
                        type="password"
                        v-model="formData.password"
                    >
                </div>
                <button type="submit" style="cursor: pointer">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                formData: {
                    email: 'u608110@gmail.com',
                    password: '12qwasZX'
                }
            }
        },
        methods: {
            onSubmit() {
               this.$store.dispatch('admin/signIn', this.formData);
            }
        }
    }
</script>

<style scoped>

</style>