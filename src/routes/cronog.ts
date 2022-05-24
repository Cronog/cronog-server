import express from "express";
import requireAuth from "../middleware/authMiddleware";
import * as cronogService from "../services/cronog";

const router = express.Router()

router.get('/cronog/:userId/:id', async (req, res) => {
    const response = await cronogService.getCronogById(req);
    res.send(response);
});

router.get('/cronog/:userId', requireAuth, async (req, res) => {
    const response = await cronogService.getCronogByUserId(req);
    res.send(response);
});

router.post('/cronog', requireAuth, async (req, res) => {
    const response = await cronogService.saveCronog(req);
    res.send(response);
});

router.put('/cronog/:userId/:id', requireAuth, async (req, res) => {
    const response = await cronogService.updateCronog(req);
    res.send(response);
});

router.delete('/cronog/:userId/:id', requireAuth, async (req, res) => {
    const response = await cronogService.deleteCronog(req);
    res.send(response);
});



export default router;
