import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequelizeDbConection";
class Person extends Model { }

Person.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Campo obligatorio"
                },
                notEmpty: {
                    msg: "El nombre no puede estar vacío",
                },
            }
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Campo obligatorio"
                },
                notEmpty: {
                    msg: "El apellido no puede estar vacío",
                },
            }
        },
        ci: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "CI",
                msg: "El CI ya esta en uso"
            },

            validate: {
                notNull: {
                    msg: "Campo obligatorio"
                },
                notEmpty: {
                    msg: "El ci no puede estar vacío",
                },
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Campo obligatorio"
                },
                notEmpty: {
                    msg: "La edad no puede estar vacía",
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'Person',
    }
)

export default Person