import { listActions } from '@/http/controllers/actionController';
import { listCollaborators } from '@/http/controllers/collaboratorController';
import { createJourney, listJourneys } from '@/http/controllers/journeyController';
import { Request, Response } from 'express';

import express from "express";

const router = express.Router();

router.post("/journey", (req: Request, res: Response) => {
  createJourney(req, res);
});

router.get("/journeys", (req: Request, res: Response) => {
  listJourneys(req, res);
});

router.get("/collaborators", (req: Request, res: Response) => {
  listCollaborators(req, res);
});

router.get("/actions", (req: Request, res: Response) => {
  listActions(req, res); 
});

export default router; 