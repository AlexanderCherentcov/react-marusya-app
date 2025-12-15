export interface AsyncStateProps {
  loading: boolean;
  error: string | null;
  spinnerWrapperClassName?: string;
  errorClassName?: string;
  spinnerSize?: 'sm' | 'lg';
}
