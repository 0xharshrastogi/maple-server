import express from 'express';
import ApiError from '../../controller/error.control';
import ClassModel from '../../database/model/classroom.model';
import NotificationModel from '../../database/model/notification.model';
import { handleAsync } from '../../middleware/index';

const route = express.Router();

route.post(
  '/notification',
  handleAsync(async (req, res) => {
    console.log(req.body);
    const { classID, title } = req.body;
    const classroom = await ClassModel.findClassroomByID(classID);
    if (!classroom) throw ApiError.notFound(`Classroom with ClassID: ${classID} Not Found`);
    const result = await NotificationModel.create({ classID: classroom.id, title });
    res.json(result);
  })
);

route.get(
  '/notification',
  handleAsync(async (req, res) => {
    const notifications = await NotificationModel.find({});
    res.json(notifications);
  })
);

route.get(
  '/:classID/notification',
  handleAsync(async (req, res) => {
    const { classID } = req.params;
    const classroom = await ClassModel.findClassroomByID(classID);

    if (!classroom) throw ApiError.notFound(`Classroom with ClassID: ${classID} Not Found`);
    const notifications = await NotificationModel.find({ classID: classroom.id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  })
);

export default route;
