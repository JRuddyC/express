import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequelizeDbConection";
import User from "./user";
import UserRole from "./userRole";
class Role extends Model { }

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nameRole: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Nombre de rol obligatorio'
                },
                notEmpty: {
                    msg: 'Nombre de rol no puede ir vacio'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Role'
    }
)

export default Role