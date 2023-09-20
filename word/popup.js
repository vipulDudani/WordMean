document.addEventListener("DOMContentLoaded", function () {
    const wordInput = document.getElementById("wordInput");
    const lookupButton = document.getElementById("lookupButton");
    const meaningResult = document.getElementById("meaningResult");
  
    lookupButton.addEventListener("click", () => {
      const word = wordInput.value.trim();
      if (word) {
        fetchMeaning(word);
      }
    });
  
    function fetchMeaning(word) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const meanings = data[0].meanings;
            const examples = data[0].examples;
            const synonyms = data[0].synonyms;
            const antonyms = data[0].antonyms;
  
            const meaningHTML = meanings
              .map(
                (meaning) =>
                  `<p><strong> Meaning :</strong> ${meaning.definitions[0].definition}</p>`
              )
              .join("");
  
            const examplesHTML = examples
              ? `<p><strong>Examples:</strong> ${examples.join(", ")}</p>`
              : "";
  
            const synonymsHTML = synonyms
              ? `<p><strong>Synonyms:</strong> ${synonyms.join(", ")}</p>`
              : "";
  
            const antonymsHTML = antonyms
              ? `<p><strong>Antonyms:</strong> ${antonyms.join(", ")}</p>`
              : "";
  
            meaningResult.innerHTML = meaningHTML + examplesHTML + synonymsHTML + antonymsHTML;
          } else {
            meaningResult.innerHTML = "Word not found.";
          }
        })
        .catch((error) => {
          meaningResult.innerHTML = "An error occurred.";
          console.error(error);
        });
    }
  });
  