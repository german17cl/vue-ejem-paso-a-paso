// App 1: Campos básicos con validación en vivo y contadores
// nombre, bio, genero, aceptaCondiciones

const vm1 = {
  setup() {
    // Estado básico
    const nombre = Vue.ref("")
    const bio = Vue.ref("")
    const genero = Vue.ref("x")
    const aceptaCondiciones = Vue.ref(false)

    // Reglas y errores
    const rules = Vue.reactive({
      nombre: { required: true, min: 2, max: 30 },
      bio: { max: 200 },
    })
    // Computamos los mensajes de error directamente (sin watch)
    const errors = Vue.computed(() => {
      const nombreLength = (nombre.value ?? "").length
      const bioLength = (bio.value ?? "").length
      let eNombre = ""
      let eBio = ""
      //trim() quita los espacios en blanco al inicio y al final.
      //rules.nombre.required && !nombre.value.trim() es para que no se envie si no hay nombre
      if (rules.nombre.required && !nombre.value.trim()) {
        eNombre = "El nombre es obligatorio"
      } else if (nombreLength < rules.nombre.min) {
        eNombre = `Mínimo ${rules.nombre.min} caracteres`
      } else if (nombreLength > rules.nombre.max) {
        eNombre = `Máximo ${rules.nombre.max} caracteres`
      }
      if (bioLength > rules.bio.max) {
        eBio = `Máximo ${rules.bio.max} caracteres`
      }
      return { nombre: eNombre, bio: eBio }
    })

    // Contadores
    //con mobre.value?? es para que no de error si no hay valor. 
    // Si no es null o undefined, devuelve la cadena de la izquierda;
    // si no la cadena vacia. Asi .length no da errores
    const nombreLength = Vue.computed(() => (nombre.value ?? "").length)
    const bioLength = Vue.computed(() => (bio.value ?? "").length)

    const isFormValid = Vue.computed(() => {
      //Object.values(errors.value) devuelve un array con los valores de errors.value
      const noErrors = Object.values(errors.value).every((e) => !e)
      //every() devuelve true si todos los elementos del array cumplen la condicion. 
      // es decir, si no hay errores=> los valores estan vacios
      return noErrors && aceptaCondiciones.value
    })

    const handleSubmit = () => {
      if (!isFormValid.value) {
        alert("Revisa los errores y acepta las condiciones")
        return
      }
      console.log("[App1] Datos: ", {
        nombre: nombre.value,
        bio: bio.value,
        genero: genero.value,
        aceptaCondiciones: aceptaCondiciones.value,
      })
      alert("[App1] Enviado. Mira la consola.")
    }

    const resetForm = () => {
      nombre.value = ""
      bio.value = ""
      genero.value = "x"
      aceptaCondiciones.value = false
    }

    return {
      nombre,
      bio,
      genero,
      aceptaCondiciones,
      rules,
      errors,
      nombreLength,
      bioLength,
      isFormValid,
      handleSubmit,
      resetForm,
    }
  },
}

Vue.createApp(vm1).mount('main')
