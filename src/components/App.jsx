import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Layout, FirstTitle, SecondTitle } from './Layout';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <Layout>
      <FirstTitle>Phonebook</FirstTitle>
      <ContactForm />
      <SecondTitle>Contacts</SecondTitle>
      <Filter />
      <ContactList />
      <Toaster position="top-right" />
    </Layout>
  );
};
