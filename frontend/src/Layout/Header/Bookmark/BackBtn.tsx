import { Btn, LI } from '../../../AbstractElements';
import { Back } from '../../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './ReducerTypes';

const BackBtns = () => {
  const { bookMarkClass } = useSelector(
    (state: RootState) => state.BookMarkReducer
  );
  const dispatch = useDispatch()

  const backtobookmark = () => {
    dispatch({ type: "setBookMarkClass", payload: !bookMarkClass });

  };
  return (
    <LI>
      <Btn color='white' className='d-block flip-back font-primary p-0' onClick={backtobookmark} >{Back}</Btn>
    </LI>
  );
};
export default BackBtns;