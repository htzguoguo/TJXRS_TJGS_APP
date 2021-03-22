/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
 
 import * as types from './types';
 
 import { IThemeState, IThemeToggleAction } from './model';
import createReducer from '../../lib/createReducer';
 
 const initialState: IThemeState = {
   isDark: true,
 };
 
 export const themeReducer = createReducer(initialState, {
   [types.TOGGLE_THEME](state: IThemeState, action: IThemeToggleAction) {
     return { ...state, isDark: action.isDark };
   },
 });
 