class Die {
    public readonly value : number;
    public readonly held : boolean;
    
    constructor(v : number, h : boolean) {
        this.value = v;
        this.held = h;
    }
}

export default Die;