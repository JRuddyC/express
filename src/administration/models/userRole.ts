import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequelizeDbConection";
import Role from "./role";
import User from "./user";
class UserRole extends Model { }

UserRole.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'UserRole'
    }
)
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id', as: 'roles'})
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id', as: 'users' })
export default UserRole