import * as userService from "../service/userService.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const signUp = asyncHandler(userService.signUp);