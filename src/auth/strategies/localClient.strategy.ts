// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class LocalStrategyClient extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({ usernameField: 'email' });
//   }

//   validate(email: string, password: string) {
//     return this.authService.validateCliente(email, password);
//   }
// }
