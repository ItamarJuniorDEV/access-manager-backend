import jwt from 'jsonwebtoken';
import User from '../../app/models/UserModel';

export async function CreateUserController(req, res) {
    const { name, email, password_hash } = req.body;
    const user = await User.create({ name, email, password_hash });
    return user;
}

export async function LoginController(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { email: username, password_hash: password }
    })

    if (user && !user.active)
        return res.status(401).json({ message: 'Este usuário não está aprovado.' });

    if (username === user?.email && password === user?.password_hash) {
        const user = { username };

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '60m' });

        return res.json({ token });
    }

    return res.status(400).json({ message: 'Credenciais inválidas' });
}

export async function AproveController(req, res) {
    const { email, approved } = req.body;

    const [updateRows] = await User.update(
        {
            active: approved
        },
        {
            where: { email }
        }
    );

    return res.status(200).json(updateRows);
}