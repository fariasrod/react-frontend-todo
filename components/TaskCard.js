// components/TaskCard.js
import React, { useState } from 'react';
import { Card, ListGroup, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import api from '../src/app/services/api';
import { TaskModel } from '../src/app/models/project';

const TodoItem = ({ id, description, isDone, onToggle }) => (
  <ListGroup.Item>
    <Form.Check
      type="checkbox"
      label={description}
      id={`checkbox-${id}`}
      checked={isDone}
      onChange={!isDone ? onToggle : null}
      disabled={isDone}
      custom
    />
  </ListGroup.Item>
);

const TaskList = ({ title, projectTasks, onTaskToggle }) => {
  return (
    <div className="mb-4">
      <h6>{title}</h6>
      <ListGroup>
        {projectTasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            description={task.description}
            isDone={task.isDone}
            onToggle={() => onTaskToggle(task.id, task.isDone)}
          />
        ))}
      </ListGroup>
    </div>
  );
};

const TaskCard = ({ name, projectId, projectTasks: initialTasks, onDelete }) => {
  const [projectTasks, setProjectTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  const handleTaskToggle = async (taskId, isDone) => {
    try {
      const updatedTasks = [...projectTasks];
      const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        updatedTasks[taskIndex].isDone = !isDone;

        const updatedTask = await api.put(`/tasks/${taskId}`, {
          description: 'was changed!!! TODO',
          is_done: !isDone,
        });
        const taskModelUpdated = new TaskModel(updatedTask.data.id, updatedTask.data.project_id, updatedTask.data.description, updatedTask.data.is_done, updatedTask.data.finish_date);
        setProjectTasks([...projectTasks, taskModelUpdated]);
      }
    } catch (error) {
      console.error('Error when updating task status :', error);
    }
  };

  const handleAddTask = async () => {
    try {
      if (newTaskText.trim() !== '') {
        const response = await api.post('/tasks', {
          description: newTaskText,
          project_id: projectId,
        });

        const newTask = new TaskModel(response.data.id, response.data.project_id, response.data.description, response.data.is_done, response.data.finish_date);
        const updatedTasks = [...projectTasks, newTask];
        setProjectTasks(updatedTasks);
        setNewTaskText('');
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleDeleteCard = async () => {
    onDelete();
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>{name}</span>
        <div className="d-flex align-items-center">
          <Button variant="link" className="mr-2">
            <BsPencilSquare size={18} />
          </Button>
          <Button variant="link" onClick={handleDeleteCard}>
            <BsTrash size={18} />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <TaskList title="TODO" projectTasks={projectTasks.filter(task => task.isDone === 0)} onTaskToggle={handleTaskToggle} />
        <TaskList title="DONE" projectTasks={projectTasks.filter(task => task.isDone === 1)} onTaskToggle={handleTaskToggle} />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <Form.Group className="mb-3 flex-grow-1 mr-2">
          <Form.Control
            type="text"
            placeholder="New Task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" size="sm" onClick={handleAddTask}>
          Add
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;
