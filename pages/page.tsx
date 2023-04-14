import { useEffect, useState } from "react";
import { useStore } from "../src/hook/useStore";
import TextArea from "../src/components/TextArea";
import SelectLanguage from "../src/components/SelectLanguage";
import { ChangeIcon, EarIcon, ClipCopy } from "../src/components/icons/icons";
import { LanguageType } from "../src/interfaces/enum";
import { Header } from "../src/components/Header";
import { useBounce } from "../src/hook/useBounce";
import { Button } from "react-bootstrap";

function PageTranslate() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interChangeLanguage,
    setToLanguage,
    setFromLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useBounce(fromText, 500);

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = toLanguage;
    speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  async function translate(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromLanguage, toLanguage, text: fromText }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      return data;
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    if (debouncedFromText === "") return;
    translate(event)
      .then((data: { result }) => {
        if (data.result == null) return;
        setResult(data.result);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }, [fromText, fromLanguage, toLanguage, loading]);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-evenly align-items-center pt-3">
        <div className="row">
          <div className="col d-flex align-items-center">
            <div>
              <SelectLanguage
                value={fromLanguage}
                type={LanguageType.FROM}
                onChange={setFromLanguage}
              />
              <TextArea
                value={fromText}
                type={LanguageType.FROM}
                onChange={setFromText}
              />
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <button
              onClick={interChangeLanguage}
              style={{ height: "50px" }}
              className="rounded"
            >
              <ChangeIcon />
            </button>
          </div>
          <div className="col d-flex align-items-center">
            <div className="p-relative">
              <SelectLanguage
                value={toLanguage}
                type={LanguageType.TO}
                onChange={setToLanguage}
              />
              <TextArea
                value={!loading ? result : "Loading..."}
                type={LanguageType.TO}
                onChange={setResult}
                loading={loading}
              />
              <button onClick={() => handleSpeak(result)}>
                <EarIcon />
              </button>
              <button onClick={handleCopy}>
                <ClipCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default PageTranslate;
