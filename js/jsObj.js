let company = {
    name : "NexSeed",
    employees : 50,
    building: "2Quad",
    programmingScool: true,
    working : function() {
        return this.name + " " + this.employees;
    },
    outing : function() {
        return this.name + " is having" + this.employees + "went outing";
    },
    expanding : function() {
        this.employees++;
    },
    layOff : function() {
        this.employees--;
    },
    subCompany: {
        subCompanyName : "Seedtech",
        totaEmployees : 54,
        legit: false,
        totalEmployers: ["Shinya", "Renna", "Hayato", {
            majorEmployers : ["Henry Sy", "Lucio Tan"] 
        }],
        subWorking : function() {
            return this.subCompanyName + " is legit?" + this.legit
        },
        partnerCompany: {
            name: "Ayala"
        }
    }
};

// function company(name, employees, year) {
//     this.name = name;
//     this.employees = employees;
//     this.year = year;
// }


function Apple () {
    console.log("I am an apple");
}

function running () {
    console.log("I am an running");
}

// ANOTHER OBJECT
let planet = {}
let building = new Object();

function place (name, coordinates) {
    this.name = name;
    this.coordinates = coordinates;
}

let talamban = new place("Tintay", 25);
let talisay = new place();


// let accenture = new company();

let x = company;

x.name = "Alliance";

console.log(company);



var library = [ 
    {
        title:  'The Road Ahead',
        author: 'Bill Gates',
        libraryID: 1254
    },
    {
        title: 'Walter Isaacson',
        author: 'Steve Jobs',
        libraryID: 4264
    },
    {
        title: 'Mockingjay: The Final Book of The Hunger Games',
        author: 'Suzanne Collins',
        libraryID: 3245
    },
    {
        title: 'The Design of EveryDay Things',
        author: 'Don Norman',
        libraryID: 245
    },
    {
        title: 'The Most Human Human',
        author: 'Brian Christian',
        libraryID: 1645
    }
];

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "nba.json", true);
    xhttp.send();
  }