
async function fetchJSONData(file) {
    let resp = await fetch("./data/" + file)
    
    if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    return resp.json()
}
         
// We assume CD is the default complex
async function Load(complex) {
    let comp = await fetchJSONData(complex)

    console.log(comp)

    let title = document.getElementById("title")
    let linje = document.getElementById("linje-img")
    let tbody = document.getElementById("table-body")

    let html = ""
    //Create a html string from the data
    for (let i = 0; i < comp["table-body"].length; i++) {
        const relay = comp["table-body"][i];

        td_relay = "<td>" + relay.name + "</td>"
        td_desc = "<td>" + relay.desc + "</td>"
        
        if(comp["normalt-dragna"].includes(relay.name)) {
            td_relay = "<td><u>" + relay.name + "</u></td>"
        }
        
        html += "<tr>" + td_relay + td_desc + "</tr>"
    }

    let template = document.createElement("template")
    template.innerHTML = html

    tbody.appendChild(template.content)
    /* Recreate this using javsscript.
        <tr>
            <td><u>Iv</u></td>
            <td>Spårledningsupptag</td>
        </tr>
        <tr>
            <td><u>Sv</u></td>
            <td>Spårledningsupptag</td>
        </tr>
        <tr>
            <td><u>IIv</u></td>
            <td>Spårledningsupptag</td>
        </tr>
        <tr>
            <td><u>RVv</u></td>
            <td>Manöverrelä för varningssignalering, repeteringsrelä för <u>Vv</u></td>
        </tr>
        <tr>
            <td><u>Vv</u></td>
            <td>Varningssignalering väg, startar signalering</td>
        </tr>
        <tr>
            <td>Akv</td>
            <td>Avkopplingsrelä för vägskyddsanläggning</td>
        </tr>
        <tr>
            <td>TRAkvB</td>
            <td>Tid Relä för kontroll om <u>Akv</u> är draget</td>
        </tr>
        <tr>
            <td>TRVv</td>
            <td>Tid Relä för återställning av <u>Vv</u> och varningssignalering vid en belägning av Iv eller IIv</td>
        </tr>
        <tr>
            <td>FdIv</td>
            <td>Färdriktningsrelä som styrs av Iv, för passageriktning Iv-Sv-<u>IIv</u></td>
        </tr>
        <tr>
            <td>FdSv</td>
            <td>Färdriktningsrelä som styrs av Sv, används för att avgöra passagekontrollen</td>
        </tr>
        <tr>
            <td>FdIIv</td>
            <td>Färdriktningsrelä som styrs av IIv, för passageriktning IIv-Sv-<u>Iv</u></td>
        </tr>
        <tr>
            <td>Vsv</td>
            <td>Kontrollrelä för aktiverad varningssignalering i Signaler mot banan</td>
        </tr>


    */
}

Load("cd.json")