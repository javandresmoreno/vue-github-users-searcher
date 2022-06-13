const API = "https://api.github.com/users/";

// Function to search users at Github API

// async function doSearch() {
//     const response = await fetch(API + "javandresmoreno")
//     const data = await response.json()
//     console.log(data)
// }


const app = Vue.createApp({
    data() {
        return {
            subtitle: "Juan Nuñez's - VueJS 3 Course",
            search: null,
            result: null,
            error: null, 
        }
    }, 
    methods: {
        async doSearch() {
            //Con la linea siguiente reseteo mis resultados
            this.result = this.error = null 

            try {
                const response = await fetch(API + this.search)
                if(!response.ok) throw new Error("Sorry, user not found. 😓")
                console.log(response)

                const data = await response.json()
                console.log(data)

                this.result = true
                
            } catch (error) {
                this.error = error
            } finally {
                this.search = null 
            }
        }
    }
})