export const Otp = (otp_type: string): { code: number; otp_type: string } => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    return { code: Number(otp), otp_type };
}