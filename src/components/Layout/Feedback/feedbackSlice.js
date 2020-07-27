import {createSlice} from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        loading: false,
        snackbarDisplayed: false,
        snackbarContent: {
            message: null,
            severity: null
        },
        bannerDisplayed: false,
        bannerContent:
            {
                message: null,
                icon: null,
                button:{
                    label:null,
                    action: null
                }
            }
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSnackbarDisplay: (state, action) => {
            state.snackbarDisplayed = action.payload
        },
        setSnackbarContent: (state, action) => {
            state.snackbarContent = action.payload
        },
        setBannerDisplay: (state, action) => {
            state.bannerDisplayed = action.payload
        },
        setBannerContent: (state, action) => {
            state.bannerContent = action.payload
        }
    }
});

export const {
    setLoading,
    setSnackbarDisplay,
    setSnackbarContent,
    setBannerContent,
    setBannerDisplay
} = feedbackSlice.actions;

export const displayAlert = (message, severity) => {
    return (dispatch) => {
        dispatch(setSnackbarContent({message, severity}));
        dispatch(setSnackbarDisplay(true));
    }
}

export const displayBanner = (args) => {

    return (dispatch) => {
        dispatch(setBannerContent(args))
        ;
        dispatch(setBannerDisplay(true));
    }
}

export default feedbackSlice.reducer;
