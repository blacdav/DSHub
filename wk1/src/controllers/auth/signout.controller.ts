import { RequestHandler } from "express";
import models from "../../models";

const { RefreshToken } = models;

export const SignOut: RequestHandler = async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token || req.body.refresh_token;

  try {
    if (refresh_token) {
      await RefreshToken.destroy({ where: { token: refresh_token }})
    }

    // do a token expire, for mobile app
    if (req.headers["x-client-type"] === "web") {
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged out"
    });
  } catch (err) {
    return next(err);
  }
};