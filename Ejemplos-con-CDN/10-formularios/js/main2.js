// App 2: Select dependiente, múltiples y otros inputs con validación y progreso

const vm2 = {
  setup() {
    // Estado
    const pais = Vue.ref("") // 'es' | 'fr' | 'it'
    const provincia = Vue.ref("")
    const intereses = Vue.ref(["frontend"]) // checkboxes múltiples
    const habilidades = Vue.ref(["html"]) // select múltiple
    const edad = Vue.ref(18)
    const satisfaccion = Vue.ref(5)
    const fechaCita = Vue.ref("")
    const horaCita = Vue.ref("")
    const aceptaCondiciones = Vue.ref(false)

    // Provincias por país (select dependiente)
    const MAP_PROVINCIAS = {
      es: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bizkaia"],
      fr: ["Île-de-France", "Occitanie", "Bretagne", "Nouvelle-Aquitaine"],
      it: ["Lombardía", "Lazio", "Toscana", "Sicilia"],
    }
    const provincias = Vue.computed(() => MAP_PROVINCIAS[pais.value] ?? [])

    // Si cambia el país, reseteamos provincia
    Vue.watch(pais, () => { provincia.value = "" })

    // Reglas y errores básicos
    const rules = Vue.reactive({
      pais: { required: true },
      provincia: { requiredIfPais: true },
      habilidades: { min: 1 },
      edad: { min: 0, max: 120 },
    })
    const errors = Vue.reactive({ pais: "", provincia: "", habilidades: "", edad: "" })

    const validate = () => {
      // país 
      if (rules.pais.required && !pais.value) 
         errors.pais = "Selecciona un país"
      else
         errors.pais = ""

      // provincia si aplica
      if (provincias.value.length) {
        errors.provincia = provincia.value ? "" : "Selecciona una provincia"
      } else {
        errors.provincia = ""
      }

      // habilidades
      if ((habilidades.value?.length ?? 0) < rules.habilidades.min) errors.habilidades = "Selecciona al menos 1 habilidad"
      else errors.habilidades = ""

      // edad
      if (edad.value < rules.edad.min || edad.value > rules.edad.max) {
        errors.edad = `La edad debe estar entre ${rules.edad.min} y ${rules.edad.max}`
      } else {
        errors.edad = ""
      }
    }

    Vue.watch([pais, provincia, habilidades, edad], validate, { immediate: true, deep: true })

    const isFormValid = Vue.computed(() => {
      const noErrors = Object.values(errors).every((e) => !e)
      return noErrors && aceptaCondiciones.value
    })

    // Barra de progreso: país/provincia/habilidades/edad/condiciones
    const progressPercent = Vue.computed(() => {
      const checks = []
      checks.push(!errors.pais && !!pais.value)
      checks.push(provincias.value.length ? (!errors.provincia && !!provincia.value) : true)
      checks.push(!errors.habilidades && (habilidades.value?.length ?? 0) > 0)
      checks.push(!errors.edad)
      checks.push(aceptaCondiciones.value)
      const done = checks.filter(Boolean).length
      return Math.round((done / checks.length) * 100)
    })

    const handleSubmit = () => {
      validate()
      if (!isFormValid.value) {
        alert("Revisa los errores y acepta las condiciones")
        return
      }
      console.log("[App2] Datos:", {
        pais: pais.value,
        provincia: provincia.value,
        intereses: intereses.value,
        habilidades: habilidades.value,
        edad: edad.value,
        satisfaccion: satisfaccion.value,
        fechaCita: fechaCita.value,
        horaCita: horaCita.value,
        aceptaCondiciones: aceptaCondiciones.value,
      })
      alert("[App2] Enviado. Mira la consola.")
    }

    const resetForm = () => {
      pais.value = ""
      provincia.value = ""
      intereses.value = ["frontend"]
      habilidades.value = ["html"]
      edad.value = 18
      satisfaccion.value = 5
      fechaCita.value = ""
      horaCita.value = ""
      aceptaCondiciones.value = false
      validate()
    }

    return {
      pais,
      provincia,
      intereses,
      habilidades,
      edad,
      satisfaccion,
      fechaCita,
      horaCita,
      aceptaCondiciones,
      provincias,
      rules,
      errors,
      isFormValid,
      progressPercent,
      handleSubmit,
      resetForm,
    }
  },
}

Vue.createApp(vm2).mount('main')
