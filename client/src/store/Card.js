import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  seconds: 3*60,
  cards: [],
  matched: [],
  modal: "",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    resetCard() {
      return initialState;
    },    
    getcard(state, action) {
      state.cards=action.payload
    },
   setMatched(state, action) {
     state.matched=[...state.matched,...action.payload];
   },
   winGame(state) {
      state.modal="win";
      state.matched=[...state.cards.keys()];
   },
   CountDown(state,action) {
    let timer=action.payload;
    if (state.modal) {
      clearInterval(timer)
    }
     if (state.seconds==1) {
      state.modal="lose";
      state.matched=[...state.cards.keys()];
      clearInterval(timer)
    }
    if (state.seconds>0) state.seconds=state.seconds-1;
   },
  
  },
});

export const { getcard,winGame,CountDown,setMatched,resetCard} = cardSlice.actions;
export default cardSlice.reducer;
