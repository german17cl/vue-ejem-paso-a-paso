const {ref} = Vue;

const vm = {
    setup(){
       
        const frutas = Vue.ref([
            {nombre:  'Pera', cantidad: 10},
            {nombre:  'Manzana', cantidad: 0},
            {nombre:  'Platano', cantidad: 11},
        ]);

        
        const nuevaFruta = ref("");

        const agregarFruta = () => {
            if (nuevaFruta.value.trim() === "") return;

            frutas.value.push({
                nombre: nuevaFruta.value,
                cantidad: 0

            });
            nuevaFruta.value = "";
        };

        return { frutas, nuevaFruta, agregarFruta};

    }
};

Vue.createApp(vm).mount('main')