import { Fragment, useState, useCallback } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import { Btn, H5, P } from '../../AbstractElements';
import { Configuration, Customize, Customizer, PreviewRealTime } from '../../Constant';
import GeneralSettingCustomizer from './GeneralSettingCustomizer';
import ColorsCustomizer from './ColorsCustomizer';
import ConfigurationClass from './ConfigurationClass';
interface propsType {
  callbackNav: (select: string) => void;
  selected: string;
}
const TabCustomizer = ({ selected }: propsType) => {
  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  return (
    <Fragment>
      <TabContent activeTab={selected} >
        <div className="customizer-header">
          <H5>{Customizer}</H5>
          <P className='mb-0'>{Customize} &amp; {PreviewRealTime}</P>
          <Btn color='primary' className='plus-popup mt-2' onClick={toggle}  >{Configuration}</Btn>
          <ConfigurationClass modal={modal} toggle={toggle} />
        </div>
        <div className='customizer-body custom-scrollbar tab-content'>
          <TabPane tabId='General-setting'>
            <GeneralSettingCustomizer />
          </TabPane>
          <TabPane tabId='Colors'>
            <ColorsCustomizer />
          </TabPane>
        </div>
      </TabContent>
    </Fragment>
  );
};

export default TabCustomizer;
