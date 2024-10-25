import { Request, Response } from "express"
import Project from "../models/Project";
import { isValidObjectId } from "mongoose";

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

            try{
                await Project.create(req.body)
                res.send('proyecto creado correctamente');
            } catch(error){
                console.log(error.message);
            }

    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects);
        } catch(error){
            console.log(error);
        }
    }

    static getProjectById = async (req: Request, res: Response): Promise<void> => {
        const {id} = req.params
        try {
            const project = await  Project.findById(id).populate('tasks');
 
            if(!project){
                const error= new Error('Proyecto no encontrado')
                res.status(400).json({error: error.message})
                return
            }
            res.json(project)
        } catch (error) {
            console.log(error)
            
        }
    } 

    static updateProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        try {
            const project = await Project.findByIdAndUpdate(id, req.body)

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(400).json({ error: error.message })
                return
            }

            await project.save()
            res.send('proyecto actualizado');
        } catch (error) {
            console.log(error)
            
        }
    }

    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(400).json({ error: error.message }) 
            }

            await project.deleteOne()
            res.send('proyecto eliminado');
        } catch (error) {
            console.log(error)
            
        }
    }

}