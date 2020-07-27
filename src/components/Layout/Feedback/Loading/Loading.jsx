import React from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
import {useSelector} from "react-redux";

export default function Loading(){
    const {loading} = useSelector(state=> state.feedback)
    return (loading && <LinearProgress color="secondary"/>)
}
