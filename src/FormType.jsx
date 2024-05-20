import { useState, useEffect } from "react";
import { Card } from "./Card";
import { BtnScrollTop } from "./BtnScrollTop";
import { Navbar } from "./Navbar";

export function FormType() {
  const [cards, setCards] = useState([]);
  const [input, setInput] = useState("");
  const [tooData, setTooData] = useState(false);
  const [noData, setNoData] = useState(false);
  const [data, setData] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleFetch = async () => {
    const searchedWord = input.trim().toLowerCase();

    if (searchedWord === "") {
      setTooData(true);
      setNoData(false);
      setData(false);
      return;
    }

    try {
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const responseJson = await response.json();
      const dataJson = responseJson.data;

      const filteredCards = dataJson.filter((card) => {
        const cardName = card.name.toLowerCase();
        const cardDesc = card.desc.toLowerCase();
        const cardArch = card.archetype ? card.archetype.toLowerCase() : "";

        return (
          cardName.includes(searchedWord) ||
          cardDesc.includes(searchedWord) ||
          cardArch.includes(searchedWord)
        );
      });

      if (filteredCards.length > 0) {
        setCards(filteredCards);
        setData(true);
        setNoData(false);
        setTooData(false);
      } else {
        setCards([]);
        setNoData(true);
        setData(false);
        setTooData(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClear = () => {
    setCards([]);
    setInput("");
    setTooData(false);
    setNoData(false);
    setData(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFetch();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container-all">
      <Navbar />
      <div className={`search-box ${isScrolled ? "fixed" : ""}`}>
        <input
          className="input-search"
          type="text"
          id="input-search"
          placeholder="Search"
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" id="clear-btn" onClick={handleClear}>
          clear
        </button>
        <button className="btn" id="fetch-btn" onClick={handleFetch}>
          fetch
        </button>
      </div>
      <BtnScrollTop />
      {tooData && (
        <div>
          <h3 className="toodata-message">Troppi dati da fetchare</h3>
          <p>Per favore ridigita nella barra di ricerca</p>
        </div>
      )}
      {noData && (
        <div>
          <h3 className="nodata-message">Nessun risultato trovato</h3>
          <p>Per favore ridigita nella barra di ricerca</p>
        </div>
      )}
      {data && <Card cards={cards} />}
    </div>
  );
}
