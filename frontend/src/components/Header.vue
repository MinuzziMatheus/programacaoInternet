<script>
import { useIsLoggedStore } from '../stores/isLoggedStore';
export default {
   name: "Header",
   data: () => ({
      loggedStore: useIsLoggedStore(),
      isLogged: false,
   }),
   methods: {
      init() {
         this.isLogged = this.loggedStore.getIsLoggedIn
      },
      goToLoginPage() {
         this.$router.push({name: 'login'});
      },
      doLogout() {
         this.isLogged = this.loggedStore.handleWithLogout()
      }
   },
   mounted() {
      this.init()
   }
}
</script>

<template>
   <header>
      <img class="logo" src="../assets/vinho.png" alt="">
      <nav>
         <ul>
            <li><RouterLink to="/home">Home </RouterLink></li>
            <li><RouterLink to="/clients">Clients </RouterLink></li>
         </ul>
      </nav>
      <button v-if="!isLogged" @click="goToLoginPage">Log In</button>
      <img class="logout" v-if="isLogged" @click="doLogout" src="../assets/icons/logout.svg" alt="">
   </header>

   <router-view></router-view>
</template>
<style lang="scss" scoped>
   header {
      z-index: 10;
      position: fixed;
      padding: 10px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      top: 0;
      left: 0;
      height: 100px;
      width: 100vw;

      .logo {
         height: 100%;
      }

      nav {
         width: 100%;
         padding: 0 20px;
         text-align: center;

         ul {
            display: flex;
            align-items: center;
            justify-content:center;
            gap: 15px;
            list-style: none;

            li:hover {
               &::after {
                  width: 100%;
               }
            }

            li {
               min-width: 50px;
               position: relative;

               a{
                  font-size: 1.5rem;
                  text-transform: uppercase;
                  color: rgb(211, 207, 207);
               }

               a.active {
                  color: #FFF;
               }
               
               &::after {
                  content: " ";
                  background-color: #FFF;
                  position: absolute;
                  bottom: -10px;
                  left: 0;
                  height: 2px;
                  width: 0;
                  transition: all 0.3s;
               }
            }

            
         }
      }

      button {
         min-width: 200px;
         height: 50px;
         border-radius: 5px;
         border: 1px solid #FFF;
         background-color: transparent;
         color: #FFF;
         transition: all 0.3s;
         
         &:hover {
            background-color: #FFF;
            color: #ba0f29;
         }
      }

      .logout {
         height: 40px;
         cursor: pointer;
      }

      @media screen and (max-width: 920px) {
         ul {
            padding: 0;
         }
         .logo {
            display: none;
         }

         nav {
            padding: 0;
         }
      }
   }
</style>