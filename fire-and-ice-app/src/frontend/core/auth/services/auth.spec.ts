import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BEResponse } from '../../../store/auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call POST /login with correct body', () => {
    const mockResponse = { message: 'Login successful' };

    service.login('user', 'pass').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/login`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'user',
      password: 'pass',
    });

    req.flush(mockResponse);
  });

  it('should call POST /register with correct body', () => {
    const mockResponse: BEResponse = {
      message: 'User created',
    };

    service.register('newUser', 'pass').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/register`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'newUser',
      password: 'pass',
    });

    req.flush(mockResponse);
  });
});
