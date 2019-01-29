var dz = {
  attachDiv: null,
  counter: 0,
  files: [],
  input: null,

  initDropZone: function() {
    this.attachDiv = document.getElementById('attach_div');

    function preventDefaults (e) {
      e.preventDefault();
      e.stopPropagation();
    };
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.attachDiv.addEventListener(eventName, preventDefaults, false)
    });

    this.attachDiv.ondrop = function(e) { dz.dropHandler(e); };
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.multiple = true;
    this.input.addEventListener('change', function(e) { dz.addFiles(e.target.files); });
    this.printTable();
  },

  printTable: function() {
    var tab = '<table class="table table-striped">';
    this.files.forEach(f => {
      tab += `<tr><td>${f.name}</td>`;
      tab += `<td>${f.size}</td>`;
      tab += `<td>${f.type}</td>`;
      tab += `<td><span class="btn btn-danger" onclick="dz.rmFile('${f.name}')">X</span></td></tr>`;
    });
    tab += '</table>';
    tab += `<button onclick="dz.addAttache()">Add Files</button>`;

    this.attachDiv.innerHTML = tab;
  },

  addAttache: function() {
    this.input.click();
  },

  addFiles: function(files) {
    if (!files) {
      return;
    }
    for (i = 0; i < files.length; ++i) {
      if (this.files.find(f => f.name === files[i].name)) {
        continue;
      }
      this.files.push({
        error: '',
        name: files[i].name,
        type: files[i].type,
        tmp_name: '',
        size: files[i].size
      });
    }
    this.printTable();
  },

  rmFile: function(name) {
    this.files = this.files.filter(f => f.name !== name);
    this.printTable();
  },
  
  dropHandler: function(e) {
    e.preventDefault();
    var files = e.dataTransfer.files;
    this.addFiles(files);
    return false;
  }
};

setTimeout(() => {
  dz.initDropZone();
}, 100);
