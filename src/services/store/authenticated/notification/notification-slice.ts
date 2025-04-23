// notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define what a notification looks like
interface Notification {
  message: string;
  type: 'success' | 'error' | 'info'; // customize as needed
  timestamp: string;
  id: number; // Unique ID for each notification
}

// Define the state type
interface NotificationsState {
  list: Notification[];
}

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.push(action.payload);
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export const notificationReducer = notificationsSlice.reducer;
