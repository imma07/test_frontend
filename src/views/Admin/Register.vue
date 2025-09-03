<template>
  <div class="border-b border-gray-900/10 pb-12">
    <h2 class="text-base/7 font-semibold text-gray-900">User Registration</h2>
    <p class="mt-1 text-sm/6 text-gray-600 mb-6">Please enter details.</p>
    <hr class="text-gray-900/10" />
    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First name</label>
        <div class="mt-2">
          <InputText v-model="formData.name" name="first-name" type="text" placeholder="First name" class="w-full !bg-white !text-gray-900" />
          <Message v-if="errors.name" severity="error" size="small" variant="simple">{{ errors.name[0] }}</Message>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Password</label>
        <div class="mt-2">
          <InputText v-model="formData.password" name="last-name" type="password" placeholder="Password" class="w-full !bg-white !text-gray-900" />
          <Message v-if="errors.password" severity="error" size="small" variant="simple">{{ errors.password[0] }}</Message>
        </div>
      </div>

      <div class="sm:col-span-6">
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <InputText v-model="formData.email" name="email" type="email" placeholder="Email" class="w-full !bg-white !text-gray-900" />
          <Message v-if="errors.email" severity="error" size="small" variant="simple">{{ errors.email[0] }}</Message>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="street-address" class="block text-sm/6 font-medium text-gray-900">Address</label>
        <div class="mt-2">
          <InputText v-model="formData.address" name="address" type="text" placeholder="address" class="w-full !bg-white !text-gray-900" />
          <Message v-if="errors.address" severity="error" size="small" variant="simple">{{ errors.address[0] }}</Message>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="phone" class="block text-sm/6 font-medium text-gray-900">Phone</label>
        <div class="mt-2">
          <InputText v-model="formData.phone" name="phone" type="text" placeholder="phone" class="w-full !bg-white !text-gray-900" />
          <Message v-if="errors.phone" severity="error" size="small" variant="simple">{{ errors.phone[0] }}</Message>
        </div>
      </div>
    </div>
    <Button @click="saveForm" label="Save" class="mt-10 w-full" />
  </div>
</template>

<script setup lang="ts">
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref } from 'vue'
import api from "../../api";
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
  formData.value.password_confirmation = formData.value.password;
  console.log(formData.value)
  try {
    const res = await api.post("api/register", formData.value);
    message.value = res.data.message;
  } catch (error : any) {
    errors.value = error.response.data.errors;
    console.log("API Error:", errors.value);
  }

}

</script>




<style scoped></style>
