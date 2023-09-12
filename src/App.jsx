/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
// EXTERNAL LIBRARY
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

// FONT FAMILY
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  // HOOKS
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, SetTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });
  const [locale, setLocale] = useState("ar");
  // HANDLERS
  function handleTranslateClick() {
    if (locale == "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  let cancleAxios = null;
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=33.5&lon=36.27&appid=f3bd9ddeeadc87e71e642e85af416f63",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancleAxios = c;
          }),
        }
      )
      .then((res) => {
        console.log(res);
        const number = Math.round(res.data.main.temp - 272.15);
        const min = Math.round(res.data.main.temp_min - 272.15);
        const max = Math.round(res.data.main.temp_max - 272.15);
        const description = res.data.weather[0].description;
        const icon = res.data.weather[0].icon;
        SetTemp({ number, min, max, description, icon });
      });
    // CLEAN UP
    return () => {
      // stop request
      cancleAxios();
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={locale == "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={locale == "ar" ? "rtl" : "ltr"}
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {t("Syria")}
                  </Typography>

                  <Typography style={{ marginRight: "20px", fontSize: "17px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img
                        src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                        alt="wearther-icon"
                      />
                    </div>

                    <Typography variant="h6">{t(temp.description)}</Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("Temp-min")} : {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 10px" }}>|</h5>
                      <h5>
                        {t("Temp-max")} : {temp.max}
                      </h5>
                    </div>
                  </div>

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* TRANSLATION CONTAINER */}
            <div
              dir={locale == "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button
                style={{ color: "white", textTransform: "capitalize" }}
                onClick={handleTranslateClick}
              >
                {locale == "ar" ? "إنجليزي" : "Arabic"}
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
