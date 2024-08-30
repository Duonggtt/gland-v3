import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import Cookies from 'js-cookie'
import { useRouter  } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter(); 
  const { $common } = useNuxtApp();
  const token = Cookies.get('jwt'); // Lấy token từ cookie

  if (!token) {
    router.push('/auth/login');
    return; 
  }

  // Kiểm tra thời gian hết hạn của token (nếu cần)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));  
    const expiryTime = payload.exp * 1000;

    if (Date.now() > expiryTime) {
      $common.showError('Phiên đăng nhập hết hạn');
      router.push('/auth/login');
      return; 
    }
  } catch (e) {
    console.error('Invalid token.');
    router.push('/auth/login');
    return; 
  }
});
