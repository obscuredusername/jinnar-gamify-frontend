import { useDispatch, useSelector } from 'react-redux';

// Export typed hooks for better DX
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
