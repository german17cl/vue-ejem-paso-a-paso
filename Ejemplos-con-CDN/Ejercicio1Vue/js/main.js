const vm = {
    setup(){
       
        const frutas = Vue.ref([
            {nombre:  'Pera', cantidad: 10},
            {nombre:  'Manzana', cantidad: 0},
            {nombre:  'Platano', cantidad: 11},
        ])

        
        return { frutas}

    }
};

Vue.createApp(vm).mount('main')