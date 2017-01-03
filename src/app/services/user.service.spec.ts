/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('getHostAndPort for http://localhost:4200/ should return localhost:4200', inject([UserService], (service: UserService) => {
    let baseUri = 'http://localhost:4200/';
    expect(service.getHostAndPort(baseUri)).toBe('localhost:4200');
  }));

  it('getHostAndPort for https://localhost:4200/ should return localhost:4200', inject([UserService], (service: UserService) => {
    let baseUri = 'https://localhost:4200/';
    expect(service.getHostAndPort(baseUri)).toBe('localhost:4200');
  }));

  it('getHostAndPort for https://www.somedomain.com:4200/ should return www.somedomain.com:4200', inject([UserService], (service: UserService) => {
    let baseUri = 'https://www.somedomain.com:4200/';
    expect(service.getHostAndPort(baseUri)).toBe('www.somedomain.com:4200');
  }));

  it('getHostAndPort for https://www.somedomain.com/ should return www.somedomain.com', inject([UserService], (service: UserService) => {
    let baseUri = 'https://www.somedomain.com/';
    expect(service.getHostAndPort(baseUri)).toBe('www.somedomain.com');
  }));

  it('getHostAndPort for https://www.somedomain.com/someotherpath/onemore should return www.somedomain.com', inject([UserService], (service: UserService) => {
    let baseUri = 'https://www.somedomain.com/someotherpath/onemore';
    expect(service.getHostAndPort(baseUri)).toBe('www.somedomain.com');
  }));

  it('getHostAndPort for https://www.somedomain.com should return www.somedomain.com', inject([UserService], (service: UserService) => {
    let baseUri = 'https://www.somedomain.com';
    expect(service.getHostAndPort(baseUri)).toBe('www.somedomain.com');
  }));


});
