const API = "https://api.github.com/users/";

// Function to search users at Github API

async function doSearch() {
    const response = await fetch(API + "javandresmoreno")
    const data = await response.json()
    console.log(data)
}


const app = Vue.createApp({
    data() {
        return {
            message: "Juan Nuñez's - VueJS 3 Course"
        }
    }
})