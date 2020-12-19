import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet

import {useRouter} from "next/router"


const SelectBtn: React.FC = () => {
    const router = useRouter();
    var category = router.query.category || ''

    return (
        <select className={style.dropdown} value={ category } onChange={(e) => { router.push({pathname: "/journal", query: { category: e.target.value }}) }}>
            <option value=''>All</option>
            <option value="resources">Resources</option>
            <option value="creative-space"> Creative Space</option>
            <option value="vent-place">Vent Place</option>
        </select>
    )
}

export default SelectBtn;