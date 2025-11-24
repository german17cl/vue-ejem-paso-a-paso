// Vanilla JavaScript
 // const input = document.querySelector('input');
 // const h1 = document.querySelector('h1');
 //input.addEventListener('keyup', function (){h1.innerHTML = input.value;}); 

 // input.addEventListener('keyup', () => h1.innerHTML = input.value);



// Vue.js -->Conseguimos la misma reactividad que antes pero ahora utilizamos vue

//Vuejs 3 Options API
/* const { createApp } = Vue

  createApp({
    data() {
      return {
        mensaje: 'Hola mundo!'
      }
    }
  }).mount('main') */

//Vuejs 3 Composition API
const vueApp={
    setup() { // Composition API
        const mensaje = Vue.ref('Hola mundo!')
        const semana = Vue.ref(['lunes', 'martes'])
        const nombre = Vue.ref('Germán')

        return { //exponemos al template
            mensaje,
            semana,
            nombre
        }
    }
}
Vue.createApp(vueApp).mount('main')
