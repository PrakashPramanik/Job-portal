 
  import jwt from 'jsonwebtoken';

  export const authenticateUser = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    try {
      const decoded = jwt.verify(token, 'secret_key'); 
      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };





  
