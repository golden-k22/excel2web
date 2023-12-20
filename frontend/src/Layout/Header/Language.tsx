import { useState } from "react";
import { Globe } from "react-feather";
import { LI, UL } from "../../AbstractElements";
import { useTranslation } from "react-i18next";
import { languageData } from "../../Data/Layout/Header/LanguageData";

const Language = () => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };
  const LanguageSelection = (open: any) => {
    if (open) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  return (
    <LI className="language-nav">
      <div className={`translate_wrapper ${open ? "active" : ""}`}>
        <div className="current_lang">
          <div className="lang" onClick={() => LanguageSelection(open)}>
            <Globe />
          </div>
        </div>
        <UL className={`more_lang ${open ? "active" : ""}`}>
          {languageData.map((data, index) => (
            <div key={index} className="lang" onClick={() => changeLanguage(data.languageParameter)}>
              <i className={`flag-icon fi fi-${data.languageIconClassName}`}></i>
              <span className="lang-txt">{data.languageName}</span>
            </div>
          ))}
        </UL>
      </div>
    </LI>
  );
};

export default Language;
