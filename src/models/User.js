const { Model } = require('sequelize');
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                passwordHash: Sequelize.STRING,
                naversId: Sequelize.INTEGER,
                projectsId: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.passwordHash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    async checkPassword(password) {
        return brcrypt.compare(password, this.passwordHash);
    }

}

export default User;