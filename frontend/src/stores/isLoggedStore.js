import { defineStore } from "pinia";

export const useIsLoggedStore = defineStore("isLoggedIn", {
   state: () => {
      return {
         username: "",
         isLoggedIn: false
      }
   },
   getters: {
      getIsLoggedIn() {
         return this.isLoggedIn
      }
   },
   actions: {
      handleWithLogin(user) {
         this.isLoggedIn = true,
         this.username = user
      },
      handleWithLogout(){
         console.log("chamou")
         this.isLoggedIn = false,
         this.username = ""
      },
   }
})