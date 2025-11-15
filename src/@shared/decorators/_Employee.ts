import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const _Employee = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.employee.employee;
    },
);
