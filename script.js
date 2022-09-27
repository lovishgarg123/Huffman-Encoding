let text = ""
let frequency = new Map();
let graph = []
let codes = new Map();

function getFrequency(){
    for(let i=0; i<text.length; i++){
        if (frequency[text[i]] != undefined){
            frequency[text[i]] += 1
        }
        else{
            frequency[text[i]] = 1
        }
    }
}

function getMinWeightNode(){
    let min = 100000000000000;
    let result = graph[0];
    let index = 0;
    for(let i=0; i<graph.length; i++){
        if (graph[i][0] < min){
            result = graph[i];
            min = result[0];
            index = i;
        }
    }
    return [result,index];
}

function createGraph(){
    for (let key in frequency){
        graph.push([frequency[key], key,[],[]])
    }

    while(graph.length > 1){
        
        let [curr1,ind1] = getMinWeightNode();
        graph.splice(ind1, 1);
        let [curr2,ind2] = getMinWeightNode();
        graph.splice(ind2, 1);
        
        let newNode = [curr1[0]+curr2[0], curr1[1]+curr2[1], curr1, curr2]
        graph.push(newNode);
    }
}

function getCodes(currNode, currCode){
    if (currNode[2].length === 0){
        codes[currNode[1]] = currCode;
        return;
    }
    getCodes(currNode[2], currCode+'0');
    getCodes(currNode[3], currCode+'1');
}

function encode(){
    frequency = new Map();
    graph = []
    codes = new Map();
    text = document.querySelector('.main_left textarea').value;
    getFrequency();
    createGraph();
    getCodes(graph[0],'')
    console.log(graph);
    console.log(codes);
    let codedText = ""
    for (let i=0; i<text.length; i++){
        codedText += codes[text[i]];
    }
    document.querySelector('.main_right .coded_text').innerHTML = codedText;

    let table = document.querySelector('.main_right table');
    for (let i in frequency){
        tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${i}</td>
                    <td>${frequency[i]}</td>
                    <td>${codes[i]}</td>

        `
        table.appendChild(tr);
    }
}
