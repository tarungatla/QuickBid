export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    res.status(statusCode).cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // uncomment in production
        // secure: true,  // only sent over HTTPS
        // sameSite: "None" // frontend backend on different domains or subdomains
    }).json({
        success: true,
        user,
        token,
        message,
    })
}