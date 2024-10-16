import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';

import createHttpError from 'http-errors';

import { THIRTY_DAYS } from '../constants/index.js';

// Функція для налаштування сесії
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    console.error('Registration error:', error); // Логування помилки
    next(createHttpError(409, error.message)); // Якщо користувач вже існує
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const { session, user } = await loginUser(req.body);
    console.log('session', session);

    setupSession(res, session);

    console.log('session.user', session.user);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
        user,
      },
    });
  } catch (error) {
    next(createHttpError(401, error.message)); // Обробка помилки входу
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    if (req.cookies.sessionId) {
      await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, 'Logout failed')); // Обробка помилки виходу
  }
};

export const refreshUserSessionController = async (req, res, next) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(createHttpError(401, 'Session refresh failed')); // Обробка помилки для оновлення сесії
  }
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password has been successfully changed!',
    data: {},
  });
};
