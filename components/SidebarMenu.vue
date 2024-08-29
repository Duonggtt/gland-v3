<template>
  <ul class="space-y-1 text-gray-800 dark:text-white">
    <li v-for="(item, index) in menuItems" :key="index">
      <div
        v-if="item.title === 'Tổng' ? isAdmin : true"
        @click="toggleSubMenu(index)"
        :class="[
          'flex items-center justify-between px-4 py-2 rounded-2xl cursor-pointer transition-all duration-150 w-full', 
          isActive(index) 
            ? 'bg-gray-100 dark:bg-gray-700 rounded-2xl' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl'
        ]"
        :style="isActive(index) ? 'background-color: transparent; cursor: default;' : ''"
      >
        <div class="flex items-center gap-2 w-full">
          <i :class="item.icon" class="text-lg"></i>
          <span 
            :class="[
              'text-sm font-medium flex-grow', 
              isActive(index) ? 'text-gray-800 dark:text-white' : ''
            ]"
          >{{ item.title }}</span>
        </div>
        <i v-if="item.children" class="pi" :class="expandedIndices.includes(index) ? 'pi-chevron-down' : 'pi-chevron-right'"></i>
      </div>

      <ul
        v-if="item.children && expandedIndices.includes(index)"
        :class="item.title === 'Kịch bản' ? 'ml-4 mt-2 space-y-1' : 'mt-2 space-y-1'"
      >
        <li 
          v-for="(child, childIndex) in item.children" 
          :key="childIndex"
        >
          <router-link
            v-if="child.path"
            :to="child.path"
            :class="[
              'flex items-center px-4 py-2 rounded-2xl cursor-pointer transition-all duration-150 w-full', 
              isActiveSubMenu(index, childIndex) 
                ? 'bg-gray-200 dark:bg-gray-600 rounded-2xl' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl'
            ]"
            @click="setActiveSubMenu(index, childIndex)"
          >
            <i :class="child.icon" class="text-lg"></i>
            <span 
              class="ml-2 text-sm"
              :class="[
                isActiveSubMenu(index, childIndex) ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-300'
              ]"
            >{{ child.title }}</span>
          </router-link>

          <div
            v-else
            :class="[
              'flex items-center px-4 py-2 rounded-2xl cursor-pointer transition-all duration-150 w-full', 
              isActiveSubMenu(index, childIndex) 
                ? 'bg-gray-200 dark:bg-gray-600 rounded-2xl' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl'
            ]"
            @click="setActiveSubMenu(index, childIndex)"
          >
            <i :class="child.icon" class="text-lg"></i>
            <span 
              class="ml-2 text-sm"
              :class="[
                isActiveSubMenu(index, childIndex) ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-300'
              ]"
            >{{ child.title }}</span>
          </div>
        </li>
      </ul>
      
      <hr v-if="item.title === 'Tổng'" class="border-t border-gray-300 dark:border-gray-600 my-2" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { State } from '~/store';
import { useNuxtApp } from '#app';

const { $common, $api } = useNuxtApp();

// Định nghĩa kiểu dữ liệu cho các mục trong menu
interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
}

const expandedIndices = ref<number[]>([]); // Quản lý các mục đang mở rộng
const activeIndex = ref<number | null>(null); // Quản lý mục cha đang được chọn
const activeSubIndex = ref<{ parentIndex: number | null, childIndex: number | null }>({ parentIndex: null, childIndex: null }); // Quản lý mục con đang được chọn

const menuItems = ref<MenuItem[]>([
  {
    title: 'Tổng',
    icon: 'pi pi-users',
    children: [
      { title: 'Nhân sự', icon: 'pi pi-user', path: '/gland/main/hr' },
      { title: 'Phòng ban', icon: 'pi pi-briefcase', path: '/gland/main/dept' },
      { title: 'Ví', icon: 'pi pi-wallet', path: '/gland/main/wallet' },
      { title: 'Kho dữ liệu', icon: 'pi pi-database', path: '/gland/main/repo' },
    ],
  },
  {
    title: 'Phòng Kinh Doanh (Lan test)',
    icon: 'pi pi-building',
    children: [
      { title: 'Nhân sự', icon: 'pi pi-user' },
      { title: 'Ví', icon: 'pi pi-wallet' },
      { title: 'Kho dữ liệu', icon: 'pi pi-database' },
      { title: 'Kịch bản', icon: 'pi pi-sitemap',
        children: [
          { title: 'Nhiệm vụ 1', icon: 'pi pi-file' },
          { title: 'Nhiệm vụ 2', icon: 'pi pi-file' },
          { title: 'Nhiệm vụ 3', icon: 'pi pi-file' },
        ]
      },
      { title: 'Nhiệm vụ VẬN ĐƠN', icon: 'pi pi-file' },
      { title: 'Nhiệm vụ DUYỆT HỢP ĐỒNG', icon: 'pi pi-file' },
      { title: 'Nhiệm vụ TELESALE', icon: 'pi pi-file' },
    ],
  },
]);

const isAdmin = computed(() => $common.getAdmin());

onMounted(() => {
  // Mở rộng mục "Tổng" mặc định
  const tongIndex = menuItems.value.findIndex(item => item.title === 'Tổng');
  if (tongIndex !== -1 && isAdmin.value) {
    expandedIndices.value.push(tongIndex);
    activeIndex.value = tongIndex;
  }
});

const toggleSubMenu = (index: number): void => {
  if (expandedIndices.value.includes(index)) {
    expandedIndices.value = expandedIndices.value.filter(i => i !== index);
  } else {
    expandedIndices.value.push(index);
  }
  activeIndex.value = index; // Đặt mục cha này thành active
  activeSubIndex.value = { parentIndex: null, childIndex: null }; // Đặt lại mục con
};

const isActive = (index: number): boolean => {
  return activeIndex.value === index;
};

const setActiveSubMenu = (parentIndex: number, childIndex: number): void => {
  activeSubIndex.value = { parentIndex, childIndex };
};

const isActiveSubMenu = (parentIndex: number, childIndex: number): boolean => {
  return activeSubIndex.value.parentIndex === parentIndex && activeSubIndex.value.childIndex === childIndex;
};
</script>
