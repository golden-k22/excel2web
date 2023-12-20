import { CardHeader } from "reactstrap";
import { Btn, H5 } from "../AbstractElements";
interface propsTypes {
  Heading?: string | JSX.Element | undefined;
  dangerouslySetInnerHTML?: any;
  dangerouslySetInnerHTML2?:any ;
  icon?: JSX.Element | undefined;
  className?: string;
  H5ClassName?: string;
  Btn?: boolean;
  BtnclassName?: string;
  BtnColor?: string;
  BtnOnClick?: any;
  BtnOnClickParameter?: number;
  BtnText?: string;
  span?: boolean;
  span2?: boolean;
  BtnSpanClass?: string;
  BtnSpanText?: string | number;
  BtnIcon?: JSX.Element;
  H5span?:boolean
  H5SpanText?:string
  H5spanClassName?:string
  spanClassName?:string
}
const HeadingCommon = (props: propsTypes) => {
  return (
    <CardHeader className={props.className}>
      <H5 className={props.H5ClassName}>
        {props.icon && props.icon}
        {props.Heading}
        {props.Btn && (
          <Btn
            className={props.BtnclassName}
            color={props.BtnColor}
            onClick={() => props.BtnOnClick(props.BtnOnClickParameter)}
          >
            {props.BtnIcon && props.BtnIcon}
            {props.BtnText}
            {props.span && (
              <span className={props.BtnSpanClass}>{props.BtnSpanText}</span>
            )}
          </Btn>
        )}
        {props.H5span && <span className={props.H5spanClassName}>{props.H5SpanText}</span>}
      </H5>
      {props.dangerouslySetInnerHTML && (
        <span
          className={props.spanClassName}
          dangerouslySetInnerHTML={{ __html: props.dangerouslySetInnerHTML }}
        />
      )}
      {props.span2 && (
        <span
          dangerouslySetInnerHTML={{ __html: props.dangerouslySetInnerHTML2 }}
        />
      )}
    </CardHeader>
  );
};

export default HeadingCommon;
