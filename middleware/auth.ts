// middleware/global.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const { $common } = useNuxtApp();
  const token = $common.isLogin();

  console.log('Middleware is running');
  console.log('Token:', token);
  // Kiểm tra nếu không có token, chuyển hướng về trang login
  if (!token) {
    return navigateTo('/auth/login');
  }
});
