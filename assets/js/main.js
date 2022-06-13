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
            subtitle: `Project Course 💚 escuelavue.es`,
            search: null,
            result: null,
            error: null, 
            favorites: new Map()
        }
    },
    created() {
        const savedFavorites = JSON.parse(window.localStorage.getItem("favorites"))
        if(savedFavorites.length) {
            const favorites = new Map(savedFavorites.map(favorite => [favorite.id, favorite]))
            this.favorites = favorites
        }
    },
    computed: {
        isFavorite() {
            return this.favorites.has(this.result.id)
        },
        allFavorites() {
            return Array.from(this.favorites.values())
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

                this.result = data

            } catch (error) {
                this.error = error
            } finally {
                this.search = null 
            }
        }, 
        addFavorite() {
            this.favorites.set(this.result.id, this.result)
            this.updateStorage()
        },
        removeFavorite() {
            this.favorites.delete(this.result.id)
            this.updateStorage()
        },
        showFavorite(favorite) {
            this.result = favorite
        },
        updateStorage() {
            window.localStorage.setItem('favorites', JSON.stringify(this.allFavorites))
        }

    }
})