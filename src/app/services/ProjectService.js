import { ProjectModel, TaskModel } from '../models/project';
import api from './api';
import TokenService from './TokenService';

class ProjectService {
  static async getProjects() {
    try {
      const user = TokenService.getIdFromToken();
      const response = await api.get(`/projects/user/${user}`);
      return this.mapToProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    }
  }

  static async createProject(name) {
    try {
      const user = TokenService.getIdFromToken();
      const projectModel = { name, user };
      const response = await api.post(`/projects`, projectModel);
      return this.mapToProject(response.data);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  }

  static mapToProject(data) {
    const { id, name } = data;
    return new ProjectModel(id, name);
  }

  static mapToProjects(data) {
    return data.map(projectData => {
      const { id, name, tasks } = projectData;
      return new ProjectModel(id, name, this.mapToTasks(tasks));
    });
  }

  static mapToTasks(tasks) {
    return tasks.map(taskData => new TaskModel(
      taskData.id,
      taskData.description,
      taskData.is_done !== undefined ? taskData.is_done === 1 : false,
      taskData.finish_date ? new Date(taskData.finish_date) : null
    ));
  }
}

export default ProjectService;
