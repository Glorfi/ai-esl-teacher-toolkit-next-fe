import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISortingOption {
  sortby:
    | 'Update'
    | 'Popularity'
    | 'Newest to oldest'
    | 'Oldest to newest'
    | 'A-Z'
    | 'Z-A';
}

const initialState: ISortingOption = {
  sortby: 'Update',
};

const sortByAction = (
  state: ISortingOption,
  action: PayloadAction<
    | 'Update'
    | 'Popularity'
    | 'Newest to oldest'
    | 'Oldest to newest'
    | 'A-Z'
    | 'Z-A'
  >
) => {
  return { sortby: action.payload };
};

export const sortingOptionsRouter = createSlice({
  name: 'sortingOption',
  initialState,
  reducers: {
    sortBy: sortByAction,
  },
});

export const { sortBy } = sortingOptionsRouter.actions;
