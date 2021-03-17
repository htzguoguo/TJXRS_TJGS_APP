/*
 * Reducer actions related with navigation
 */
import {navigationService} from 'app/navigation/NavigationService';

export function navigateToHome(params: any) {
  navigationService.navigate('Home', params);
}

export function navigateToForgotPassword(params?: any) {
  navigationService.navigate('ForgotPassword', params);
}
