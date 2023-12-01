import { StyledList, ListItem, DeleteBtn } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import { Loader } from 'components/Loader/Loader';
import toast from 'react-hot-toast';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (error) {
      toast.error(`Упс! Ошибка при загрузке контактов: ${error}`);
    }
  }, [error]);

  const filtered = useSelector(selectVisibleContacts);

  return (
    <>
      {isLoading && <Loader />}

      <StyledList>
        {filtered.map(({ id, name, phone }) => {
          const onDelete = () => {
            dispatch(deleteContact(id))
              .unwrap()
              .then(() => {
                toast.success('Contact deleted successfully');
              })
              .catch(() => {
                toast.error('Failed to delete contact');
              });
          };

          return (
            <ListItem key={id}>
              <p>
                {name}: {phone}
              </p>
              <DeleteBtn type="button" onClick={onDelete}>
                Delete
              </DeleteBtn>
            </ListItem>
          );
        })}
      </StyledList>
    </>
  );
};
