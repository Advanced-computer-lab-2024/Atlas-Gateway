import { Router } from "express";

import * as notificationController from "../../Controllers/Interactions/notification.controller";

const notificationRouter = Router();

notificationRouter.post("/create", notificationController.createNotification);
notificationRouter.get("/list", notificationController.getAllNotifications);
notificationRouter.get("/get", notificationController.getNotificationsByUserId);
notificationRouter.get("/show/:id", notificationController.getNotificationById);
notificationRouter.put("/update/:id", notificationController.updateNotificationById);
notificationRouter.post("/read/:id", notificationController.markNotificationAsRead);
notificationRouter.delete("/delete/:id", notificationController.deleteNotification);

export default notificationRouter;
