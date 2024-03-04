<script>
import api from '../utils/api'
export default {
   name: "Clients List",
   data: () => ({
      clients: [],
   }),
   methods: {
      async init() {
         await api.get('/api/clients/')
            .then(async (res) => {
               this.clients = res.data
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
   <div>
      <ul v-for="client in clients" :key="client.id" >
         <li :id="client.id">{{ client.name }}</li>
      </ul>
   </div>
</template>

<style lang="scss" scoped>

</style>