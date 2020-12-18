import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet

import {useRouter} from "next/router"


const SelectBtn : React.FC = () => {
    const router = useRouter();
    var category = router.query.type || "";

    return (
        <select className={style.dropdown} value={ category } onChange={(e) => { router.push(`/journal?category=${e.target.value}`) }}>
            <option disabled hidden className={style.disabledBtn} value=''>Select type</option>
            <option value="resources">Resources</option>
            <option value="creative"> Creative Space</option>
            <option value="vent">Vent Place</option>
        </select>
    )
}

export default SelectBtn;