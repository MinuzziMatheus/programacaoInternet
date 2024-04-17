<script>
import api from '../utils/api'
import router from '../utils/routes'
import useValidate from "@vuelidate/core";
import { required, email, minLength } from '@vuelidate/validators'
export default {
   name: "Register",
   data: () => ({
      v$: useValidate(),
      form: {
         name: "",
         email: "",
         password: "",
         documentation: "",
         phone: "",
         image: "",
      },
      msg: [],
      routes: router, 
   }),
   validations() {
      return {
         form: {
            name: { required, minLength: minLength(5)},
            email: { required, email },
            password: { required, minLength: minLength(5)},
            documentation: { required, minLength: minLength(10)},
            phone: { required, minLength: minLength(10)},
            image: { required }
         }
      }
   },
   methods: {
      async init() {
      },
      async doRegister(event) {
         event.preventDefault();
         const result = await this.v$.$validate()
         if(result){
            if(this.form.email.trim() == "" && this.form.password.trim() == "") {
               return
            }
            await api.post(`api/clients/`, {
                  "name": this.form.name,
                  "email": this.form.email,
                  "password": this.form.password,
                  "documentation": this.form.documentation,
                  "phone": this.form.phone,
                  "image": this.form.image
               })
               .then(async (res) => {
                  alert("Cadastro realizado com sucesso!")
               })
               .catch(err => {
                  console.log(err)
               })
         }
      },
      goToHome() {
         this.$router.push({path: '/home', name: 'Home'});
      },
      handleImage(e) {
         const selectedImage = e.target.files[0]
         this.createBase64Image(selectedImage)
      },
      createBase64Image(fileObject) {
         const reader = new FileReader()

         reader.onload = (e) => {
            this.form.image = e.target.result
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
      <h2>Registre-se</h2>
      <form id="formRegister">
         <div class="input-container">
            <label for="profileImg">Imagem perfil</label>
            <input 
               type="file" 
               name="profileImg"
               id="profileImg"
               @change="handleImage"
            />
            <span v-if="v$.form.image.$error">{{v$.form.image.$errors[0].$message}}</span>
         </div>
         <div class="input-container">
            <label for="name">Usuário</label>
            <img :src="form.image" alt="">
            <input 
               type="text" 
               name="name" 
               id="name"
               v-model="form.name"
            />
            <span v-if="v$.form.name.$error">{{v$.form.name.$errors[0].$message}}</span>
         </div>
         <div class="input-container">
            <label for="email">E-mail</label>
            <input 
               type="email" 
               name="email" 
               id="email"
               v-model="form.email"
            />
            <span v-if="v$.form.email.$error">{{v$.form.email.$errors[0].$message}}</span>
         </div>
         <div class="input-container">
            <label for="password">Senha</label>
            <input 
               type="password"
               name="password"
               id="password"
               v-model="form.password"
            />
            <span v-if="v$.form.password.$error">{{v$.form.password.$errors[0].$message}}</span>
         </div>
         <div class="input-container">
            <label for="documentation">CPF</label>
            <input 
               type="text"
               name="documentation"
               id="documentation"
               v-model="form.documentation"
            />
            <span v-if="v$.form.documentation.$error">{{v$.form.documentation.$errors[0].$message}}</span>
         </div>
         <div class="input-container">
            <label for="phone">Celular</label>
            <input 
               type="text"
               name="phone"
               id="phone"
               v-model="form.phone"
            />
            <span v-if="v$.form.phone.$error">{{v$.form.phone.$errors[0].$message}}</span>
         </div>
         <div class="action-container">
            <button type="submit" @click="(event) => doRegister(event)">Cadastrar</button>
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