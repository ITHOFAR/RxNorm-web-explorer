import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import {createPool, closePool} from './pg-pool-exec.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(process.env.PORT || 3000);
