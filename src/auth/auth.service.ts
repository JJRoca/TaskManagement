import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(username: string, password: string) {
    // find user by username to know if the user exists
    const user = await this.userService.findByUsername(username);
    // if user is null, then the username does not exist
    if (!user) {
      return new UnauthorizedException('User not found');
    }
    // compare the password with the password in the database
    const Ispassword = await bcrypt.compare(password, user.password);
    console.log(Ispassword);
    // if Ispassword is false, then the password is incorrect
    if (!Ispassword) {
      return new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    //return user;
    return {
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    };
  }
}
