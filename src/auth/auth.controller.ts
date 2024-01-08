import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Request } from 'express';
import { Roles } from './decorators/decorator';

interface RequestWithUser extends Request {
  user: {
    username: string;
    role: string;
  };
}

@ApiTags('Authentication') // Tags for the authentication endpoints
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginAuthDto }) // Describes the request body with a DTO
  @ApiOperation({
    summary: 'Login',
    description:
      'Login with username and password by default username:Admin  passowrd:@dmin123',
  })
  @ApiResponse({ status: 200, description: 'Login successful' }) // Description for the successful response
  @ApiResponse({ status: 401, description: 'Unauthorized' }) // Description for 401 Unauthorized response
  login(@Body() loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    return this.authService.login(username, password);
  }

  @Get('profile')
  @Roles('TaskViewer', 'TaskAssigner')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth() // Indicates this endpoint requires Bearer token authentication
  @ApiResponse({ status: 201, description: 'User profile retrieved' }) // Description for the successful response
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  }) // Indicates that the endpoint requires a header
  profile(@Req() req: RequestWithUser) {
    console.log(req.user.role);
    return req.user;
  }
}
