<template>
  <div class="w-full h-full">
    <div class="text-main dark:text-white">Admin Users Page</div>
    <div v-if="users" class="w-full h-full my-8 rounded-lg p-4">
      <DataTable :value="users"
                 v-model:filters="filters"
                 stripedRows tableStyle="min-width: 50rem"
                 paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]"
        filterDisplay="row" :loading="loading"
        :globalFilterFields="['name', 'email']">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">Users</span>
          </div>
          <div class="flex justify-end">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
          </div>
        </template>
        <template #empty> No User found. </template>
        <template #loading> Loading User data. Please wait. </template>
        <Column field="name"  header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="address" header="Address"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="role" header="Role"></Column>
        <template #footer> In total there are {{ users ? users.length : 0 }} Users. </template>
      </DataTable>
    </div>

  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { onMounted, ref } from 'vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import api from '../../api'
const users = ref([]);
onMounted(async () => {
  try {
    const res = await api.get('api/users')
    users.value = res.data.users
    console.log(res.data.users)
    message.value = res.data.message
  } catch (err) {
    console.error('API Error:', err)
  }
})
// Everything to with search
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

</script>
<style scoped></style>
