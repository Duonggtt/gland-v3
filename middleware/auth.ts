import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import Cookies from 'js-cookie'

export default defineNuxtRouteMiddleware((to, from) => {
  const { $common } = useNuxtApp();
  const token = Cookies.get('jwt'); // Lấy token từ cookie

  if (!token) {
    console.log('Token not found, redirecting to login...');
    
    // Thêm thời gian chờ 1.5 giây trước khi chuyển hướng
    setTimeout(() => {
      navigateTo('/auth/login');
    }, 1500); // 1500ms tương đương với 1.5 giây
    
    return; // Kết thúc middleware tại đây, không tiếp tục điều hướng ngay lập tức
  }

  // Kiểm tra thời gian hết hạn của token (nếu cần)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;

    if (Date.now() > expiryTime) {
      $common.showError('Phiên đăng nhập hết hạn');
      // Thêm thời gian chờ 1.5 giây trước khi chuyển hướng
      setTimeout(() => {
        navigateTo('/auth/login');
      }, 1500); // 1500ms tương đương với 1.5 giây

      return; // Kết thúc middleware tại đây, không tiếp tục điều hướng ngay lập tức
    }
  } catch (e) {
    console.error('Invalid token, redirecting to login after 1.5s');

    // Thêm thời gian chờ 1.5 giây trước khi chuyển hướng
    setTimeout(() => {
      navigateTo('/auth/login');
    }, 1500); // 1500ms tương đương với 1.5 giây

    return; // Kết thúc middleware tại đây, không tiếp tục điều hướng ngay lập tức
  }
});
