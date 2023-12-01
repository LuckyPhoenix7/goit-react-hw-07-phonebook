import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const arrThunks = [addContact, deleteContact, fetchContacts];

const func = type => arrThunks.map(el => el[type]);

const onPending = state => {
  state.isLoading = true;
};

const onReject = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const onFulfill = (state, action) => {
  state.isLoading = false;
  state.error = null;
};

const onContacts = (state, action) => {
  state.items = action.payload;
};

const onAddContact = (state, action) => {
  state.items.push(action.payload);
};

const onDeleteContact = (state, action) => {
  state.items = state.items.filter(item => item.id !== action.payload.id);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, onContacts)
      .addCase(addContact.fulfilled, onAddContact)
      .addCase(deleteContact.fulfilled, onDeleteContact)
      .addMatcher(isAnyOf(...func('pending')), onPending)
      .addMatcher(isAnyOf(...func('rejected')), onReject)
      .addMatcher(isAnyOf(...func('fulfilled')), onFulfill);
  },
});

export const contactsReducer = contactsSlice.reducer;
