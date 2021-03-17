import React from 'react';

export interface IProps {
  isHome: boolean;
  body?: string | (() => JSX.Element);
  right?: string | (() => JSX.Element);
}
