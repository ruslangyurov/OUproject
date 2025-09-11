import jwt from 'jsonwebtoken';




jwt.verify(
  refreshToken,
  process.env.REFRESH_TOKEN_SECRET,
  async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" })

    const foundUser = await User.findOne({ username: decoded.username }).exec()
    if (!foundUser) return res.status(401).json({ message: 'Unauthorized - user not found' })

    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username, role: foundUser.role, user_id: foundUser.user_id } },
      process.env.TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    res.json({ accessToken })
  }
)

export {verify}
