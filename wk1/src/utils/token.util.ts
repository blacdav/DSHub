import {SignJWT, jwtVerify} from "jose"
import { tokenConfig } from "../config/index";
import models from "../models";
import User from "../models/users.model";

const { RefreshToken } = models

const access = new TextEncoder().encode(tokenConfig.access);
const refresh = new TextEncoder().encode(tokenConfig.refresh);
const reset = new TextEncoder().encode(tokenConfig.reset);

export const GenAccessToken = async (user: User): Promise<string> => {
    const access_token = await new SignJWT({ user_id: user.id, role: user.role })
                                .setProtectedHeader({ alg: 'HS256' })
                                .setExpirationTime('24hr')
                                .sign(access);

    return access_token;
}

export const GenRefreshToken = async (user: User): Promise<string> => {
    const refresh_token = await new SignJWT({ user_id: user.id })
                                .setProtectedHeader({ alg: 'HS256' })
                                .setExpirationTime('7d')
                                .sign(refresh);

    await RefreshToken.create({
        token: refresh_token,
        user_id: user.id
    })

    return refresh_token;
}

export const GenResetToken = async (user: User): Promise<string> => {
    const reset_token = await new SignJWT({ user_id: user.id, otp_type: "forgotten_password" })
                                .setProtectedHeader({ alg: 'HS256' })
                                .setExpirationTime('5min')
                                .sign(reset);

    return reset_token;
}

export const VerifyAccessToken = async <T>(token: string): Promise<T> => {
    const { payload } = await jwtVerify<T>(token, access);

    return payload;
}

export const VerifyRefreshToken = async <T>(token: string): Promise<T> => {
    const { payload } = await jwtVerify<T>(token, refresh);

    return payload;
}

export const VerifyResetToken = async <T>(token: string): Promise<T> => {
    const { payload } = await jwtVerify<T>(token, reset);

    return payload;
}