import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

    @injectable()
    export class DBService {
        private _client: PrismaClient
    
        constructor() {
            this._client = new PrismaClient();
        }
    
        get client() {
            return this._client;
        }
    }