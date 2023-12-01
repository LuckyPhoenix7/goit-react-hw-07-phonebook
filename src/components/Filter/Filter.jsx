import { StyledInput, StyledLabel } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filter);

  return (
    <StyledLabel htmlFor="filter">
      Find contact by Name
      <StyledInput
        value={filter}
        onChange={evt => dispatch(setFilter(evt.target.value))}
      />
    </StyledLabel>
  );
};
