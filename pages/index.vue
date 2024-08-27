<template>
  <div>
    <Toast />
    <div class="p-3">
      <h1 class="text-3xl mb-5 font-medium text-gray-700">Bảng điều khiển</h1>
      <div>
        <div class="flex justify-between items-center max-w-full p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 rounded-xl">
          <div class="flex items-center gap-4">
            <Avatar image="https://tecdn.b-cdn.net/img/new/avatars/2.webp" shape="circle" size="large" />
            <div class="font-medium dark:text-white">
              <div class="font-semibold text-gray-600 dark:text-gray-700">Chào</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">G Nguyen</div>
            </div>
          </div>
          <div>
            <Button label="Đăng xuất" severity="info" icon="pi pi-sign-out" class="p-button-outlined p-button-sm text-white "
             @click="logout"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useNuxtApp } from '#app';
  import { useRouter  } from '#app';

  const router = useRouter(); 

  const { $common } = useNuxtApp();

  const logout = () => {
      console.log("loging out...");
      setTimeout(() => {
        $common.removeCookies();
        router.push("/auth/login");
        $common.showError('Đăng xuất thành công.');
      }, 1500);
  };
</script>

