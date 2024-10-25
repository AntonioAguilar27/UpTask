import { Router } from "express";
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";

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
    TaskController.createTask
);


export default router;
