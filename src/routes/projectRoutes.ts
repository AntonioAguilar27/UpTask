import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskExists } from "../middleware/task";


const router = Router();

// CREAR PROYECTO //
router.post(
  "/",
  [
    body("projectName")
      .notEmpty()
      .withMessage("El nombre del proyecto es obligatorio"),
    body("clientName")
      .notEmpty()
      .withMessage("El nombre del cliente es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    handleInputErrors,
  ],
  ProjectController.createProject
);

// BUSCAR PROYECTOS //
router.get("/", ProjectController.getAllProjects);
 
// BUSCAR PROYECTO POR ID //
router.get(
  "/:id",
  param("id").isMongoId().withMessage("El id no es valido"),
  handleInputErrors,
  ProjectController.getProjectById
);

// ACTUALIZAR PROYECTO POR ID //
router.put(
  "/:id",
  param("id").isMongoId().withMessage("El id no es valido"),

  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

// ELIMINAR PROYECTO POR ID //
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El id no es valido"),
  handleInputErrors,
  ProjectController.deleteProject
);

/** Routes for tasks */

// CREAR TASK EN UN  PROYECTO //
router.param("projectId", projectExist);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descricion de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.param("taskId", taskExists);
//router.param("taskId", taskBelongsToProject);

// OBTENER TODAS LAS TASK DE UN PROYECTO //
router.get("/:projectId/tasks", TaskController.getProjectTasks);

// OBTENER TASK DE UN PROYECTO POR ID //
router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id no es valido"),
  handleInputErrors,
  TaskController.getTaskById
);

// MODIFICAR TASK POR ID //
router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id no es valido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descricion de la tarea es obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

// ELIMINAR TASK POR ID //
router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("El id no es valido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectID/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("El id no es valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  TaskController.updateStatus
); 

export default router;
