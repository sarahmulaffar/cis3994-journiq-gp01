import { supabase } from '../config/supabaseClient.js';


export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully logged out.',
      data: null
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error during logout.',
      data: null
    });
  }
};


export const getSessionUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'User session is active.',
    data: {
      user: req.user
    }
  });
};