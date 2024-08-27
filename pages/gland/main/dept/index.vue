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

    <div class="p-6 rounded-lg shadow-lg bg-white">
    
      <!-- Search and Filter -->
      <div class="mb-4">
        <div class="flex justify-end pb-4">
          <IconField>
            <InputText v-model="searchValue" placeholder="Tìm kiếm"/>
            <InputIcon class="pi pi-search" />
          </IconField>
        </div>
        
        <hr class="my-4 border-gray-200" />
        
        <div class="flex justify-end">
          <Button 
            icon="pi pi-filter" 
            severity="info" text
            class="p-button-sm text-white"
          />
        </div>
      </div>
      
      <hr class="my-4 border-gray-200" />
      
      <!-- Table -->
      <DataTable 
        :value="departments"
        :selection="selectedDepartments"
        @selectionChange="onSelectionChange"
        tableStyle="min-width: 50rem"
        paginator 
        :rows="10" 
        :totalRecords="totalRecords" 
        :lazy="true"
        :first="first" 
        @page="onPageChange"
      >
            <!-- Checkbox Column -->
            <Column selectionMode="multiple" headerStyle="width: 3em; text-align: center;"></Column>

            <Column field="name" header="Tên" headerStyle="text-align: center;"></Column>
            <Column field="note" header="Ghi chú" headerStyle="text-align: center;"></Column>
            <Column field="createdAt" header="Ngày tạo" headerStyle="text-align: center;"></Column>

            <!-- Action Column -->
            <Column header="Thao tác" headerStyle="text-align: center;">
              <template #body="slotProps">
                <Button 
                  label="Sửa" 
                  icon="pi pi-pencil" 
                  severity="secondary" 
                  text 
                  @click="editDepartment(slotProps.data.id)"
                  class="p-button-sm p-mr-2"
                />
                <Button 
                  label="Xóa" 
                  icon="pi pi-trash" 
                  severity="danger" 
                  text 
                  @click="deleteDepartment(slotProps.data.id)"
                  class="p-button-sm"
                />
              </template>
            </Column>
        </DataTable>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { DepartmentService } from '@/pages/gland/main/dept/deptService';
  import { useNuxtApp } from '#app';

  interface Department {
    id: number;
    name: string;
    note: string;
    createdAt: string;
  }

  const { $api } = useNuxtApp();
  const searchValue = ref<string | null>(null);
  const size = ref<{ label: string; value: string }>({ label: 'Large', value: 'large' });

  const departments = ref<Department[]>([]);
  const totalRecords = ref<number>(0);
  const first = ref<number>(0);
  const pageSize = ref<number>(10);

  // Trạng thái lưu các mục được chọn
  const selectedDepartments = ref<Department[]>([]);

  const departmentService = new DepartmentService($api);

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const loadDepartments = (page: number = 0) => {
    const pageNum = page;
    const params = { pageSize: pageSize.value, pageNum };

    departmentService.getDepartments(params.pageSize, params.pageNum).then(data => {
      console.log('dpt: ', data);
      // Format ngày tạo trước khi lưu vào danh sách
      departments.value = data.departments.map((department: Department) => ({
        ...department,
        createdAt: formatDate(department.createdAt), // Định dạng lại ngày giờ
      }));
      totalRecords.value = data.totalRecords;
    });
  };

  onMounted(() => {
    loadDepartments();
  });

  const onPageChange = (event: any) => {
    first.value = event.first;
    loadDepartments(event.page);
  };

  // Hàm xử lý thay đổi selection
  const onSelectionChange = (e: { value: Department[] }) => {
    selectedDepartments.value = e.value;
  };

  // Hàm xử lý khi nhấn nút "Sửa"
  const editDepartment = (id: number) => {
    console.log("Edit department with ID:", id);
    // Thực hiện hành động sửa phòng ban
  };

  // Hàm xử lý khi nhấn nút "Xóa"
  const deleteDepartment = (id: number) => {
    console.log("Delete department with ID:", id);
    // Thực hiện hành động xóa phòng ban
  };
</script>
