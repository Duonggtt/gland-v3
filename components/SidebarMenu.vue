<template>
  <ul class="space-y-1 text-gray-800 dark:text-white">
    <li v-for="(item, index) in menuItems" :key="index">
      <div
        v-if="item.title === 'Tổng' ? isAdmin : true"
        @click="toggleSubMenu(index)"
        :class="[
          'flex items-center justify-between px-4 py-2 rounded-2xl cursor-pointer transition-all duration-150 w-full', 
          isActive(index) 
            ? 'bg-gray-50 dark:bg-gray-700 rounded-2xl' // Màu nền nhạt hơn khi đã nhấn
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl'  // Hiệu ứng hover nhạt hơn
        ]"
        :style="isActive(index) ? 'background-color: transparent; cursor: default; user-select: none;' : ''"
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
        :class="item.title === 'Kịch bản' ? 'ml-4 mt-2 space-y-1' : 'ml-4 mt-2 space-y-1'"
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
                ? 'bg-gray-50 dark:bg-gray-700 rounded-2xl'  // Màu nền nhạt hơn khi đã nhấn
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl'  // Hiệu ứng hover nhạt hơn
            ]"
            @click="setActiveSubMenu(index, childIndex)"
            :style="'user-select: none;'"
          >
            <i :class="child.icon" class="text-lg"></i>
            <span 
              class="ml-2 text-sm"
              :class="[
                isActiveSubMenu(index, childIndex) ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-300'
              ]"
            >{{ child.title }}</span>
          </router-link>

          <button
            v-else
            @click="setActiveSubMenu(index, childIndex)"
            :class="[
              'flex items-center px-4 py-2 rounded-2xl cursor-pointer transition-all duration-150 w-full', 
              isActiveSubMenu(index, childIndex) 
                ? 'bg-gray-50 dark:bg-gray-700 rounded-2xl'  // Màu nền nhạt hơn khi đã nhấn
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl'  // Hiệu ứng hover nhạt hơn
            ]"
            :style="'user-select: none;'"
          >
            <i :class="child.icon" class="text-lg"></i>
            <span 
              class="ml-2 text-sm"
              :class="[
                isActiveSubMenu(index, childIndex) ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-300'
              ]"
            >{{ child.title }}</span>
          </button>

          <!-- Hiển thị các phần tử scripts bên trong -->
          <ul class="ml-4 mt-2 space-y-1">
            <li v-for="(script, scriptIndex) in child.children" :key="scriptIndex" class="ml-4">
              <button
                class="flex items-center px-4 py-2 rounded-2xl cursor-pointer transition-all duration-150 w-full"
                @click="handleScriptClick(index, childIndex, scriptIndex)"
                :class="[
                  'text-sm', 
                  isActiveScript(index, childIndex, scriptIndex) 
                    ? 'text-gray-800 dark:text-white' 
                    : 'text-gray-800 dark:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-gray-800'  // Hiệu ứng hover nhạt hơn cho script
                ]"
                :style="'user-select: none;'"
              >
                <i class="pi pi-file text-lg"></i>
                <span class="ml-2">{{ script.title }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
      
      <hr v-if="item.title === 'Tổng'" class="border-t border-gray-300 dark:border-gray-600 my-2" />
    </li>
  </ul>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { State } from '~/store';
import { useNuxtApp } from '#app';

const { $common, $api } = useNuxtApp();

interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
}

const expandedIndices = ref<number[]>([]);
const activeIndex = ref<number | null>(null);
const activeSubIndex = ref<{ parentIndex: number | null, childIndex: number | null }>({ parentIndex: null, childIndex: null });
const activeScriptIndex = ref<{ parentIndex: number | null, childIndex: number | null, scriptIndex: number | null }>({ parentIndex: null, childIndex: null, scriptIndex: null });

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
]);

const isAdmin = computed(() => $common.getAdmin());

onMounted(async () => {
  const tongIndex = menuItems.value.findIndex(item => item.title === 'Tổng');
  if (tongIndex !== -1 && isAdmin.value) {
    expandedIndices.value.push(tongIndex);
    activeIndex.value = tongIndex;
  }

  // Gọi API lấy dữ liệu
  const response = await $api.sendGetApi('http://apiv2.g-center.io.vn:9999/menu');
  const departments = response.result.departments;

  // Cập nhật phần các phòng ban
  const departmentMenuItems = departments.map((department: { name: any; scripts: any[]; }) => {
    return {
      title: department.name,  // Tên phòng ban
      icon: 'pi pi-building',
      children: [
        { title: 'Nhân sự', icon: 'pi pi-user' },
        { title: 'Ví', icon: 'pi pi-wallet' },
        { title: 'Kho dữ liệu', icon: 'pi pi-database' },
        {
          title: 'Kịch bản',
          icon: 'pi pi-sitemap',
          children: department.scripts && department.scripts.length > 0
            ? department.scripts
                .filter(script => script && script.name)  // Loại bỏ các phần tử null và chỉ lấy những phần có name
                .map(script => ({
                  title: script.name,
                  icon: 'pi pi-file',
                }))
            : [{ title: 'Không có kịch bản', icon: 'pi pi-exclamation-triangle' }],  // Nếu không có scripts
        },
      ],
    };
  });

  // Thêm các phòng ban vào menuItems
  menuItems.value = [...menuItems.value, ...departmentMenuItems];
});

// Kiểm tra nếu script hiện đang được chọn
const isActiveScript = (parentIndex: number, childIndex: number, scriptIndex: number): boolean => {
  return activeScriptIndex.value.parentIndex === parentIndex && 
         activeScriptIndex.value.childIndex === childIndex && 
         activeScriptIndex.value.scriptIndex === scriptIndex;
};

const toggleSubMenu = (index: number): void => {
  if (expandedIndices.value.includes(index)) {
    expandedIndices.value = expandedIndices.value.filter(i => i !== index);
  } else {
    expandedIndices.value.push(index);
  }
  activeIndex.value = index;
  activeSubIndex.value = { parentIndex: null, childIndex: null };
  // Reset trạng thái active cho scripts khi mở/đóng các mục lớn
  activeScriptIndex.value = { parentIndex: null, childIndex: null, scriptIndex: null };
};

const isActive = (index: number): boolean => {
  return activeIndex.value === index;
};

const setActiveSubMenu = (parentIndex: number, childIndex: number): void => {
  activeSubIndex.value = { parentIndex, childIndex };
  // Reset trạng thái active cho scripts khi mở/đóng các mục nhỏ
  activeScriptIndex.value = { parentIndex: null, childIndex: null, scriptIndex: null };
};

// Xử lý khi click vào script
const handleScriptClick = (parentIndex: number, childIndex: number, scriptIndex: number): void => {
  activeScriptIndex.value = { parentIndex, childIndex, scriptIndex };
};

const isActiveSubMenu = (parentIndex: number, childIndex: number): boolean => {
  return activeSubIndex.value.parentIndex === parentIndex && activeSubIndex.value.childIndex === childIndex;
};
</script>
