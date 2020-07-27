import React, {useEffect} from 'react'
import MinimalLayout from './Minimal/MinimalLayout'
import MainLayout from './Main/MainLayout'
import Snackbar from './Feedback/Snackbar/Snackbar'
import {useDispatch, useSelector} from "react-redux"
import {displayBanner, setBannerDisplay} from "./Feedback/feedbackSlice"
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined"
import store from "../../app/store"
import {getUserProfile, sendVerificationEmail, updateIsEmailVerified, updateUserNickname} from "../User/userSlice"
import {useFirebase} from "react-redux-firebase"

const Layout = (props) => {

    const dispatch = useDispatch()
    const {verificationEmailSent, profile} = useSelector(state => state.user)

    const firebase = useFirebase()

    useEffect(() => {
        if (verificationEmailSent || profile.isEmailVerified) {
            dispatch(setBannerDisplay(false))
        } else if (!profile.isEmailVerified) {
            dispatch(displayBanner(
                {
                    message: 'Verify your email address and start your free trial.',
                    icon: <MailOutlineOutlinedIcon/>,
                    button: {
                        label: 'Send verification email',
                        action: () => {
                            store.dispatch(sendVerificationEmail(firebase))
                        }
                    }
                }
            ))
        }
    }, [verificationEmailSent, dispatch, firebase, profile])


    useEffect(() => {
        dispatch(getUserProfile(firebase))
    }, [dispatch, firebase])

    useEffect(() => {
        dispatch(updateIsEmailVerified(firebase))
    }, [dispatch, firebase])

    useEffect(() => {
        dispatch(updateUserNickname(firebase))
    }, [dispatch, firebase])


    const layout = props.minimal ?
        (<MinimalLayout {...props}> {props.children}</MinimalLayout>)
        :
        (<MainLayout {...props}>{props.children}</MainLayout>)

    return (
        <>
            {layout}
            <Snackbar/>
        </>
    )
}

export default Layout
