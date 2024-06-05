import bcrypt from 'bcrypt'

class EncryptionService {
    async hashPassword(password: string) {
        const salts = 10
        const hashedPassword = await bcrypt.hash(password, salts)
        return hashedPassword
    }

    async verifyPassword(password: string, hashedPassword: string) {
        const verify = await bcrypt.compare(password, hashedPassword)
        return verify
    }
}

export default EncryptionService