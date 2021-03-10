import React from 'react';

export interface IProps {
  isHome: boolean;
  body?: string | React.Component;
  right?: string | React.Component;
}
