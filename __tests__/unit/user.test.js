import bcrypt from 'bcryptjs';
import User from '../../src/models/User';
import database from '../../src/database/index';

/*eslint-disable */
describe('User unit', () => {
    beforeEach(async () => {
        await database.init();
    });

    it('should encrypt user password', async () => {
        const user = await User.create({
        name: 'TestUser',
        email: 'mail@mail.com',
        password: '123',
    });

        const compareHash = await bcrypt.compare('123', user.password_hash);

        expect(compareHash).toBe(true);
    });
});