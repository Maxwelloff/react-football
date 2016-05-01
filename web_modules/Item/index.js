import React, { Component } from 'react';

import styles from "./index.css"

const Item = ({name ="",id="", onClick=null }) =>

(<div className={styles.item}
      onClick={()=>{
        if(typeof onClick=="function") onClick({id,name})
      }}>
  {name}
</div>)

export default Item
