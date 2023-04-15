import express from "express";
import {router as searchRouter} from "./search/search-router";
import {router as resultRouter} from "./result/result-router";

export default express.Router()
   .use('/search', searchRouter)
   .use('/result', resultRouter);