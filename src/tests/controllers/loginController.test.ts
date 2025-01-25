import { login } from "@/http/controllers/userController";
import { LoginError } from "@/use-cases/errors/login-error";
import { LoginUseCase } from "@/use-cases/User";
import { Request, Response } from "express";

describe('login function', () => {
  it('should return 400 if email or password is missing', async () => {
    const req = {
      body: {
        email: 'email@example.com',
        password: '',
      },
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn((data) => data),
    } as unknown as Response;
  
    await login(req, res);
  
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ message: '"password" is not allowed to be empty' });
  });

  it('should return 401 if email or password is invalid', async () => {
    const req = {
      body: {
        email: 'email@example.com',
        password: 'senha123456',
      },
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn((data) => data),
    } as unknown as Response;
  
    jest.spyOn(LoginUseCase.prototype, 'handle').mockRejectedValueOnce(new LoginError());
  
    await login(req, res);
  
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ message: 'User does not exists' });
  });

  it('should return token if email and password are correct', async () => {
    const req = {
      body: {
        email: 'email@example.com',
        password: 'senha123456',
      },
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn((data) => data),
    } as unknown as Response;
  
    jest.spyOn(LoginUseCase.prototype, 'handle').mockResolvedValueOnce({ accessToken: 'token' });
  
    const result = await login(req, res);
  
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ accessToken: 'token' });
  });

  it('should throw error if loginUseCase throws error', async () => {
    jest.spyOn(LoginUseCase.prototype, 'handle').mockRejectedValueOnce(new Error('Erro ao logar'));
  
    const req = {
      body: {
        email: 'email@example.com',
        password: 'senha123123',
      },
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn((data) => data),
    } as unknown as Response;
  
    await expect(login(req, res)).rejects.toThrowError('Erro ao logar');
  });
});