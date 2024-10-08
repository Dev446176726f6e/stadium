import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const CookieGetter = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();

    const refresh_token = request.cookies[data];

    if (!refresh_token) {
      throw new UnauthorizedException("Token not found");
    }
    return refresh_token;
  },
);
