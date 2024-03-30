<script>
export default {
   name: "Home",
   data: () => ({
      
   }),
   methods: {
      async init() {

      }
   },
   mounted() {
      this.init()
   }
}
</script>

<template>
   <article>
      <img class="cover" src="https://images.unsplash.com/photo-1529060532150-a0c935a6d6e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      <div class="title-container">
         <h1>Discover The Exquisite Wine Finery</h1>
         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
      <div class="img-container">
         <!-- <img src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""> -->
         <img src="https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      </div>
   </article>
</template>
<style lang="scss" scoped>
   article {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 2rem;
      width: 100%;
      height: 100vh;


      .cover {
         position: absolute;
         left: 0;
         top: 0;
         width: 100%;
         height: 100%;
         object-fit: cover;
         overflow: hidden;
         z-index: -1;
      }

      .title-container {
         width: 40%;

         h1 {
            margin-bottom: 1rem;
         }

         p {
            margin: 0;
            text-align: left;
         }
      }

      .img-container {
         width: 60%;
         position: relative;

         img:first-of-type {
            height: 600px;
            width: 400px;
            border-top-right-radius: 50%;
            border-top-left-radius: 50%;
            border: 3px solid #FFF;
         }
      }

      @media screen and (max-width: 920px) {
         flex-direction: column;
         .title-container {
            width: 100%;
         }

         .img-container {
            display: none;
         }
      }
   }
</style>