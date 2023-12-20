import { useSelector } from "react-redux";
import { ThemeCustomizerTypes } from "../ThemeCustomizer/ThemeCustomizerTypes";
import { useDispatch } from "react-redux";
import { Input, Label } from "reactstrap";

const Switch = () => {
  const  dispatch =useDispatch()
  const {toggleIcon  } = useSelector((state:ThemeCustomizerTypes) => state.ThemeCustomizer);
  return (
    <div className="mobile-sidebar">
      <div className="flex-grow-1 text-end switch-sm">
        <Label className="switch">
          <Input
            type="checkbox"
            defaultChecked={true}
            onClick={() => {dispatch({type:"setToggleIcon",payload:!toggleIcon})}}
          />
          <span className="switch-state" />
        </Label>
      </div>
    </div>
  );
};

export default Switch;
