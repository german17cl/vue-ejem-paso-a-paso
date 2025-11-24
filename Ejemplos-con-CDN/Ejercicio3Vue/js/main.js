const {ref} = Vue;
const {computed} = Vue;
const vm = {
    setup(){
       
        const frutas = Vue.ref([
            {nombre:  'Pera', cantidad: 10},
            {nombre:  'Manzana', cantidad: 0},
            {nombre:  'Platano', cantidad: 11},
        ]);

        // let total = 0;
        // for (let i = 0; i < frutas.value.length; i++){
        //     total += frutas.value[i].cantidad;
        // }
        
        const nuevaFruta = ref("");

        const agregarFruta = () => {
            if (nuevaFruta.value.trim() === "") return;

            frutas.value.push({
                nombre: nuevaFruta.value,
                cantidad: 0

            });
            nuevaFruta.value = "";
        };

        const totalFrutas = computed(() => 
             frutas.value.reduce((acum, fruta) => acum + fruta.cantidad, 0)
        );

        return { frutas, nuevaFruta, agregarFruta, totalFrutas};

        

    }
};

Vue.createApp(vm).mount('main')