
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
    let html = ""
    
    //Did the fetch work
    console.log(comp)

    let title = document.getElementById("title")
    let linje = document.getElementById("linje-img")
    let tbody = document.getElementById("table-body")
    
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

    tbody.innerHTML = ""
    tbody.appendChild(template.content)
    title.innerText = comp.title
    linje.src = comp.linjesrc
}

Load("cd.json")
