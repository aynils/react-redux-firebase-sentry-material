import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from "@material-ui/core/Avatar"

import {useSelector} from "react-redux"
import {makeStyles} from "@material-ui/core/styles"
import {useTranslation} from 'react-i18next';

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
    const {t} = useTranslation('dashboard', {useSuspense: false});

    const nickname = useSelector((state) => state.user.profile?.nickname);

    return (
        <Grid container spacing={2} className={classes.root}>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="subtitle1" color="secondary">
                            {t("text_1")}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="h2" variant="h2">
                            {t("hi")} {nickname}!
                        </Typography>
                        <br/>
                        <Typography component="p" variant="body1">
                            {t("text_2")}
                            <br/> <br/>
                            {t("text_3")}
                        </Typography>
                        <br/>

                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={<Avatar className={classes.number}>
                            1
                        </Avatar>}
                        title={t("steps.1.title")}
                        titleTypographyProps={{variant: "h3"}}
                    />


                    <CardContent>
                        <Typography component="p" variant="body1">
                            {t("steps.1.description")}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={<Avatar className={classes.number}>
                            2
                        </Avatar>}
                        title={t("steps.2.title")}
                        titleTypographyProps={{variant: "h3"}}

                    />
                    <CardContent>
                        <Typography component="p" variant="body1">
                            {t("steps.2.description")}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>

    );
}




