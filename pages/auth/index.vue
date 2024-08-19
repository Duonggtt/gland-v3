<template>
    <div class="flex justify-center flex-grow bg-gray-50 dark:bg-gray-950 w-screen h-screen"> 
       <Toast />
      <main style="max-width: 500px; min-width: 300px;" class="rounded-2xl my-auto bg-white desktop:w-1/2 py-12 shadow-sm">
        <header>
          <div class="mb-5 flex justify-center">
            <h1 class="text-xl font-bold leading-5 text-gray-700 dark:text-white">GLAND</h1>
          </div>
          <div class="mb-2 flex justify-center">
            <h1 class="text-2xl font-bold leading-5 text-gray-700 dark:text-white">Đăng nhập</h1>
          </div>
        </header>
        <form class="max-w-sm mx-auto pt-5 phone:px-3">
          <div class="mb-2">
            <span class="p-float-label">
              <InputText id="email_field" class="w-full" />
              <label for="email_field" class="text-gray-700 dark:text-white">Địa chỉ email</label>
            </span>
          </div>
          <div class="mb-5">
            <span class="p-float-label">
              <Password id="password_field" class="w-full" toggleMask />
              <label for="password_field" class="text-gray-700 dark:text-white">Mật khẩu</label>
            </span>
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <Checkbox id="remember_checkbox" class="mr-2" />
              <label for="remember_checkbox" class="text-gray-700 dark:text-white">Ghi nhớ đăng nhập</label>
            </div>
          </div>
          <Button label="Đăng nhập" class="w-full sm:w-auto"/>
        </form>
      </main>
    </div>
  </template>

<script lang="ts" setup>
import { ref } from "vue";

</script>
