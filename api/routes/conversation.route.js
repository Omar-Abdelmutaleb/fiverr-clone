import express from "express";
import { getConversations, createConversation, getSingleConversation, updateConversation } from "../controllers/conversation.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post('/', verifyToken, createConversation)
router.put('/:id', verifyToken, updateConversation)
router.get('/', verifyToken, getConversations)
router.get('/single/:id', verifyToken, getSingleConversation)

export default router;