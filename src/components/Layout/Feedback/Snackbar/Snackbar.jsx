import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import MaterialSnackbar from "@material-ui/core/Snackbar";

import {setSnackbarDisplay} from "../feedbackSlice";
import Alert from "@material-ui/lab/Alert"

const AUTOHIDE_DURATION = 4000

export default function Snackbar() {
    const dispatch = useDispatch();

    const {snackbarDisplayed, snackbarContent} = useSelector(
        state => state.feedback
    );

    const handleClose = () => {
        dispatch(setSnackbarDisplay(false));
    }

    return (
        <MaterialSnackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={snackbarDisplayed}
            autoHideDuration={AUTOHIDE_DURATION}
            onClose={handleClose}
            aria-describedby="client-snackbar"
        >

            <Alert onClose={handleClose}
                   severity={snackbarContent.severity}>
                {snackbarContent.message}
            </Alert>
        </MaterialSnackbar>
    );
}
