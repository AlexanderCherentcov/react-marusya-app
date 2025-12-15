import { useSearchParams } from 'react-router-dom';

export function useModal(paramName: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get(paramName) === '1';

  const open = () => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, '1');
    setSearchParams(params);
  };

  const close = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(paramName);
    setSearchParams(params);
  };

  return { isOpen, open, close };
}
