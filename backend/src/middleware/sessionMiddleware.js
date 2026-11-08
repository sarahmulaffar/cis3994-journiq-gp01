import { supabase } from '../config/supabaseClient.js';

export const verifySession = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.',
        data: null
      });
    }

    const token = authHeader.split(' ')[1];

   
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token.',
        data: null
      });
    }

   
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error during session verification.',
      data: null
    });
  }
};