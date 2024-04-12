<script>
import api from '../utils/api'
import router from '../utils/routes'
import { useIsLoggedStore } from '../stores/isLoggedStore';
import useValidate from "@vuelidate/core";
import { required, email, minLength } from '@vuelidate/validators'
export default {
   name: "Login",
   data: () => ({
      v$: useValidate(),
      form: {
         name: "",
         email: "",
         password: "",
         documentation: "",
         phone: ""
      },
      image: "",
      msg: [],
      registering: false,
      loggedStore: useIsLoggedStore(),
      routes: router, 
   }),
   validations() {
      return {
         email: { required, email },
         password: { required, minLength: minLength(5)},
      }
   },
   methods: {
      async init() {
         if(this.loggedStore.getIsLoggedIn) {
            this.$router.push({name: 'Home'});
         }
      },
      async doLogin(event) {
         event.preventDefault();
         if(this.form.email.trim() == "" && this.form.password.trim() == "") {
            return
         }
         await api.get(`api/clients/email?email=${this.form.email}&password=${this.form.password}`)
            .then(async (res) => {
               this.loggedStore.handleWithLogin(this.form.email)
               this.$router.push({name: 'Home'});
            })
            .catch(err => {
               console.log(err)
            })
      },
      async doRegister(event) {
         event.preventDefault();
         this.v$.$validate()
         if(!this.v$.$error){
            if(this.form.email.trim() == "" && this.form.password.trim() == "") {
               return
            }
            await api.post(`api/clients/`, {
                  "name": this.form.name,
                  "email": this.form.email,
                  "password": this.form.password,
                  "documentation": this.form.documentation,
                  "phone": this.form.phone
               })
               .then(async (res) => {
                  console.log(res)
               })
               .catch(err => {
                  console.log(err)
               })
         }
      },
      isRegistering() {
         this.registering = !this.registering
      },
      goToHome() {
         this.$router.push({path: '/', name: 'Home'});
      },
      validateEmail() {
         if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
            this.msg['email'] = 'Please enter a valid email address';
         } else {
            this.msg['email'] = '';
         }
      },
      handleImage(e) {
         const selectedImage = e.target.files[0]
         this.createBase64Image(selectedImage)
      },
      createBase64Image(fileObject) {
         const reader = new FileReader()

         reader.onload = (e) => {
            this.image = e.target.result
         }

         reader.readAsBinaryString(fileObject)
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
      <img @click="goToHome" class="arrow" src="../assets/icons/arrow.svg" alt="">
      <h2 v-if="!registering">Faça seu login</h2>
      <h2 v-else>Registre-se</h2>
      <form v-if="!registering">
         <div class="input-container">
            <label for="email">E-mail</label>
            <input 
               type="text" 
               name="email" 
               id="email"
               placeholder="email@example.com"
               @blur="validateEmail"
               v-model="form.email"
            />
            <span v-if="v$.email.$error">{{v$.email.email.$message}}</span>
         </div>
         <div class="input-container">
            <label for="password">Senha</label>
            <input 
               type="password"
               name="password"
               id="password"
               v-model="form.password"
            />
            <span v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</span>
         </div>
         <div class="action-container">
            <button type="submit" @click="(event) => doLogin(event)">Entrar</button>
            <span @click="isRegistering">Cadastre-se</span>
         </div>

      </form>
      <form v-else id="formRegister">
         <div class="input-container">
            <label for="profileImg">Usuário</label>
            <input 
               type="file" 
               name="profileImg"
               id="profileImg"
               @change="handleImage"
            />
         </div>
         <div class="input-container">
            <label for="name">Usuário</label>
            <img :src="image" alt="">
            <input 
               type="text" 
               name="name" 
               id="name"
               v-model="form.name"
            />
         </div>
         <div class="input-container">
            <label for="email">E-mail</label>
            <input 
               type="email" 
               name="email" 
               id="email"
               v-model="form.email"
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
         <div class="input-container">
            <label for="documentation">CPF</label>
            <input 
               type="text"
               name="documentation"
               id="documentation"
               v-model="form.documentation"
            />
         </div>
         <div class="input-container">
            <label for="phone">Celular</label>
            <input 
               type="text"
               name="phone"
               id="phone"
               v-model="form.phone"
            />
         </div>
         <div class="action-container">
            <button v-if="!registering" type="submit" @click="(event) => doLogin(event)">Entrar</button>
            <button v-if="registering" type="submit" @click="(event) => doRegister(event)">Cadastrar</button>
            <span v-if="!registering" @click="isRegistering" >Cadastre-se</span>
            <span v-if="registering" @click="isRegistering" >Entrar</span>
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

   .arrow {
      position: absolute;
      top: 20px;
      left: 10px;
      height: 30px;
      width: 30px;
      cursor: pointer;

      &:hover {
         transform: scale(1.1, 1.1);
      }
   }

   .form-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: auto;
      min-height: 400px;
      width: 380px;
      padding: 20px 0;
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
   
         span {
            font-size: 12px;
            color: #FFF;
            cursor: pointer;
            
            &:hover {
               text-decoration: underline;
            }
         }
      }

   }

</style>