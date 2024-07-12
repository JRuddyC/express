import { UniqueConstraintError, ValidationError } from "sequelize";
import IPerson from "../interfaces/IPerson";
import PersonRepository from "../repositories/personRepository"

class PersonUsesCases {

    private personRepository: PersonRepository;

    constructor() {
        this.personRepository = new PersonRepository();
    }
    async create(person: IPerson) {
        try {
            const response = await this.personRepository.create(person)
            console.log(response);

            return {
                statusCode: 200,
                success: true,
                data: response
            }
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const uniqueErrors = {
                    key: "ci",
                    msg: "El CI ya esta en uso"
                }
                return {
                    statusCode: 400,
                    success: false,
                    data: uniqueErrors,
                };
            }
            if (error instanceof ValidationError) {

                const validationErrors = error.errors.map((err) => {
                    return {
                        key: err.path,
                        msg: err.message
                    }
                });
                return {
                    statusCode: 400,
                    success: false,
                    data: validationErrors
                };
            }
        }
    }
    async findAll(page: number, limit: number) {
        const response = await this.personRepository.findAll(page, limit)
        if (response.rows.length > 0) {
            return {
                statusCode: 200,
                success: true,
                data: response
            }
        }
        return {
            statusCode: 404,
            success: false,
            data: {
                key: "person",
                error: "No existen personas registradas"
            }
        }
    }
    async findById(id: number | string) {
        try {
            const response = await this.personRepository.findById(id)
            if (response)
                return {
                    statusCode: 200,
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe persona con id: " + id
            }
            return {
                statusCode: 404,
                success: false,
                data: error,
            };

        } catch (error) {
            const typeIdError = {
                key: "id",
                msg: "Tipo de llave incorrecto"
            }
            return {
                statusCode: 404,
                success: false,
                data: typeIdError
            };
        }
    }
    async findOneAndUpdate(id: number | string, person: IPerson) {
        try {
            const personUpdated = await this.personRepository.findOneAndUpdate(id, person)

            if (personUpdated[0]) {
                return {
                    statusCode: 200,
                    success: true,
                    data: personUpdated,
                }
            }
            const error = {
                key: "id",
                msg: "No existe persona con id: " + id
            }
            return {
                statusCode: 404,
                success: false,
                data: error,
            };
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const uniqueErrors = {
                    key: "ci",
                    msg: "El ci ya esta en uso"
                }
                return {
                    statusCode: 400,
                    success: false,
                    data: uniqueErrors,
                };
            }
            if (error instanceof ValidationError) {

                const validationErrors = error.errors.map((err) => {
                    return {
                        key: err.path,
                        msg: err.message
                    }
                });
                return {
                    statusCode: 400,
                    success: false,
                    data: validationErrors
                };
            }
        }
    }
}

export default PersonUsesCases