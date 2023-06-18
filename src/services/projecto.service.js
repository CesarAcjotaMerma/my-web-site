import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

const getAll = async () => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await axios.get(`${baseURL}/projects`, config);

    return response.data.projects;

}

const getById = async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await axios.get(`${baseURL}/projects/${id}`, config);
    return response.data.projects;
}

const create = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    }

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("image", data.image);
    formData.append("category", data.category);
    formData.append("estado", data.estado);

    const response = await axios.post(`${baseURL}/projects`, formData, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('DATA REGISTRADO CREADO', 'El registro se ha agregado correctamente','success', 1500, 'bottom');
        return response.data.techStacks;
    }
}

const update = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    }

    const formData = new FormData();
    
    // Validar el campo 'image' antes de incluirlo en el formData
    if (data.image instanceof File) {
        formData.append("image", data.image);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("category", data.category);
    formData.append("estado", data.estado);

    const response = await axios.put(`${baseURL}/projects/${data._id}`, formData, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('REGISTRO MODIFICADO', 'El registro se ha modificado correctamente','success', 1500, 'bottom');
        return response.data.techstack;
    }
}

// Delete a user

const deleteProject = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const response = await axios.delete(`${baseURL}/projects/${id}`, config);
    ToastChakra('DATA ELIMINADO', 'El registro se ha eliminado correctamente','success', 1500, 'bottom');
    return response.data.projects;
}

// delete all 
const deleteAll = async () =>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await axios.delete(`${baseURL}/projects`, config);
    return response.data.projects;
}

const projectService = {
    getAll,
    getById,
    create,
    update,
    deleteProject,
    deleteAll
}

export default projectService;