import { Fragment, useState } from "react";
import { Moon, Sun } from "react-feather";
import { LI } from "../../AbstractElements";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const DarkModeHandler = (name: string) => {
    setDarkMode(!darkMode);
    if (name === "sun") {
      document.body.classList.remove("dark-only");
    } else if (name === "Moon") {
      document.body.classList.add("dark-only");
    }
  };
  return (
    <Fragment>
      <LI>
        {darkMode ? (
          <Sun onClick={() => DarkModeHandler("sun")} />
        ) : (
          <Moon onClick={() => DarkModeHandler("Moon")} />
        )}
      </LI>
    </Fragment>
  );
};

export default DarkMode;
