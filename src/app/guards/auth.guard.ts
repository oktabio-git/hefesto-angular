import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/*
Hola Cota, si ves esto, los Guards se utilizan comunmente para verificar que el usuario este autenticado.
Esto se comprueba a través del token, el cuál se obtiene como respuesta de una petición.
También se utilizan para revisar el rol del usuario y ver si tiene permitido acceder a la ruta.
Además revisa que el token no haya expirado.
*/
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
