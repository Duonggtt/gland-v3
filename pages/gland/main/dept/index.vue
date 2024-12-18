<template>
  <div>
    <div v-if="state === 'default'">
      <Toast />
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">Phòng ban</h1>
        <Button 
          label="Tạo phòng ban mới" 
          severity="info" 
          icon="pi pi-plus" 
          class="p-button-sm border-0 bg-blue-500 hover:bg-blue-700 text-white"
          @click="createDepartment()"
        />
      </div>

      <div class="p-6 rounded-lg shadow-lg ">
      
        <!-- Search and Filter -->
        <div class="mb-4">
          <div class="flex justify-end pb-4">
            <IconField>
              <InputText v-model="searchValue" placeholder="Tìm kiếm" class="h-10"/>
              <InputIcon class="pi pi-search" />
            </IconField>
          </div>
          
          <hr class="my-4 border-gray-200" />
          
          <div class="flex justify-end">
            <Button 
              icon="pi pi-filter" 
              severity="info" text
              class="p-button-sm text-white"
              @click="filterVisible = true"
            />
          </div>
          <Dialog :visible="filterVisible" modal :closable="false" header="Lọc theo..." :style="{ width: '25rem' }">
            
            <div class="flex justify-items-end gap-2">
                <Button type="button" label="Hủy" severity="danger" @click="filterVisible = false"></Button>
                <Button type="button" label="Lọc" severity="secondary" @click="filterVisible = false"></Button>
            </div>
          </Dialog>
        </div>
        
        <hr class="my-4 border-gray-200" />
        
        <!-- Table -->
        <DataTable 
          :value="departments"
          :paginator="true"
          :rows="pageSize"
          :totalRecords="totalRecords"
          :first="first"
          :lazy="true"
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
          <Dialog :visible="visible" modal :closable="false" :style="{ width: '25rem' }">
            <img class="mx-auto w-1/4" src="../../../../static/img/remove-confirm.png" alt="delete_alt">
            <h1 class="text-center text-3xl font-medium text-gray p-4 mb-4">Xác nhận xóa ?</h1>
            <p class="text-center text-gray-500 mb-4">
              Bạn có chắc chắn muốn xóa không? Xóa rồi 
              <br>
              thì sẽ không thể khôi phục.
            </p>
            <div class="flex justify-evenly p-4">
              <Button type="button" label="Xóa" severity="danger" class="p-1 text-xs h-10" @click="confirmDelete"></Button>
              <Button type="button" label="Hủy" severity="secondary" class="p-1 text-xs h-10" @click="visible = false"></Button>
            </div>
          </Dialog>
      </div>
    </div>
    
    <div v-else-if="state === 'update'" class="p-6">
      <Toast />
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">Sửa phòng ban</h1>
      </div>
      
      <div class="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <div class="grid grid-cols-2 gap-4">
          <!-- Tên Field -->
          <div>
            <label for="name" class="block font-semibold mb-2">Tên<span class="text-red-500">*</span></label>
            <InputText id="name" v-model="department.name" class="w-full h-10" placeholder="Nhập tên phòng ban" />
          </div>
          <!-- Note Field -->
          <div>
            <label for="note" class="block font-semibold mb-2">Note</label>
            <InputText id="note" v-model="department.note" class="w-full h-10" placeholder="Nhập ghi chú" />
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex justify-start mt-6 space-x-4">
        <Button label="Sửa" class="p-button-primary p-1 text-xs h-9" icon="pi pi-check" @click="updateDepartment" />
        <Button label="Quay lại" class="p-button-secondary p-1 text-xs h-9" icon="pi pi-arrow-left" @click="goBack" />
      </div>
    </div>

    <div v-else-if="state === 'create'" class="p-6">
      <Toast />
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">Tạo phòng ban mới</h1>
      </div>
      
      <div class="p-6 dark:bg-gray-900  00 shadow-md rounded-lg">
        <div class="grid grid-cols-2 gap-4">
          <!-- Tên Field -->
          <div>
            <label for="name" class="block font-semibold mb-2">Tên<span class="text-red-500">*</span></label>
            <InputText id="name" v-model="newDepartment.name" class="w-full h-10" placeholder="Nhập tên phòng ban" />
          </div>
          <!-- Note Field -->
          <div>
            <label for="note" class="block font-semibold mb-2">Note</label>
            <InputText id="note" v-model="newDepartment.note" class="w-full h-10" placeholder="Nhập ghi chú" />
          </div>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex justify-start mt-6 space-x-4 ">
          <Button label="Tạo" class="p-button-primary p-1 text-xs h-9" icon="pi pi-check" @click="createNewDepartment" />
          <Button label="Tạo & Tiếp tục tạo mới" class="p-button-secondary p-1 text-xs h-9" icon="pi pi-plus" @click="createAndContinue" />
          <Button label="Quay lại" class="p-button-secondary p-1 text-xs h-9" icon="pi pi-arrow-left" @click="goBack" />
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { DepartmentService } from '@/pages/gland/main/dept/deptService';
  import { useNuxtApp } from '#app';

  definePageMeta({
    middleware: 'auth' 
  });

  interface Department {
    id: number;
    name: string;
    note: string;
    createdAt: string;
  }


  const { $common } = useNuxtApp();
  const { $api } = useNuxtApp();
  const searchValue = ref<string | null>(null);
  const size = ref<{ label: string; value: string }>({ label: 'Large', value: 'large' });
  const departments = ref<Department[]>([]);
  const totalRecords = ref<number>(0);
  const first = ref<number>(0);
  const pageSize = ref<number>(5);
  const state = ref<string>('default');
  const selectedDepartmentId = ref<number | null>(null); 
  const deptIdToDelete= ref<number | null>(null); 
  const selectedDepartments = ref<Department[]>([]);
  const visible = ref(false);
  const filterVisible = ref(false);
  const department = ref<Department>({
    id: 0, 
    name: '',
    note: '',
    createdAt: new Date().toISOString(),
  });

  const newDepartment = ref<Department>({
    id: 0, 
    name: '',
    note: '',
    createdAt: new Date().toISOString(),
  });

  const departmentService = new DepartmentService($api);

  onMounted(() => {
    loadDepartments();
  });

  const resetData = () => {
    department.value = {
      id: 0,
      name: '',
      note: '',
      createdAt: new Date().toISOString(),
    };
  };

  const createNewDepartment = () => {
    if (!newDepartment.value.name.trim()) {
      $common.showError('Tên phòng ban không được để trống.');
      return;
    }

    if(departments.value.find(department => department.name === newDepartment.value.name)) {
      $common.showError('Tên phòng ban đã tồn tại.');
      return;
    }

    departmentService.createDepartment(newDepartment.value).then(data => {
      console.log('Create new department:', newDepartment.value);
      $common.showSuccess('Tạo phòng ban mới thành công.');
      resetData();
    });
    setTimeout(() => {
      loadDepartments();
      state.value = 'default';
    }, 1500);
  };

  const createAndContinue = () => {
    if (!newDepartment.value.name.trim()) {
      $common.showError('Tên phòng ban không được để trống.');
      return;
    }

    if(departments.value.find(department => department.name === newDepartment.value.name)) {
      $common.showError('Tên phòng ban đã tồn tại.');
      return;
    }

    departmentService.createDepartment(newDepartment.value).then(data => {
      console.log('Create new department:', newDepartment.value);
      $common.showSuccess('Tạo phòng ban mới thành công.');
      resetData();
    });
  };

  const goBack = () => {
    loadDepartments();
    state.value = 'default';
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const loadDepartments = (page: number = 0) => {
    const params = { pageSize: pageSize.value, pageNum: page };

    departmentService.getDepartments(params.pageSize, params.pageNum).then(data => {
      console.log('dpt: ', data);
      departments.value = data.departments.map((department: Department) => ({
        ...department,
        createdAt: formatDate(department.createdAt),
      }));
      totalRecords.value = data.totalRecords;
    });
  };



  const onPageChange = (event: any) => {
    console.log("Page change event:", event);
    first.value = event.first;  
    const currentPage = Math.floor(first.value / pageSize.value);  
    loadDepartments(currentPage);  
  };


  // Hàm xử lý thay đổi selection
  const onSelectionChange = (e: { value: Department[] }) => {
    selectedDepartments.value = e.value;
    console.log("Selected departments:", selectedDepartments.value);
};

  const updateDepartment = () => {
    if (!department.value.name.trim()) {
      $common.showError('Tên phòng ban không được để trống.');
      return;
    }
    departmentService.updateDepartment(department.value.id, department.value).then(data => {
      console.log('Updating new department:', department.value);
      $common.showSuccess('Sửa phòng ban thành công.');
      resetData();
    });
    console.log('Update department:', department.value);
    setTimeout(() => {
      loadDepartments();
      state.value = 'default';
    }, 1500);
  };

  const editDepartment = (id: number) => {
    console.log("Edit department with ID:", id);
    selectedDepartmentId.value = id; 
    loadDepartmentDetails(id);
    state.value = 'update'; 
  };

  const loadDepartmentDetails = (id: number) => {
    departmentService.getDepartmentById(id).then(data => {
      department.value = data;
    });
  };

  const createDepartment = () => {
    state.value = 'create'; 
  };

  const deleteDepartment = (id: number) => {
    deptIdToDelete.value = id;
    visible.value = true;
  };

  const confirmDelete = () => {
    if (deptIdToDelete.value !== null) {
      departmentService.deleteDepartment(deptIdToDelete.value).then(data => {
          $common.showSuccess('Xóa phòng ban thành công.');
          loadDepartments(); 
      }).catch(error => {
        console.error("Error deleting department:", error);
        $common.showError('Đã xảy ra lỗi trong quá trình xóa phòng ban.');
      }).finally(() => {
        visible.value = false; 
      });
    } else {
      $common.showError('Không tìm thấy ID phòng ban.');
      visible.value = false;
    }
  };

  
</script>
