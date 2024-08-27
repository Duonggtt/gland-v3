<template>
    <div>
      <Toast />
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold text-gray-800">Phòng ban</h1>
          <Button 
            label="Tạo phòng ban mới" 
            severity="info" 
            icon="pi pi-plus" 
            class="p-button-sm border-0 bg-blue-500 hover:bg-blue-700 text-white"
          />
        </div>
      <div class="p-6 bg-white rounded-lg shadow-md">
    
        <!-- Search and Filter -->
        <div class="mb-4">
          <div class="flex justify-end">
            <IconField>
               <InputText v-model="searchValue" placeholder="Search" />
               <InputIcon class="pi pi-search" />
            </IconField>
          </div>
          <div>
            <Button 
              icon="pi pi-filter" 
              severity="info" text
              class="p-button-sm text-white"
            />
          </div>
        </div>
        
        <!-- Table -->
        <DataTable 
          :value="departments"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 25]"
          class="p-datatable-sm"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column field="name" header="Tên"></Column>
          <Column field="note" header="Ghi chú"></Column>
          <Column field="createdAt" header="Ngày tạo"></Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const searchValue = ref(null);
  
  const departments = ref([
    { name: 'Phòng A', note: 'Ghi chú A', createdAt: '01-01-2024' },
    { name: 'Phòng B', note: 'Ghi chú B', createdAt: '01-02-2024' },
  ]);
  </script>
  