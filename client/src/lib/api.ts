import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos
export interface Course {
  id: number;
  name: string;
  code: string;
  description?: string;
  minimum_months: number;
  accepted_positions: string[];
  is_active: boolean;
}

export interface Document {
  id: number;
  filename: string;
  file_type: string;
  uploaded_at: string;
}

export interface ValidationResult {
  id: number;
  document_id: number;
  course_id: number;
  status: 'approved' | 'rejected' | 'manual_review';
  required_months: number;
  found_months: number;
  position_match?: string;
  validation_details?: any;
  validated_at: string;
}

// Serviços
export const CourseService = {
  getAll: async () => {
    const response = await api.get<{ courses: Course[], total: number }>('/courses/');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Course>(`/courses/${id}`);
    return response.data;
  },
  
  create: async (data: Omit<Course, 'id'>) => {
    const response = await api.post<Course>('/courses/', data);
    return response.data;
  }
};

export const DocumentService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<Document>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  extract: async (id: number) => {
    const response = await api.post<any[]>(`/documents/${id}/extract`);
    return response.data;
  }
};

export const ValidationService = {
  validate: async (documentId: number, courseId: number) => {
    const response = await api.post<ValidationResult>('/validations/', {
      document_id: documentId,
      course_id: courseId
    });
    return response.data;
  },
  
  getSummary: async (id: number) => {
    const response = await api.get<any>(`/validations/${id}/summary`);
    return response.data;
  }
};

export default api;
