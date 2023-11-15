import React, { useEffect, useState } from 'react';
import { Container, Navbar, Row, Col, Form, Button } from 'react-bootstrap';
import TaskCard from '../components/TaskCard';
import ProjectService from '../src/app/services/ProjectService';
import { ProjectModel, TaskModel } from '../src/app/models/project';
import styled from 'styled-components';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import api from '../src/app/services/api';
import TokenService from '../src/app/services/TokenService';


const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editProjectName, setEditProjectName] = useState(''); 
  const [editProjectId, setEditProjectId] = useState(null);
  const userId = TokenService.getIdFromToken();

  const handleOpenEditModal = (projectId, projectName) => {
    setIsEditModalOpen(true);
    setEditProjectId(projectId);
    setEditProjectName(projectName);
  };

  const handleCloseEditModal = () => {
    setEditProjectId(null);
    setEditProjectName('');
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    console.log()
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchProjects();

  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get(`/projects/user/${userId}`);
      const parsedData = response.data.map(project => new ProjectModel(project.id, project.user, project.name, project.tasks));
      setProjects(parsedData);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  const handleCreateProject = async () => {
    if (newProjectTitle.trim() !== '') {
      try {
        const createdProject = await ProjectService.createProject(newProjectTitle);
        setProjects([...projects, createdProject]);
        setNewProjectTitle('');
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
  };

  const handleSaveProjectName = async (newName) => {
    try {
      await ProjectService.updateProjectName(editProjectId, newName);
      fetchProjects();
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating project name:', error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await ProjectService.deleteProject(editProjectId);
      fetchProjects();
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <>
      <EditModal
        isOpen={isEditModalOpen}
        initialValue={editProjectName}
        onSave={handleSaveProjectName} // Implemente essa função
        onCancel={handleCloseEditModal}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteProject} // Implemente essa função
        onCancel={handleCloseDeleteModal}
      />
      <StyledContainer>

        <Navbar className="bg-body-tertiary">
          <StyledContainer>
            <Navbar.Brand href="#home">BOLT TECH TODO PROJECT</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Rodrigo Farias</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </StyledContainer>
        </Navbar>

        <StyledContainer>
          <Row xs={3} md={3} lg={3}>

            {projects.map((project) => (
              <Col key={project.id} className="mb-4">
                <TaskCard
                  name={project.name}
                  projectId={project.id}
                  projectTasks={project.tasks}
                  onOpenEditModal={() => handleOpenEditModal(project.id, project.name)}
                  onOpenDeleteModal={handleOpenDeleteModal}
                  />
              </Col>
            ))}


            <FormContainer>
              <h2>Create a new project</h2>
              <div className="form-group">
                <input
                  type="text"
                  id="project-name"
                  placeholder="Project name"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                />
              </div>
              <button className="btn" type="button" onClick={handleCreateProject}>
                Create Project
              </button>
            </FormContainer>
          </Row>
        </StyledContainer>
      </StyledContainer>



    </>
  );
};

export default DashboardPage;

const StyledContainer = styled(Container)`
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 28px;
  }

  .user-info {
    cursor: pointer;
  }
`;


const FormContainer = styled.div`
  background: #efefef;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  height: max-content;

  h2 {
    text-align: center;
    margin-bottom: 10px;
    color: #333;
    font-size: 28px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      color: #666;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #007bff;
      }
    }
  }

  .btn {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #03b3e1;
    color: white;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }

    &:focus {
      outline: none;
    }
  }
`;
