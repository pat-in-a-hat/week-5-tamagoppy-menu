//Promineo Week 5 Coding Challenge
//Code written by Patrick Warner
//September 2022

/*The plan for this project is to utilize a series of classes, arrays and prompts to view a "menu"
where one can create, view, and delete elements
*/
//we are building a rudimentary start screen menu for a rip off game called Tamagoppy

class Tamagoppy {
    constructor(name,color) {
        this.name = name;
        this.color = color;
        this.health = 5; // added these in case I wanted to actually make an interactive game later
        this.weight = 15; // was going to have feeding etc... but that was too involved

    }

    describe(){
        return `Your pet tamagoppy, ${this.name}, is a beautiful ${this.color} and weighs ${this.weight} kilos`;
    }
}

class Daycare {
    constructor(){
        this.name = "Sally's Scissors and Tamagoppy Daycare Emporium";
        this.tamagoppys = []; // to store any created tamagoppys
        this.scissorCost = 10;
        this.scissorCount = 0;
        //this.selectedTamagoppy = null; didn't end up using this, just the storage array
    }

    //a method to add a new tamagoppy to the storage array. error line probably not necessarily as its filtered
    //already in the menu class
    addTamagoppy(goppy) {
        if (goppy instanceof Tamagoppy) {
            this.tamagoppys.push(goppy);
        } else {
            throw new Error(`This tamagoppy does not exist. Perhaps it is a figment of your imagination?`)
        }
    }

//method used to remove tamagoppys from the list. Tried to use the filter function but it was being funky so instead
//just splicing the chosen deletion out of the list by passing its index into the method
    removeTamagoppy(i) {
        console.log(i)
        if (this.tamagoppys[i] instanceof Tamagoppy){
            //console.log(this.tamagoppys[i])
            alert(`${this.tamagoppys[i].name} has been removed...

            ${this.tamagoppys[i].weight} pounds you no longer have to deal with`)
            //console.log(this.tamagoppys)
            this.tamagoppys.splice(i,1);
            //console.log(this.tamagoppys)
        } else {
            alert('Looks like Bob took a smoke break... Please come again soon.')
        }
    }


    //yes, the daycare also sells scissors and counts how many you own
    buyScissors() {
        let payment = prompt(`To purchase a pair of our deluxe snippers, please enter your preferred form of payment`)
        let counter = this.scissorCount
        if (payment >= this.scissorCost){
            this.scissorCount += 1
            if (this.scissorCount > 1){
                alert(`You successfully purchased a pair of scissors! You now own ${this.scissorCount} pairs of scissors.`)
            } else {
                alert(`You successfully purchased a pair of scissors! You now own ${this.scissorCount} pair of scissors.`)
            }
        } else {
            alert(`Scissors ain't free, honey. Come back when you got the goods.`)
        }
    }

    describe(){
        alert(`Welcome to ${this.name}! You currently have ${this.tamagoppys.length} tamagoppys in our tender, loving, extra sharp care.`)
    }
}

//Menu class to actually run the display and show options to the user
class Menu {
    constructor (){
        //this.tamagoppylist = []; ended up storing this in the daycare class
        //this.selectedTamagoppy = null; thought I might use this to toggle to a specific pet but left it
        this.daycare = new Daycare(); //this creates an instance of daycare because we only want 1 and we can now reference it
    }

//custom start screen you only see once
    start(){
        this.daycare.describe()
        let begin = this.mainMenu();

    }

    //main menu that invokes the menuScreen list and has interactive options
    //took LOONG time to get this to work without just closing with a bad command
    //figured out "cancel" in prompt leads to null input, so fixed the while loop to only end on null
    //and had to make another method that threw you back to main menu if the input was bad
    //not sure I'd use a while loop here in the future, although this works nicely now
    mainMenu(){
        let selection = this.menuScreen();

        while (selection != null) {
            switch (selection) {
                case '1':
                    this.createTamagoppy();
                    break;
                case '2':
                    this.viewTamagoppys();
                    break;
                case '3':
                    this.disposeTamagoppy();
                    break;
                case '4':
                    this.clippahPurchase();
                    break;
                default:
                    this.returnToMenu();
                    break;
            }
            //above has you return to the main menu if cancel ("null" input) or an actual option (1-4) is not selected)
        }
        alert('Closing menu... Goodybe!')
    }

    //the view screen for you to actually enter your prompt, to be assessed by the mainMenu method above
    menuScreen(){
        return prompt(`
        Type 1 to create a new tamagoppy
        Type 2 to view the tamagoppys in our care
        Type 3 for tamagoppy disposal services
        Type 4 to purchase a pair of our world class clippahs

        Press cancel to exit
        `)
    }

    //returns you to the main menu, a navigator to help with bad selections in mainMenu
    returnToMenu(){
        alert('Please enter a valid input!');

        throw this.mainMenu();
    }

    //confirms you want to proceed, if user selects OK (true) then you are prompted to enter names and a tamagoppy is built
    //it is then added to the tamagoppys array in the daycare class for storage and later recall
    createTamagoppy(){
        let confirmation = confirm(`Using cutting edge technology our scissor specialist will create you a new Tamagoppy.
        
        Please click OK to proceed.`)
        if (confirmation === true){
            let name = prompt(`Enter a name for your new tamagoppy`)
            let petcolor = prompt('Enter a color for your tamagoppy')
            this.daycare.addTamagoppy(this.daycare.selectedTamagoppy = new Tamagoppy(name,petcolor)); //calls the class Tamagoppy
            //builds a new one within our existing daycare class
            alert(`${this.daycare.selectedTamagoppy.describe()}`);//tells you about the tamagoppy ou just built
        }

        throw this.mainMenu();//returns you to the main menu

    }

    //compiles a string of the existing tamagoppys for you to see. if there are none then returns an alert
    viewTamagoppys(){
        let tamagoppyListString = 'Your tamagoppys recieving cutting edge care are: \n';
        if (this.daycare.tamagoppys.length > 0) {
            for (let goppy in this.daycare.tamagoppys){
                tamagoppyListString += this.daycare.tamagoppys[goppy].name + "\n"
            }
            alert(tamagoppyListString)
            
        } else {
            alert(`Currently there are no tamagoppys in our care.`) //letting you know you don't have a tamagoppy at the daycare
        }

        throw this.mainMenu();
        
    }

    //a way to delete tamagoppys out of their storage array, stored in the existing daycare class
    disposeTamagoppy(){
        let deathList = "Please type which tamagoppy you'd like us to cut out of your life: \n"
        if (this.daycare.tamagoppys.length > 0) {
            let confirmation = confirm(`Tamagoppy Disposal:
        We have our methods...

        Proceed?`) //confirming the user wants disposal with the confirm prompt
            if (confirmation === true){
                for (let goppy in this.daycare.tamagoppys){
                    deathList += this.daycare.tamagoppys[goppy].name + "\n"
                }
                let deadGuy = prompt(deathList);//compiles a list above of the tamagoppys then prompts you to enter which you'd like removed
                //console.log(this.daycare.removeTamagoppy(this.daycare.tamagoppys.findIndex(row => row.indexOf(deadGuy) !== -1)))
                let removed = false;//to track if we do actually remove it            
                for (let i in this.daycare.tamagoppys){
                    //console.log(i)
                    //console.log(this.daycare.tamagoppys[i].name)
                    if (this.daycare.tamagoppys[i].name === deadGuy){
                        this.daycare.removeTamagoppy(i)
                        removed = true;
                    } //iterating through the list and then assesing whether the input in the above death prompt is actually the name of a tamagoppy
                    //if we confirm it is the name of a tamagoppy then we pass the index into the remove method in the daycare class
                    //the remove is then marked as true, this prevents the below alert from being triggered
                }
                if (removed === false){
                    alert('Please enter a valid name for disposal')
                }
                /*
                a bunch of old code that wasn't working (different attempts to do the same removal) so its deprecated here

                for (let i in this.daycare.tamagoppys){
                    if (this.daycare.tamagoppys[i].name !== deadGuy){
                        alert('Please enter a valid name to proceed with disposal')
                    }
                }
                
                if (this.daycare.tamagoppys.includes(deadGuy) === true){
                    let deadOne = this.daycare.tamagoppys.
                    this.daycare.removeTamagoppy(this.daycare.tamagoppys.findIndex(row => row.indexOf(deadGuy) !== -1));
                } else{
                    alert(`Please enter a valid tamagoppy name to proceed with disposal`);
                }
                */
            } else{
                alert(`BOB, STOP USING THE WHETSTONE, CLIENT CHANGED THEIR MIND`);//if user cancels out of confirm screen
            }
        } else {
            alert(`I don't see no darn tamagoppys to dispose of for ya`) // if tamagoppys array = 0
        }
       
        throw this.mainMenu();//returns you to mainMenu after selection
    }

    clippahPurchase(){
        this.daycare.buyScissors()//from daycare class
        throw this.mainMenu();//simple stuff if someone wants to buy clippers
    }
}

let goppyMenu = new Menu();//making a new Menu class
goppyMenu.start();//starting up the menu class