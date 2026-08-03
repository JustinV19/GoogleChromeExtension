document.getElementById("save").addEventListener("click", () =>{
    const selected = document.querySelector('input[name = "ausgabe"]:checked');
    if (!selected) return;
    chrome.storage.local.set({
        ausgabe: selected.value
    })
});

chrome.storage.local.get(["ausgabe"], (result) => {

    if (result.ausgabe) {

        document.querySelector(
            `input[name="ausgabe"][value="${result.ausgabe}"]`
        ).checked = true;

    }

});