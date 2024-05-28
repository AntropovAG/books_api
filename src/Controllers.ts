import { Router, Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

interface IMiddleware {
    handle: (req: Request, res: Response, next: NextFunction) => void;
}

interface ControllerRoute {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    fn: (req: Request, res: Response, next: NextFunction) => void;
    middleware: IMiddleware[];
}

@injectable()
export class Controller {
    private _router: Router;

    constructor() {
        this._router = Router();
    }

    protected bindRoutes(routes: ControllerRoute[]) {
        routes.forEach((route) => {
            const ctxHandler = route.fn.bind(this);
            const routeHandlers = route.middleware ? [...route.middleware.map((m) => m.handle), ctxHandler] : [ctxHandler];

            this._router[route.method ?? 'get'](route.path, routeHandlers);
        })
    }
    get router() {
        return this._router;
    }
}
