import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DebtStateType, EditType } from "../utils/types";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";
import { URL } from "../utils/back-routes";

const initialState: DebtStateType = {
  allDebts: [],
  debt: null,
  mainData: null
}

const fetchAllDebts = createAsyncThunk("debts/fetchAllDebts", async () => {
  try {
    const data = (await axios.get(URL + "debts")).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});

const fetchDebtById = createAsyncThunk("debs/fetchDebtById", async (id:number) => {
  try {
    const data = (await axios.get(`${URL}debts/${id}`)).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});

const fetchRemoveDebt = createAsyncThunk("debs/fetchRemoveDebt", async (id:number) => {
  try {
    const data = (await axios.delete(`${URL}debts/${id}`)).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});

const fetchTotalData = createAsyncThunk("debts/fetchTotalData", async (currentUser: number | undefined) => {
  try {
    const data = (await axios.get(`${URL}debts/total-amount?actualUser=${currentUser}`)).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});

const fetchPayAll = createAsyncThunk("debts/fetchPayAll", async (id: number) => {
  try {
    await axios.get(`${URL}debts/pay-all/${id}`);
  } catch (error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
})

const fetchUpdateData = createAsyncThunk("debs/fetchUpdateDebt", async ({id, info}:{id?:number, info: EditType}) => {
  try {
    const data = (await axios.put(`${URL}debts/${id}`, info )).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});

const fetchCreateDebt = createAsyncThunk("debts/fetchCreateDebt", async (info: EditType) => {
  try {
    console.log("before axios", info)
    const data = (await axios.post(`${URL}debts/create`, info)).data;
    console.log("after fetch", data);
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});

const fetchSearchDebt = createAsyncThunk("debts/fetchSearchDebt", async (description: string) => {
  try {
    const data = (await axios.get(`${URL}search?search=${description}`)).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});


const debtsSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    cleanDebt: (state) => {
      state.debt = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDebts.pending, () => {
      })
      .addCase(fetchAllDebts.fulfilled, (state,action) => {
        state.allDebts = action.payload;
      })
      .addCase(fetchDebtById.fulfilled, (state,action) => {
        state.debt = action.payload;
      })
      .addCase(fetchCreateDebt.fulfilled, (_, action) => {
        console.log("fullfilled",action.payload);
      })
      .addCase(fetchCreateDebt.rejected, (_, action) => {
        console.log("rejected",action.error.message);
      })
      .addCase(fetchSearchDebt.fulfilled, (state, action) => {
        state.allDebts = action.payload;
      })
      .addCase(fetchTotalData.fulfilled, (state, action) => {
        state.mainData = action.payload;
      })
  }
})

export {fetchSearchDebt, fetchPayAll, fetchAllDebts, fetchTotalData, fetchRemoveDebt, fetchUpdateData, fetchDebtById, fetchCreateDebt};
export const {cleanDebt} = debtsSlice.actions
export default debtsSlice.reducer;
export const selectAllDebts = (state: RootState) => state.debts.allDebts;
export const selectDebt = (state: RootState) => state.debts.debt;
export const selectMainData = (state: RootState) => state.debts.mainData;
