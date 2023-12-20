  import React from 'react';
import { Tooltip } from 'reactstrap';

const ToolTip = (props:any) => {
      const { children = '' } = props;
      return (
        <Tooltip {...props} >
          {children}
        </Tooltip>
      );
};

export default ToolTip;