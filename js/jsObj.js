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

function toJSONString( form ) {
    let obj = {};
    let elements = form.querySelectorAll( "input, select, textarea" );
    for( let i = 0; i < elements.length; ++i ) {
        let element = elements[i];
        let name = element.name;
        let value = element.value;

        if( name ) {
            obj[ name ] = value;
        }
    }

    return JSON.stringify( obj );
}

document.addEventListener( "DOMContentLoaded", function() {
    var form = document.getElementById( "signup-submit" );
    var output = document.getElementById( "output" );
    form.addEventListener( "submit", function( e ) {
        e.preventDefault();
        var json = toJSONString( this );
    console.log(json);
        output.innerHTML = json;

    }, false);

});


// AJAX
function displayFullName() {
    // Creating the XMLHttpRequest object
    var request = new XMLHttpRequest();

    // Instantiating the request object
    request.open("GET", "https://www.reddit.com/r/aww.json");

    // Defining event listener for readystatechange event
    request.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if(this.readyState === 4 && this.status === 200) {
            // Inserting the response from server into an HTML element
            document.getElementById("result").innerHTML = this.responseText;
        }
    };

    console.log(request.responseText);

    // Sending the request to the server
    request.send();
}