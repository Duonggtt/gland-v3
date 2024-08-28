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

      // Sử dụng response.result mà không có lỗi TypeScript
      if (response.result) {
        return {
          departments: response.result.departments || [],
          totalRecords: response.result.totalPage || 0
        };
      } else {
        // Nếu dữ liệu không như mong đợi, trả về mặc định
        console.error('Unexpected response format:', response.result);
        return { departments: [], totalRecords: 0 };
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return { departments: [], totalRecords: 0 };  // Trả về dữ liệu rỗng và số bản ghi là 0 nếu có lỗi
    }
  }

}
