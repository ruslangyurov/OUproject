var assert = require('chai').assert;
import * as yardController from '../controller/yardController.js';
import supertest from 'supertest';
import express from 'express';
import * as route from '../routes/yardRoute.js';

const app = express();

describe("Express app", ()=> {
    

    it("should return all bays", async () => {
        request(app)
        .get('/yard')
        .expect(response.status).to.equal(200);
    });
});



