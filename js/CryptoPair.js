class CryptoPair{
    constructor(name, price, image){
        this.name = name;
        this._price = price;
        this.image = image;

        // this.keepUpdatedPrice()
    }

    set price(price){
        this._price = price
        // update price on the page
    }

    addNewCryptoPair(){
        
    }

    keepUpdatedPrice() {
        // bud jenom jednou
        // nebo kazdych 10 sekund

        // this.price = nova.cena
    }
}






// addEventListener na posunuti a callback definovany zde nebo jinde