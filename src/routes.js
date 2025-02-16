import { Router } from 'express';
import { GetDocumentsController } from './app/controllers/DocumentsController';
import { CreateUserAccessController, RevokedUserAccessController } from './app/controllers/ManageAccessController';
import { AproveController, CreateUserController, LoginController } from './app/controllers/UserController';
import { authenticateJWT } from './app/middlewares/authMiddleware';

const routes = Router();

routes.get('/', (req, res) => {
	return res.send('Tudo funcionando!');
});

routes.post('/user', authenticateJWT, async (req, res) => {
	try {
		const user = await CreateUserController(req, res);
		return res.status(201).json(user);
	} catch (error) {
		console.log("Erro ao criar o usuário", error);
		return res.status(500);
	}
})

routes.post('/login', async (req, res) => {
	try {
		return await LoginController(req, res);
	} catch (error) {
		console.log("Erro ao realizar o login", error);
		return res.status(500);
	}
})

routes.post('/user/approved', async (req, res) => {
	try {
		return await AproveController(req, res);
	} catch (error) {
		console.log("Erro ao aprovar usuário", error);
		return res.status(500);
	}
})

routes.post('/manageAccess', authenticateJWT, async (req, res) => {
	try {
		const userAccess = await CreateUserAccessController(req, res);
		return res.status(201).json(userAccess);
	} catch (error) {
		console.log("Erro ao conceder acesso a feature", error);
		return res.status(500);
	}
})

routes.post('/manageAccess/revoked', authenticateJWT, async (req, res) => {
	try {
		return await RevokedUserAccessController(req, res);
	} catch (error) {
		console.log("Erro ao conceder acesso a feature", error);
		return res.status(500);
	}
})

routes.get('/documents', authenticateJWT, async (req, res) => {
	try {
		return await GetDocumentsController(req, res);
	} catch (error) {
		console.log("Erro ao retorna a lista de documentos", error);
		return res.status(500);
	}
})

export default routes;