//En Vue 2 esto sería un filtro declarado de manera global
//En Vue 3 han sido eliminados,en su lugar se recomienda usar propiedades computadas
/* Vue.filter('alReves',function(valor){
    return valor.split('').reverse().join('')
}); */
// Vue.filter('alReves',(valor) => valor.split('').reverse().join(''));


const vm={
    setup(){ // Composition API
        const busqueda = Vue.ref('')
        const minimo = Vue.ref(5)
        const juegos = Vue.ref([
            {
                titulo: 'Battlefield',
                genero: 'FPS',
                puntuacion: 9
            },
            {
                titulo: 'Civilization',
                genero: 'Estrategia',
                puntuacion: 8
            },
            {
                titulo: 'FIFA',
                genero: 'Sports',
                puntuacion: 7,
            },
        ])

        const mejoresJuegos = Vue.computed(() => {
            return juegos.value.filter((juego) => juego.puntuacion >= minimo.value)
        })
        const buscarJuego = Vue.computed(() => {
            return juegos.value.filter((juego) => juego.titulo.toLowerCase().includes(busqueda.value.toLowerCase()))
        })

        return { busqueda, minimo, juegos, mejoresJuegos, buscarJuego }
    }
};
Vue.createApp(vm).mount('main')
