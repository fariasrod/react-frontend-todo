export class TaskModel {
  constructor(id, projectId, description, isDone, finishDate) {
    this.id = id;
    this.projectId = projectId;
    this.description = description;
    this.isDone = isDone;
    this.finishDate = finishDate;
  }
}

export class ProjectModel {
  constructor(id, user, name, tasks) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.tasks = tasks ? tasks.map(task => new TaskModel(task.id, task.project_id, task.description, task.is_done, task.finish_date)) : [];
  }
}


module.exports = { ProjectModel, TaskModel };