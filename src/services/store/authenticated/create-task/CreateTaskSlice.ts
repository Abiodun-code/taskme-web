import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  where,
  query,
} from 'firebase/firestore';
import { Task } from '../../../../types';
import { db } from '../../../firebase';
import { RootState } from '../../Store';

// Fetch tasks for the current user
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.updateUser.user?.uid;

      if (!userId) {
        console.error('fetchTasks error: User not authenticated');
        return rejectWithValue('User not authenticated');
      }

      console.log('Fetching tasks for user:', userId);

      const q = query(collection(db, 'tasks'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const tasks: Task[] = [];
      querySnapshot.forEach((docSnap) => {
        tasks.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Task, 'id'>),
        });
      });

      return tasks;
    } catch (error) {
      console.error('fetchTasks failed:', error);
      return rejectWithValue((error as Error).message || 'Failed to fetch tasks');
    }
  }
);

// Add new task for the current user
export const addTask = createAsyncThunk<
  Task,
  Omit<Task, 'id' | 'userId'>,
  { rejectValue: string; state: RootState }
>(
  'tasks/addTask',
  async (newTaskData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.updateUser.user?.uid;

      if (!userId) {
        console.error('addTask error: User not authenticated');
        return rejectWithValue('User not authenticated');
      }

      const taskToSave = {
        ...newTaskData,
        userId,
      };

      const docRef = await addDoc(collection(db, 'tasks'), taskToSave);

      return {
        id: docRef.id,
        ...taskToSave,
      };
    } catch (error) {
      console.error('addTask failed:', error);
      return rejectWithValue((error as Error).message || 'Failed to add task');
    }
  }
);

// Update task status
export const updateTaskStatus = createAsyncThunk<
  { id: string; status: Task['status'] },
  { id: string; status: Task['status'] },
  { rejectValue: string }
>(
  'tasks/updateTaskStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      if (!id) {
        console.error('updateTaskStatus error: Missing task ID');
        return rejectWithValue('Missing task ID');
      }

      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, { status });

      return { id, status };
    } catch (error) {
      console.error('updateTaskStatus failed:', error);
      return rejectWithValue((error as Error).message || 'Failed to update task status');
    }
  }
);

// State definition
interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

// Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const task = state.tasks.find((task) => task.id === id);
        if (task) {
          task.status = status;
        }
      });
  },
});

export const updateTaskReducer = taskSlice.reducer;
