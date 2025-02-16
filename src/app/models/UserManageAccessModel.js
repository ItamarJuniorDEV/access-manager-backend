import Sequelize, { Model } from 'sequelize';
import User from './UserModel';

class UserManageAccess extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                feature: { // Verifica classe ManageAccessEnumerator
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: Sequelize.UUID,
                    references: {
                        model: User,
                        key: User.id
                    }
                },
                initial_date: {
                    type: Sequelize.DATE
                },
                final_date: {
                    type: Sequelize.DATE
                },
                revoked: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                tableName: 'user_manage_access',
            }
        );

        return this;
    }
}

export default UserManageAccess;