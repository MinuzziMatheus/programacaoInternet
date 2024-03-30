<script>
export default {
   name: "Header",
   data: () => ({
      
   }),
   methods: {
      async init() {

      },
      goToLoginPage(){
         this.$router.push({name: 'login'});
      }
   },
   mounted() {
      this.init()
   }
}
</script>

<template>
   <header>
      <img src="../assets/vinho.png" alt="">
      <nav>
         <ul>
            <li><RouterLink to="/">Home </RouterLink></li>
         </ul>
      </nav>
      <button @click="goToLoginPage">Acesse já</button>
   </header>
</template>
<style lang="scss" scoped>
   header {
      position: fixed;
      padding: 10px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      top: 0;
      left: 0;
      height: 100px;
      width: 100vw;

      img {
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
   }
</style>