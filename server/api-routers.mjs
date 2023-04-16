import express from "express";
import {router as searchRouter} from "./search/search-router.mjs";
import {router as resultRouter} from "./result/result-router.mjs";

export default express.Router()
   .use('/search', searchRouter)
   .use('/result', resultRouter);