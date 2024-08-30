import type { AxiosResponse } from 'axios';

export class DepartmentService {
  private $api: any;

  constructor($api: any) {
    this.$api = $api;
  }

  private baseUrl = "http://apiv2.g-center.io.vn:9999/dpt";
  
  async getDepartments(pageSize: number, pageNum: number): Promise<{ departments: any[], totalRecords: number }> {
    try {
      const response: any = await this.$api.sendGetApi(
        `${this.baseUrl}?pageSize=${pageSize}&pageNum=${pageNum}`,
        true
      );
  
      if (response.result) {
        return {
          departments: response.result.departments || [],
          totalRecords: response.result.totalPage || 0
        };
      } else {
        console.error('Unexpected response format:', response.result);
        return { departments: [], totalRecords: 0 };
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return { departments: [], totalRecords: 0 };
    }
  }
  

  async getDepartmentById(departmentId: number): Promise<any> {
    try {
      const response: any = await this.$api.sendGetApi(
        `${this.baseUrl}/${departmentId}`,
        true
      );

      // Sử dụng response.result mà không có lỗi TypeScript
      if (response.result) {
        return response.result;
      } else {
        console.error('Unexpected response format:', response.result);
        return null;
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  async createDepartment(department: any): Promise<any> {
    try {
      const response: any = await this.$api.sendPostApi(
        this.baseUrl,
        department,
        true
      );

      // Sử dụng response.result mà không có lỗi TypeScript
      if (response.result) {
        return response.result;
      } else {
        return null;
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  async updateDepartment(departmentId: number, department: any): Promise<any> {
    try {
      const response: any = await this.$api.sendPutApi(
        `${this.baseUrl}/${departmentId}`,
        department,
        true
      );

      if (response.result) {
        return response.result;
      } else {
        return null;
      }
      
    } catch (error) {
      console.error('Error updating department:', error);
      return null;
    }
  }

  async deleteDepartment(departmentId: number): Promise<any> {
    try {
      const response: any = await this.$api.sendDeleteApi(
        `${this.baseUrl}/${departmentId}`,
        true
      );

      if (response.result) {
        return response.result;
      } else {
        return null;
      }
      
    } catch (error) {
      console.error('Error deleting department:', error);
      return null;
    }
  }

}
