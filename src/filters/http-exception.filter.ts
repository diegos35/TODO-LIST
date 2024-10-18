import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Get the response from the exception
    const exceptionResponse = exception.getResponse();

    // Define a variable to hold the message
    let message: string;

    // Check if the response is an object with a 'message' property
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      // Type assertion to specify that it has a 'message' property
      message = (exceptionResponse as { message: string }).message;
    } else {
      // Retunrn to a generic message if not
      message = 'An error occurred';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
