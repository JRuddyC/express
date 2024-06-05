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
            return {
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
                    success: false,
                    data: validationErrors
                };
            }
        }
    }
    async findAll() {
        const response = await this.personRepository.findAll()
        if (response.length >0) {
            return {
                success: true,
                data: response
            }
        }
        return {
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
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe persona con id: " + id
            }
            return {
                success: false,
                data: error,
            };

        } catch (error) {
            const typeIdError = {
                key: "id",
                msg: "Tipo de llave incorrecto"
            }
            return {
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
                    success: true,
                    data: personUpdated,
                }
            }
            const error = {
                key: "id",
                msg: "No existe persona con id: " + id
            }
            return {
                success: false,
                data: error,
            };
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const uniqueErrors = {
                    key: "ci",
                    msg: "El CI ya esta en uso"
                }
                return {
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
                    success: false,
                    data: validationErrors
                };
            }
        }
    }
}

export default PersonUsesCases