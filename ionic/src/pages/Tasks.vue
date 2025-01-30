<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Minhas Tarefas</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="logout">Sair</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item v-for="task in tasks" :key="task.id">
                    <ion-label>{{ task.title }}</ion-label>
                    <ion-checkbox slot="end" v-model="task.completed" @ionChange="updateTask(task)"></ion-checkbox>
                </ion-item>
            </ion-list>
            <ion-input v-model="newTask" placeholder="Nova tarefa"></ion-input>
            <ion-button expand="full" @click="addTask">Adicionar</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonInput, IonButtons } from "@ionic/vue";
import api from "@/services/api";

export default {
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonInput, IonButtons },
    data() {
        return {
            tasks: [],
            newTask: "",
        };
    },
    async mounted() {
        await this.loadTasks();
    },
    methods: {
        async loadTasks() {
            try {
                const response = await api.get("/todos");
                this.tasks = response.data;
            } catch (err) {
                console.error("Erro ao buscar tarefas", err);
            }
        },
        async addTask() {
            if (this.newTask.trim() === "") return;
            try {
                const response = await api.post("/todos", { title: this.newTask });
                this.tasks.push(response.data);
                this.newTask = "";
            } catch (err) {
                console.error("Erro ao adicionar tarefa", err);
            }
        },
        async updateTask(task) {
            try {
                await api.put(`/todos/${task.id}`, { completed: task.completed });
            } catch (err) {
                console.error("Erro ao atualizar tarefa", err);
            }
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
ion-item {
    margin-bottom: 10px;
}
</style>
