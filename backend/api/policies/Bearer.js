
module.exports = async (req, res, next) => {
  try {
    let auth = req.headers.authorization || `Bearer ${req.query.accesstoken}`;
    if (!auth || auth.search('Bearer') !== 0) {return res.status(401).json({
      success: 0,
      err: 'Yêu cầu authorization header'
    });}
    let token = auth.split(' ')[1];
    let memberInfo = sails.helpers.jwt.verify(token);
    req.memberInfo = memberInfo;
    next();
  } catch (err) {
    return res.status(401).json({
      success: 0,
      err: 'Yêu cầu đăng nhập'
    });
  }
};
