import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequelizeDbConection";
class Permission extends Model { }

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        namePermission: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Nombre de permiso obligatorio'
                },
                notEmpty:{
                    msg:'Nombre de permiso no puede ir vacio'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'Permission'
    }
)

export default Permission