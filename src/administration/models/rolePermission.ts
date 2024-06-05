import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequelizeDbConection";
import Role from "./role";
import Permission from "./permission";

class RolePermission extends Model { }

RolePermission.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'id'
            }
        },
        permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Permission,
                key: 'id'
            }
        }
    }, {
    sequelize,
    modelName: 'RolePermission'
}
)

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' })
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' })

export default RolePermission