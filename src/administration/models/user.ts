import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequelizeDbConection";
import Person from "../../common/models/person";
import Role from "./role";
import UserRole from "./userRole";

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Campo obligatorio'
                },
                notEmpty: {
                    msg: 'El nombre de usuario no puede estar vacío'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Campo obligatorio'
                },
                notEmpty: {
                    msg: 'La contraseña no puede estar vacía'
                }
            }
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Person,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
)
User.belongsTo(Person, { foreignKey: 'person_id', })
Person.hasMany(User, { foreignKey: 'person_id' })

export default User