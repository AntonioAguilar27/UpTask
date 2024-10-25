import { Router } from "express";
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project"

const router = Router(); 

// Definir las validaciones y middlewares en un array para que se ejecuten secuencialmente
router.post('/',
    [
        body('projectName')
            .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
        body('clientName')
            .notEmpty().withMessage('El nombre del cliente es obligatorio'),
        body('description')
            .notEmpty().withMessage('La descripción es obligatoria'),
        handleInputErrors
    ],
    ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id',
    param('id').isMongoId().withMessage('El id no es valido'),
    handleInputErrors,
    ProjectController.getProjectById
);

router.put('/:id',
    param('id').isMongoId().withMessage('El id no es valido'),

    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
);

router.delete('/:id',
    param('id').isMongoId().withMessage('El id no es valido'),
    handleInputErrors,
    ProjectController.deleteProject
);


/** Routes for tasks */

router.post('/:projectId/tasks',
    validateProjectExist,
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descricion de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    validateProjectExist,
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    validateProjectExist,
    TaskController.getTaskById
)

export default router;
