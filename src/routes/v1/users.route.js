import express from 'express';
import queryString from 'query-string';
import url from 'url';
import {
  createClassroom,
  createUser,
  deleteUser,
  findClassroomByUserID,
  listAllUser,
  searchUser,
  updateUser,
} from '../../controller/user-controller';
import { handleAsync } from '../../middleware';

const router = express.Router();

const queryparser = handleAsync((req, res, next) => {
  const { search } = url.parse(req.url);
  const result = queryString.parse(search, { parseBooleans: true, parseNumbers: true });
  req.query = result;
  next();
});

const selectors = handleAsync((req, res, next) => {
  let { select, id } = req.query;
  if (!select) return next();

  if (typeof select === 'string') select = select.split(' ');
  if (!id) select.push('-_id');
  req.query.select = select;
  next();
});

// Middleware for parsing query and parsing select fields
router.use(queryparser);

// operation
router.get('/user', listAllUser);
router.get('/user/:userID', searchUser);

router.get('/user/:userID/classroom', findClassroomByUserID);
router.put('/user/:userID/classroom', createClassroom);

router.post('/user', createUser);

router.delete('/user/:userID', deleteUser);

router.patch('/user/:userID', updateUser);

export default router;
