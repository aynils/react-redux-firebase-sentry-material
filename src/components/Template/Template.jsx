import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

// UI components are imported through the material-ui library
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {asyncFunction, incrementValue} from './templateSlice';
import {useTranslation} from 'react-i18next';

// CSS is managed by updating the default materia theme
// see https://material-ui.com/
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Template() {
    // useSelector hook allows getting a variable from the state,
    // following the path defined in /src/app / store.js
    const someParameter = useSelector((state) => state.template.someParameter);
    const value = useSelector((state) => state.template.value);

    // useDispatch hook allows dispatching a function from the slice.
    // The function must be explicitely imported to be used.
    const dispatch = useDispatch();

    // useState hook creates a local state containing a variable (newParameter)
    // and a function to update this variable(setNewParameter)
    // initial value set to ""
    const [newParameter, setNewParameter] = useState('');

    // useStyles hook allows to use the style as CS classes
    const classes = useStyles();

    // useTranslation hooks finds the translation in /public/locals/{lang}/{fileName}.json
    // {fileName} is the first argument passed to useTranslation. !Do not repeat the .json extension!
    const {t} = useTranslation('template', {useSuspense: false});


    // This function is run when clicking on the form button
    const handleSubmit = (event) => {
        // preventDefault prevents the default behaviour of the submit button which reloads the page
        event.preventDefault();
        dispatch(asyncFunction(newParameter));
    };

    // This functions handles the onClick event from the increment button
    const handleIncrement = (event) => {
        // preventDefault prevents the default behaviour of the submit button which reloads the page
        event.preventDefault();
        dispatch(incrementValue());
    };

    // This function updates the state when the field is modified
    const handleChange = (event) => {
        event.preventDefault();
        const {target} = event;
        // setNewParameter overrides the previous value.
        setNewParameter(target.value);
    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    <p>
                        {/*
                        using t('key') references the key in the file selected by useTranslation
                        use the dot notation to access nested translations.
                        */}
                        {t('parameter_is')}:
                    <br/>
                    {someParameter}
                </p>
                <p>
                    {t('value_is')} :
                    {' '}
                    {value}
                </p>
            </Typography>
            <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit}
                onChange={handleChange}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="someParameter"
                            label="Some Parameter"
                            name="someParameter"
                            autoFocus={false}
                            value={newParameter}
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                     {t('update_async')}
                </Button>
                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleIncrement}
                >
                     {t('increment_value')}
                </Button>
            </form>
        </div>
</Container>
);
}
