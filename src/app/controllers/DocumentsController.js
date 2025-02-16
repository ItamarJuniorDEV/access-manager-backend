import UserManageAccess from '../models/UserManageAccessModel';
import { ManageAccessEnumerator } from '../Utils/globals';

const featureId = ManageAccessEnumerator.Documents;


export async function GetDocumentsController(req, res) {
    const { user_id } = req.query;

    const access = await UserManageAccess.findOne({
        where: { user_id, feature: featureId }
    });

    if (!access)
        return res.status(401).json({ message: 'Não autorizado' });

    if (access.revoked)
        return res.status(401).json({ message: 'O acesso foi revogado' });

    if (access.data_final < new Date())
        return res.status(401).json({ message: 'O acesso expirou' });

    return res.status(200).json({
        message: 'Acesso aos documentos concedido'
    });
}