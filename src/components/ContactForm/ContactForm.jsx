import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledBtn,
  StyledError,
  StyledField,
  StyledForm,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import toast from 'react-hot-toast';

export const ContactForm = () => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Должно быть от 3 букв!')
      .required('Это обязательное поле!'),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        'Телефон не соответствует стандарту. Должен быть XXX-XXX-XXXX'
      )
      .required('Это обязательное поле!'),
  });

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const isContacts = contacts.some(
          ({ name }) => name.toLowerCase() === values.name.toLowerCase()
        );
        if (isContacts) {
          toast.error(`Контакт ${values.name} уже существует!`);
        } else {
          dispatch(addContact({ name: values.name, phone: values.number }));
          actions.resetForm();
          toast.success(`Контакт ${values.name} успешно добавлен(а)!`);
        }
      }}
    >
      <StyledForm>
        <label htmlFor="name">
          Name
          <StyledField name="name" />
          <StyledError component="span" name="name" />
        </label>
        <label htmlFor="number">
          Number
          <StyledField name="number" />
          <StyledError component="span" name="number" />
        </label>
        <StyledBtn type="submit">Add contact</StyledBtn>
      </StyledForm>
    </Formik>
  );
};
