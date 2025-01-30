<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-input v-model="email" placeholder="E-mail"></ion-input>
            <ion-input v-model="password" type="password" placeholder="Senha"></ion-input>
            <ion-button expand="full" @click="login">Entrar</ion-button>
            <p v-if="error" class="error">{{ error }}</p>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from "@ionic/vue";
import api from "@/services/api";

export default {
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton },
    data() {
        return {
            email: "",
            password: "",
            error: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await api.post("/login", {
                    email: this.email,
                    password: this.password,
                });

                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    this.$router.push("/tasks");
                }
            } catch (err) {
                this.error = "Erro ao fazer login. Verifique suas credenciais.";
            }
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
}
</style>
