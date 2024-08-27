
<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
    <Toast />
    <main class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-700 dark:text-white">GLAND</h1>
        <h2 class="text-xl text-gray-600 dark:text-gray-300 mt-2">Đăng nhập</h2>
      </header>
      <form @submit.prevent="doLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Địa chỉ email</label>
          <InputText id="email" v-model="username" placeholder="Nhập email của bạn" class="w-full mt-2 p-inputtext-lg" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu</label>
          <Password id="password" v-model="password" placeholder="Nhập mật khẩu của bạn" toggleMask class="w-full mt-2 " inputClass="w-full"/>
        </div>
        <Button label="Đăng nhập" type="submit" class="w-full py-3 text-lg p-button-primary p-button-rounded" />
      </form>
    </main>
  </div>
</template>



<script lang="ts" setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useStore } from 'vuex'; 
import type { State } from '~/store/index';
import { useRouter } from 'vue-router';

const  baseUrl = "https://api.g-center.io.vn:8447/gland/api/";

const { $common, $api } = useNuxtApp();

const router = useRouter(); 
const store = useStore<State>(); 

const username = ref<string>('');
const password = ref<string>('');

const doLogin = async () => {
  try {
    const respData = await $api.sendPostApi(`${baseUrl}` + 'authen/signing', {
      username: username.value,
      password: password.value
    }, false);

    if (respData?.status && respData.status !== 200) {
      $common.showError(respData.message);
      return;
    }

    if (respData?.data?.userId) {
      localStorage.setItem('userID', respData.data.userId);
      const roleResponse = await $api.sendGetApi(`${baseUrl}` + `role?userId=${respData.data.userId}`);
      if (roleResponse?.value) {
        // Assuming `updateRole` is a method in the Vuex store, adapt if needed
        store.dispatch('updateRole', roleResponse.value.departmentAlloweds);
      }
    }

    if (respData?.data?.accessToken) {
      $common.showSuccess(`Chào mừng ${username.value} quay trở lại`);
      localStorage.setItem("jwt", respData.data.accessToken);
      $common.resetCookies(respData.data.accessToken, 60);
      
      if (respData.data.admin !== undefined) {
        $common.setAdmin(respData.data.admin, 60);
      }
      if (respData.data.role !== undefined) {
        $common.setRole(respData.data.role, 60);
      }

      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  } catch (error) {
    $common.showError('Đăng nhập thất bại');
  }
};

const checkCookies = () => {
  const token = $common.isLogin();
  if (token) {
    $common.showSuccess("Đăng nhập thành công");
    setTimeout(() => {
      router.push('/auth/login');
    }, 1500);
  }
};

// Kiểm tra token khi component được tạo
checkCookies();

</script>