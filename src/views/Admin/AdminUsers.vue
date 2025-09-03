<template>
  <div class="w-full h-full">
    <div class="w-full h-full flex items-center justify-between">
      <div class="text-main text-xl">Admin Users Page</div>
      <Button label="Add user" @click="visible = true" />
    </div>

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
    <Dialog v-model:visible="visible" modal header="Add user" :style="{ width: '25rem' }">
      <div class="flex flex-col space-4 justify-center mb-4">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Add user.</span>
        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Name</label>
          <InputText v-model="formData.name" id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Email</label>
          <InputText v-model="formData.email" id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
          <Button type="button" label="Save" @click="saveForm"></Button>
        </div>
      </div>
    </Dialog>
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
import Dialog from 'primevue/dialog';
import api from '../../api'
const users = ref([]);

const visible = ref(false);
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

interface FormData {
  name: string;
  password: string;
  password_confirmation: string;
  email: string;
  address: string;
  phone: string;
}
const errors = ref<FormData>({
  name: '',
  password: '',
  password_confirmation: '',
  email: '',
  address: '',
  phone: ''
})
const formData = ref<FormData>({
  name: '',
  password: '',
  password_confirmation: '',
  email: '',
  address: '',
  phone: ''
});

const saveForm = async () => {
  formData.value.password = 'welcome' + formData.value.name;
  formData.value.password_confirmation = formData.value.password;
  console.log(formData.value)
  try {
    const res = await api.post("api/users", formData.value);
    message.value = res.data.message;
  } catch (error : any) {
    errors.value = error.response.data.errors;
    console.log("API Error:", errors.value);
  }

}
</script>
<style scoped></style>
