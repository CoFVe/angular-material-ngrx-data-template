export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
}
