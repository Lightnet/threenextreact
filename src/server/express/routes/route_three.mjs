/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();

import route_project from './three/route_project.mjs';
import route_scene from './three/route_scene.mjs';
import route_object3d from './three/route_object3d.mjs';

router.get('/', (req, res) => {
  //res.json({ error: 'Not found' });
  res.json({ message: 'three index' });
})

router.use(route_project);
router.use(route_scene);
router.use(route_object3d);

export default router;