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
        return `Your pet Tamagoppy, ${this.name} is a beautiful ${this.color} and weighs ${this.weight} kilos`;
    }
}

class Daycare {
    constructor(){
        this.name = "Sally's Scissors and Tamagoppy Daycare Emporium";
        this.tamagoppys = [];
        this.scissorCost = 10;
        this.scissorCount = 0;
    }
    addTamagoppy(tamagoppy) {
        if (tamagoppy instanceof Tamagoppy) {
            this.tamagoppys.push(tamagoppy);
        } else {
            throw new Error(`This tamagoppy does not exist. Perhaps it is a figment of your imagination?`)
        }
    }

//method used to remove tamagoppys from the list. Using the menu a valid name is passed in, and the filter
//function then removes that item from the list by setting array equal to a filter of everything but said name
    removeTamagoopy(tamagoppy) {
        if (tamagoppy instanceof Tamagoppy){
            this.tamagoppys = this.tamagoppys.filter(goppy =>! tamagoppy);
        }
    }

    buyScissors() {
        let payment = prompt(`To purchase a pair of our deluxe snippers, please enter your preferred form of payment`)
        if (payment >= this.scissorCost){
            this.scissorCount += 1
            return `You successfully purchased a pair of scissors! You now own ${this.scissorCount} scissors.`
        } else {
            return `Scissors ain't free, honey. Come back when you got the goods.`
        }
    }

    describe() {
        return `Welcome to ${this.name}! You currently have ${this.tamagoppys.length} tamagoppys in our tender, loving, extra sharp care.`
    }
}

class Menu {
    constructor (){
        //this.tamagoppylist = [];
        this.selectedTamagoppy = null;
    }

    /*start() {
        let intro = this.buildTamagoppy();
        while (intro != null){
            return
        }
    }
    */

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
                default:
                    selection = 0;
            }
            selection = this.menuScreen();
        }
    }

    menuScreen(){
        return prompt(`
        ${Daycare.describe()}
        Press 1 to create a new tamagoppy
        Press 2 to view the tamagoppys in our care
        Press 3 for tamagoppy disposal services
        Press 4 to purchase a pair of our world class clippahs
        `)
    }

    createTamagoppy(){
        let confirmation = confirm(`Using cutting edge technology our scissor specialist will create you a new Tamagoppy.
        Please click OK to proceed.`)
        if (confirmation === true){
            let name = prompt(`Enter a name for your new tamagoppy`)
            let petcolor = prompt('Enter a color for your tamagoppy')
            Daycare.addTamagoppy(new Tamagoppy(name,petcolor));
        }else{
            return this.menuScreen
        }
    }

    viewTamagoppys(){
        let tamagoppyListString = 'Your tamagoppys recieving cutting edge care are: \n';
        for (goppy in Daycare.tamagoppys){
            tamagoppyListString += goppy + "\n"
        }
        alert(tamagoppyListString)
    }

    disposeTamagoppy(){
        let confirmation = confirm(`Tamagoppy Disposal:
        We have our methods...

        Proceed?`)
        let deathList = "Please type which tamagoppy you'd like us to cut out of your life: \n"
        if (confirmation === true){
            for (goppy in Daycare.tamagoppys){
                deathList += goppy + "\n"
            }
            let deadGuy = prompt(deathList)
            if (Daycare.tamagoppys.find(deadGuy) == deadGuy){
                Daycare.removeTamagoopy(deadGuy)
            } else{
                alert(`Please enter a valid tamagoppy name to proceed with disposal`)
            }
        } else{
            alert(`BOB, STOP USING THE WHETSTONE, CLIENT CHANGED THEIR MIND`)
            return this.menuScreen
        }
    }

    clippahPurchase(){
        Daycare.buyScissors()
    }
}

let menu = new Menu();
menu.mainMenu();