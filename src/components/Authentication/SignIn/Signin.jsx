import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux';
import {useFirebase} from 'react-redux-firebase';
import {
    authFail, authStart, authSuccess, setHasAccount,
} from '../authenticationSlice';
import {FirebaseAuthScreen} from '../../Firebase/FirebaseAuthScreen';


const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: {
        textAlign: 'center',
        color: theme.palette.error.main,
        textTransform: 'title',
    },
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function Signin() {
    const [fields, setFields] = useState({
        email: {
            variant: 'outlined',
            margin: 'normal',
            required: true,
            fullWidth: true,
            id: 'email',
            label: 'Email Address',
            name: 'email',
            autoComplete: 'email',
            autoFocus: true,
            value: '',
        },
        password: {
            variant: 'outlined',
            margin: 'normal',
            required: true,
            fullWidth: true,
            name: 'password',
            label: 'Password',
            type: 'password',
            id: 'password',
            autoComplete: 'current-password',
            value: '',
        },
        nickname: {
            autoComplete: 'nickname',
            name: 'nickname',
            variant: 'outlined',
            required: true,
            fullWidth: true,
            id: 'nickname',
            label: 'Name or Nickname',
            autoFocus: true,
            value: ''
        }
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const hasAccount = useSelector((state) => state.authentication.hasAccount);
    const loading = useSelector((state) => state.authentication.loading);
    const error = useSelector((state) => state.authentication.error);
    const firebase = useFirebase();

    const signupEmail = (email, password, nickname) => {
        dispatch(authStart());
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (response) => {
                const {user} = response;
                user.updateProfile({
                    displayName: nickname,
                });

                dispatch(authSuccess());
            })
            .catch((error) => {
                dispatch(authFail({message: error.message}));
            });
    };

    const signinEmail = (email, password) => {
        dispatch(authStart());
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(authSuccess());
            })
            .catch((error) => {
                dispatch(authFail({message: error.message}));
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (hasAccount) {
            signinEmail(fields.email.value, fields.password.value);
        } else {
            signupEmail(
                fields.email.value,
                fields.password.value,
                fields.nickname.value,
            );
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const {target} = event;
        const {id, value} = target;
        setFields({
            ...fields,
            [id]: {
                ...fields[id],
                value,
            },
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {hasAccount ? 'Sign In' : 'Sign Up'}
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                >
                    <Grid container spacing={2}>
                        {!hasAccount && (
                            <Grid item xs={12}>
                                <TextField {...fields.nickname} />
                            </Grid>

                        )}
                        <Grid item xs={12}>
                            <TextField {...fields.email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...fields.password} />
                        </Grid>
                    </Grid>
                    {error && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.errorMessage}>
                                {error}
                            </Grid>
                        </Grid>
                    )}
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            {hasAccount ? 'Sign In' : 'Sign Up'}
                        </Button>
                        {loading && (
                            <CircularProgress size={24} className={classes.buttonProgress}/>
                        )}
                    </div>
                    <Grid container>
                        <Grid item xs>
                            {hasAccount && (
                                <Link href="# " variant="body2">
                                    Forgot password?
                                </Link>
                            )}
                        </Grid>

                        <Grid item>
                            <Link
                                href="# "
                                onClick={() => dispatch(setHasAccount(!hasAccount))}
                                variant="body2"
                            >
                                {hasAccount
                                    ? 'Don\'t have an account? Sign Up'
                                    : 'Already have an account? Sign in'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <FirebaseAuthScreen/>
        </Container>
    );
}
