<template>
  <div class="w-full bg-white shadow-md fixed top-0 z-10">
    <Toolbar>
      <template #start>
        <div class="flex items-center gap-2 px-4">
          <a href="/"><h1 class="text-2xl font-bold">Gland</h1></a>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2 px-4 relative">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            style="width: 32px; height: 32px; cursor: pointer;"
            @click="toggleMenu" 
          />
          <Menu
            :model="menuItems"
            ref="menu"
            popup
            :style="{ width: '200px' }"
          />
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Toolbar from 'primevue/toolbar';
// import useTheme from 'path-to-your-theme-hook'; 

const router = useRouter();

const menu = ref(null);

// Giả sử bạn có một hook để chuyển đổi theme
// const { toggleTheme } = useTheme();

// Các mục trong menu
const menuItems = ref([
  {
    label: 'Theme',
    icon: 'pi pi-sun', // Hoặc sử dụng 'pi pi-moon' cho dark mode
    command: () => {
      // toggleTheme();
      console.log('Theme toggled');
    },
  },
  {
    label: 'Ngôn ngữ',
    icon: 'pi pi-globe',
    command: () => {
      console.log('Ngôn ngữ');
    },
  },
  {
    label: 'Đăng xuất',
    icon: 'pi pi-sign-out',
    command: () => {
      console.log("loging out...");
      setTimeout(() => {
        $common.removeCookies();
        router.push("/auth/login");
        $common.showError('Đăng xuất thành công.');
      }, 1500);
    },
  },
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const selectLanguage = (language) => {
  console.log('Ngôn ngữ đã chọn:', language);
};
</script>

<style scoped>
/* Custom styles for Navbar if needed */
</style>
