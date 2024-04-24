import { useState } from "react";
import { Card } from "./Card";
import { BtnScrollTop } from "./BtnScrollTop";
import { Navbar } from "./Navbar";
import { useEffect } from "react";

export function FormType() {
  const [card, setCard] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  ///////////////////////////////////////////////////////

  async function handleFetch() {
    try {
      const searchedWord = input.trim().toLowerCase() ;
      let filteredCards = [];

      if (searchedWord === "") {
        console.log(
          "Troppi dati da fetchare. Per favore digita nella barra di ricerca"
        );
        alert(
          "Troppi dati da fetchare. Per favore digita nella barra di ricerca"
        );

        setCard([]);
      } else {
        setLoading(true);
        //fetch data
        const response = await fetch(
          "https://db.ygoprodeck.com/api/v7/cardinfo.php"
        );
        const responseJson = await response.json();
        const dataJson = await responseJson.data;

        setLoading(false);

        filteredCards = dataJson.filter((card) => {
          const cardName = card.name.toLowerCase();
          const cardDesc = card.desc.toLowerCase();

          const cardArch = card.archetype ? card.archetype.toLowerCase() : "";

          if (loading) {
            return <span style={{ width: "500px" }}>Loading...</span>;
          }

          if (
            searchedWord === "" ||
            !cardName.includes(searchedWord) &&
            !cardDesc.includes(searchedWord) &&
            !cardArch.includes(searchedWord)
          ) {
            alert("Nessun risultato trovato");
            console.log("Nessun risultato trovato");
          } else {
            return (
              searchedWord !== "" ||
              cardName.includes(searchedWord) ||
              cardDesc.includes(searchedWord) ||
              cardArch.includes(searchedWord)
            );
          }
        });
        setCard(filteredCards);
        console.log(filteredCards);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /////////////////////////////////////////////

  function handleClear() {
    setCard([]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleFetch();
    }
  }
  //per bloccare la barra allo scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      <Card card={card} />
      <BtnScrollTop />
    </div>
  );
}
