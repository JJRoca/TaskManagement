import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      Welcome to the Task Management API!<br/><br/>
      This API allows you to manage tasks and users.<br/>
      - To view available endpoints and interact with the API, go to <a href="https://test-management-jewy.onrender.com/api">https://test-management-jewy.onrender.com/api</a>.<br/>
      - For any assistance or questions, please reach out to our support team.<br/><br/>
      Thank you for using our Task Management API!`;
  }
}
