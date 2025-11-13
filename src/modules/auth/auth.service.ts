import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/User';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private users: Model<User>,
    ) { }

    public async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.users.findOne({ email });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        const { password: _, ...result } = user.toObject();
        return result as unknown as User;
    }
}
