// Action Types
export const ACTIONS = {
    FETCH_TIMES_START: "FETCH_TIMES_START",
    FETCH_TIMES_SUCCESS: "FETCH_TIMES_SUCCESS",
    FETCH_TIMES_ERROR: "FETCH_TIMES_ERROR",
    SUBMIT_START: "SUBMIT_START",
    SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
    SUBMIT_ERROR: "SUBMIT_ERROR",
    UPDATE_TIME_SLOT: "UPDATE_TIME_SLOT",
    UPDATE_RESERVED_SLOTS: "UPDATE_RESERVED_SLOTS",
    RESET: "RESET",
  };
  
  // Initial state
export const initialState = {
    availableTimes: [],
    isLoading: false,
    isSubmitting: false,
    submitSuccess: false,
    error: null,
    lastSubmittedData: null,
    reservedSlots: {}, // Format: { "YYYY-MM-DD": ["17:00", "18:00"] }
  };
  
  // Reducer function
export function reservationReducer(state, action) {
    switch (action.type) {
      case ACTIONS.FETCH_TIMES_START:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case ACTIONS.FETCH_TIMES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          availableTimes: action.payload,
        };
      case ACTIONS.FETCH_TIMES_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case ACTIONS.SUBMIT_START:
        return {
          ...state,
          isSubmitting: true,
          error: null,
        };
      case ACTIONS.SUBMIT_SUCCESS:
        return {
          ...state,
          isSubmitting: false,
          submitSuccess: true,
          lastSubmittedData: action.payload,
        };
      case ACTIONS.SUBMIT_ERROR:
        return {
          ...state,
          isSubmitting: false,
          error: action.payload,
        };
      case ACTIONS.UPDATE_TIME_SLOT:
        const { date, time } = action.payload;
        return {
          ...state,
          reservedSlots: {
            ...state.reservedSlots,
            [date]: [...(state.reservedSlots[date] || []), time],
          },
          availableTimes: state.availableTimes.filter((t) => t !== time),
        };
      case ACTIONS.UPDATE_RESERVED_SLOTS:
        return {
          ...state,
          reservedSlots: action.payload,
        };
      case ACTIONS.RESET:
        return {
          ...initialState,
          reservedSlots: state.reservedSlots, // Preserve reserved slots when resetting
        };
      default:
        return state;
    }
  }