<script>
import api from '../utils/api'
import router from '../utils/routes'
import { useIsLoggedStore } from '../stores/isLoggedStore';
export default {
   name: "Login",
   data: () => ({
      form: {
         username: "",
         password: "",
      },
      loggedStore: useIsLoggedStore(),
      routes: router, 
   }),
   methods: {
      async init() {
         if(this.loggedStore.getIsLoggedIn) {
            this.$router.push({name: 'home'});
         }
      },
      async doLogin(event) {
         event.preventDefault();
         if(this.form.username.trim() == "" && this.form.password.trim() == "") {
            return
         }
         await api.get(`api/clients/email?email=${this.form.username}&password=${this.form.password}`)
            .then(async (res) => {
               this.loggedStore.handleWithLogin(this.form.username)
               this.$router.push({name: 'home'});
            })
            .catch(err => {
               console.log(err)
            })
      }
   },
   mounted() {
      this.init()
   }
}
</script>
<template>
   <img 
      class="background"
      src="https://images.unsplash.com/photo-1638186095900-179bc805de09?q=100&w=2007&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   >
   <div class="overlay"></div>
   <div class="form-container form2">
      <h2>Faça seu login</h2>
      <form>
         <div class="input-container">
            <label for="username">Usuário</label>
            <input 
               type="text" 
               name="username" 
               id="username"
               v-model="form.username"
            />
         </div>
         <div class="input-container">
            <label for="password">Senha</label>
            <input 
               type="password"
               name="password"
               id="password"
               v-model="form.password"
            />
         </div>
         <div class="action-container">
            <button type="submit" @click="(event) => doLogin(event)">Entrar</button>
            <a href="#">Cadastre-se</a>
         </div>

      </form>
   </div>
</template>

<style lang="scss">
   .background {
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      object-fit: cover;
      position: absolute;
      z-index: -1;
   }

   .overlay {
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      z-index: -1;
   }

   .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
      width: 380px;
      border-radius: 15px;
      color: #FFF;
      background-color: #480610;

      h2 {
         margin: 0 0 1rem 0;
      }

      form {
         display: flex;
         align-items: center;
         flex-direction: column;
         gap: 32px;
         width: 100%;
      }

      .input-container {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         width: 100%;
         padding: 0 1rem;
         
         input {
            width: 100%;
            height: 32px;
            padding: 5px;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            box-sizing: border-box; 
            color: #480610!important;
            background-color: #FFF!important;

            &:-webkit-autofill:focus {
               transition: background-color 0s 600000s, #FFF 0s 600000s !important;
             }
         }

         label {
            width: 100%;
            text-align: start;
         }
      }

      .action-container {
         display: flex;
         align-items: center;
         justify-content: center;
         flex-direction: column;
         width: 100%;
         gap: 12px;
         padding: 0 1rem;

         button {
            color: #480610;
            background-color: #FFF;
            width: 100%;
            transition: all ease-in-out 0.2s; 
   
            &:hover {
               color: #FFF;
               background-color: #8d0b1e;
               border: 1px solid #FFF;
            }
         }
   
         a {
            font-size: 12px;
            color: #FFF;
            
            &:hover {
               text-decoration: underline;
            }
         }
      }

   }

</style>