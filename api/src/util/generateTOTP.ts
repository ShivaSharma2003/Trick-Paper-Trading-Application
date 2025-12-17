import speakeasy from "speakeasy";

const generateTOTP = (): string => {
  const TOTP = speakeasy.totp({
    secret: process.env.SAMRT_API_CLIENT_TOPTP,
    encoding: "base32",
  });

  return TOTP;
};

export default generateTOTP;
