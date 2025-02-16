import UserManageAccess from '../models/UserManageAccessModel';

export async function CreateUserAccessController(req, res) {
    const { feature, user_id, final_date } = req.body;

    const userAccess = await UserManageAccess.create({
        feature,
        user_id,
        final_date,
        initial_date: new Date()
    });

    return userAccess;
}

export async function RevokedUserAccessController(req, res) {
    const { feature, user_id } = req.body;

    const [updateRows] = await UserManageAccess.update(
        {
            revoked: true
        },
        {
            where: { feature, user_id }
        }
    );

    return res.status(200).json(updateRows);
}