<script>
import api from '../utils/api'
export default {
   name: "Clients",
   data: () => ({
      clients: [],
   }),
   methods: {
      async init() {
         await api.get('/api/clients/')
            .then(async (res) => {
               this.clients = res.data
               console.log(this.clients)
            })
            .catch(err => {
               console.log(err)
            })
      },
      async deleteUser(id) {
         await api.deleteUser('/api/clients/'+id)
         .then(async (res) => {
            alert("Cliente deletado com sucesso!")
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
      <table v-if="clients.length > 0">
         <thead>
            <th>Nome</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Número</th>
            <th>Ação</th>
         </thead>
         <tbody>
            <tr v-for="client in clients" :key="client.id" >
               <td>{{ client.name }}</td>
               <td>{{ client.email }}</td>
               <td>{{ client.documentation }}</td>
               <td>{{ client.phone }}</td>
               <td><button type="button" @click="deleteUser(client.id)">Apagar usuário</button></td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<style lang="scss" scoped>
   tbody {
      overflow-x: auto;
   }
   td {
      padding: 10px;
   }
</style>