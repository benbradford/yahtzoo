class Die {
    private val : number = 6;
    private held : boolean = false;
 
    public roll() {
        if (this.held === false) {
            this.val = 1 + Math.floor( Math.random() * 6);
        }
    }

    public hold() {
        this.held = true;
    }

    public reset_hold() {
        this.held = false;
    }

    public is_held() : boolean {
        return this.held;
    }

    public value() : number {
        return this.val;
    }
}

export default Die;