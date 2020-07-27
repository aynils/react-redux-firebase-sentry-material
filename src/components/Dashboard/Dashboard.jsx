import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from "@material-ui/core/Avatar"

import {useSelector} from "react-redux"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    number: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.white,
        alignSelf: 'center',
    },
    root: {
        margin: "auto",
        width: "99%"
    }
}))


export default function Dashboard() {

    const classes = useStyles()

    const nickname = useSelector((state) => state.user.profile?.nickname);

    return (
                <Grid container spacing={2} className={classes.root}>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography component="p" variant="subtitle1" color="secondary">
                                    This is a card
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography component="h2" variant="h2">
                                    Hi {nickname}!
                                </Typography>
                                <br/>
                                <Typography component="p" variant="body1">
                                    We're glad to see you here!
                                    <br/> <br/>
                                    Start building your own app.
                                </Typography>
                                <br/>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardHeader
                                avatar={<Avatar className={classes.number}>
                                    1
                                </Avatar>}
                                title="Upload"
                                titleTypographyProps={{variant: "h3"}}
                            />


                            <CardContent>
                                <Typography component="p" variant="body1">
                                    Do one thing
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardHeader
                                avatar={<Avatar className={classes.number}>
                                    2
                                </Avatar>}
                                title="Read the result"
                                titleTypographyProps={{variant: "h3"}}

                            />
                            <CardContent>
                                <Typography component="p" variant="body1">
                                    Do another one
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

    );
}




