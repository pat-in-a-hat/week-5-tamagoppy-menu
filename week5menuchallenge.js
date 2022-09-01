//Promineo Week 5 Coding Challenge
//Code written by Patrick Warner
//September 2022

/*The plan for this project is to utilize a series of classes, arrays and prompts to view a "menu"
where one can create, view, and delete elements
*/

class Tamagoppy {
    constructor(name,color) {
        this.name = name;
        this.color = color;
        this.health = 5;
        this.weight = 15;

    }

    describe(){
        return `Your pet tamagoppy, ${this.name}, is a beautiful ${this.color} and weighs ${this.weight} kilos`;
    }
}

class Daycare {
    constructor(){
        this.name = "Sally's Scissors and Tamagoppy Daycare Emporium";
        this.tamagoppys = [];
        this.scissorCost = 10;
        this.scissorCount = 0;
        this.selectedTamagoppy = null;
    }
    addTamagoppy(goppy) {
        if (goppy instanceof Tamagoppy) {
            this.tamagoppys.push(goppy);
        } else {
            throw new Error(`This tamagoppy does not exist. Perhaps it is a figment of your imagination?`)
        }
    }

//method used to remove tamagoppys from the list. Using the menu a valid name is passed in, and the filter
//function then removes that item from the list by setting array equal to a filter of everything but said name
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

class Menu {
    constructor (){
        //this.tamagoppylist = [];
        //this.selectedTamagoppy = null;
        this.daycare = new Daycare();
    }

    /*start() {
        let intro = this.buildTamagoppy();
        while (intro != null){
            return
        }
    }
    */

    start(){
        this.daycare.describe()
        let begin = this.mainMenu();

    }

    mainMenu(){
        let selection = this.menuScreen();

        while (selection != 0) {
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
                    selection = 0;
            }
            //selection = this.menuScreen();
        }
        alert('Closing menu... Goodybe!')
    }

    menuScreen(){
        return prompt(`
        Press 1 to create a new tamagoppy
        Press 2 to view the tamagoppys in our care
        Press 3 for tamagoppy disposal services
        Press 4 to purchase a pair of our world class clippahs

        To exit press 0
        `)
    }

    createTamagoppy(){
        let confirmation = confirm(`Using cutting edge technology our scissor specialist will create you a new Tamagoppy.
        
        Please click OK to proceed.`)
        if (confirmation === true){
            let name = prompt(`Enter a name for your new tamagoppy`)
            let petcolor = prompt('Enter a color for your tamagoppy')
            this.daycare.addTamagoppy(this.daycare.selectedTamagoppy = new Tamagoppy(name,petcolor));
            //let petOverview = this.daycare.tamagoppys[this.daycare.tamagoppys.length - 1];
            alert(`${this.daycare.selectedTamagoppy.describe()}`);
        }

        throw this.mainMenu();

    }

    viewTamagoppys(){
        let tamagoppyListString = 'Your tamagoppys recieving cutting edge care are: \n';
        //let daycareList = Daycare
        if (this.daycare.tamagoppys.length > 0) {
            for (let goppy in this.daycare.tamagoppys){
                tamagoppyListString += this.daycare.tamagoppys[goppy].name + "\n"
            }
            alert(tamagoppyListString)
            
        } else {
            alert(`Currently there are no tamagoppys in our care.`)
        }

        throw this.mainMenu();
        
    }

    disposeTamagoppy(){
        let deathList = "Please type which tamagoppy you'd like us to cut out of your life: \n"
        if (this.daycare.tamagoppys.length > 0) {
            let confirmation = confirm(`Tamagoppy Disposal:
        We have our methods...

        Proceed?`)
            if (confirmation === true){
                for (let goppy in this.daycare.tamagoppys){
                    deathList += this.daycare.tamagoppys[goppy].name + "\n"
                }
                let deadGuy = prompt(deathList);
                //console.log(this.daycare.removeTamagoppy(this.daycare.tamagoppys.findIndex(row => row.indexOf(deadGuy) !== -1)))
                let removed = false;            
                for (let i in this.daycare.tamagoppys){
                    //console.log(i)
                    //console.log(this.daycare.tamagoppys[i].name)
                    if (this.daycare.tamagoppys[i].name === deadGuy){
                        this.daycare.removeTamagoppy(i)
                        removed = true;
                    }
                }
                if (removed === false){
                    alert('Please enter a valid name for disposal')
                }
                /*for (let i in this.daycare.tamagoppys){
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
                alert(`BOB, STOP USING THE WHETSTONE, CLIENT CHANGED THEIR MIND`);
            }
        } else {
            alert(`I don't see no darn tamagoppys to dispose of for ya`)
        }
       
        throw this.mainMenu();
    }

    clippahPurchase(){
        this.daycare.buyScissors()
        throw this.mainMenu();
    }
}

let goppyMenu = new Menu();
goppyMenu.start();