// Vuejs 3
const { ref } = Vue; // ← IMPORTANTE

const app = {
	setup() { // Composition API
		const conectado = ref(true);
		const edad = ref(35);
		const url = ref('https://www.google.com');
		const esActivo = ref(true);
		const tieneError = ref(false);

		return { conectado, edad, url, esActivo, tieneError };
	}
}

Vue.createApp(app).mount('main');
