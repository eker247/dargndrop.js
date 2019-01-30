var addAttLabel = 'add files';
var dz = {
  attachDiv: null,
  adTab: null,
  counter: 0,
  inputs: [],

  initDropZone: function() {
    this.attachDiv = document.getElementById('attach_div');

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    };
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.attachDiv.addEventListener(eventName, preventDefaults, false)
    });

    this.attachDiv.ondrop = function(e) { dz.dropHandler(e); };
    this.attachDiv.ondragover = function() { dz.attachDiv.style.background = '#ccc'; };
    this.attachDiv.ondragleave = function() { dz.attachDiv.style.background = '#aaa'; };
    this.attachDiv.innerHTML = '<table id="adTab" class="table table-striped table-sm">' +
      `<span class="btn-attache btn-info" onclick="dz.addInput()">${addAttLabel}<span class="plus"> + </span></span>`;
    this.adTab = this.attachDiv.children["adTab"];
  },

  printTable: function() {
    var tabData = '';
    this.inputs.forEach(function(inp) {
      tabData += `<tr><td>${inp.files[0].name}</td>` +
        `<td><span onclick="dz.rmInput('${inp.id}')">rm</span></td>` + 
        `</tr>`;
    });
    this.adTab.innerHTML = tabData;
  },

  addInput: function() {
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.name = `attachement_${this.counter}`;
    inp.id = `att${this.counter}`;
    inp.style.visibility = 'hidden';
    this.attachDiv.appendChild(inp);
    inp.onchange = function(e) { dz.inputs.push(e.target); dz.printTable(); };
    inp.click();
    this.counter++;
  },

  rmInput: function(id) {
    var toRemove = this.inputs.find(inp => inp.id === id );
    this.inputs = this.inputs.filter(inp => inp !== toRemove);
    this.attachDiv.removeChild(toRemove);
    this.inputs = this.inputs.filter(inp => inp.id !== id);
    this.printTable();
  },
  
  dropHandler: function(e) {
    e.preventDefault();
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.files = e.dataTransfer.files;
    inp.name = `attachement_${this.counter}`;
    inp.style.visibility = 'hidden';
    inp.id = `att${this.counter}`;
    this.attachDiv.appendChild(inp);
    this.inputs.push(inp);
    this.printTable(0);
    this.counter++;
    return false;
  }
};

setTimeout(() => {
  dz.initDropZone();
}, 100);