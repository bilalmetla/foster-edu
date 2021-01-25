
import React, {useState} from "react";
import { useHistory } from 'react-router-dom';

export function ChangeRoute (path){
    let history = useHistory();
    history.push(path);
}