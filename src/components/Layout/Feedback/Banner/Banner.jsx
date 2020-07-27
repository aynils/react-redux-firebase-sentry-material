import React from "react"
import {useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {
    Paper, Card, Grid, Typography, Button, Divider, ButtonBase,
    CardContent, Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.white,
        borderRadius: 4,
        alignSelf: 'center',
    },
    root: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: "inherit",
    },
    cardContent: {
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        justifyContent: "center",
    },
    flex: {
        flexGrow: 1,
    },
    button: {

        alignSelf: 'center',
    },
    buttonContainer: {
        display: "flex",
        alignContent: "center",
        justifyContent: "flex-end",
        alignSelf: 'center',
        [theme.breakpoints.down("xs")]: {
            justifyContent: "center",

        }
    },
    label: {
        alignSelf: 'center',
    },
    container: {
        display: 'flex',
        alignContent: "center",

    }
}));

export default function Banner() {
    const classes = useStyles()
    const {bannerDisplayed, bannerContent} = useSelector(
        state => state.feedback
    );


    const button =
        !!bannerContent.button && (
            <Button
                variant="text"
                onClick={bannerContent.button.action}
                component={ButtonBase}
                className={classes.button}
            >
                {bannerContent.button.label}
            </Button>
        )


    return (
        bannerDisplayed &&
        <Paper elevation={0} className={classes.root}>
            <Card elevation={0}>
                <CardContent
                    className={classes.cardContent}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="flex-start"
                        className={classes.container}
                    >
                        {bannerContent.icon && (
                            <Grid item xs={2} sm={1} className={classes.icon}>
                                <Avatar
                                    className={classes.icon}

                                >
                                    {bannerContent.icon}
                                </Avatar>
                            </Grid>
                        )}
                        <Grid item xs={10} sm={8} xl={9} className={classes.label}>
                            <Typography component="h5" variant="subtitle1">
                                {bannerContent.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} xl={2} className={classes.buttonContainer}>
                            {button}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Divider/>
        </Paper>


    )
}


