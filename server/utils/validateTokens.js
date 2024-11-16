export async function validateTokens(req, res) {
  // Get Access and Refresh Tokens from cookies
  const { accessToken, refreshToken } = req.cookies;

  // If neither of them, send error ???? OR SEND NEW ONES??? OR SEND UNATHORIZED ?????
  if (!accessToken && !refreshToken) {
    console.log('Missing cookies');
    // return res
    //   .status(400)
    //   .json({ message: 'Missing Access and Refresh Tokens' });
  }

  try {
    // Get userId from any of both tokens
    const userId = await getUserIdFromTokens(accessToken, refreshToken, res);
    if (!userId) throw new Error('Error getting userId from tokens');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
}
