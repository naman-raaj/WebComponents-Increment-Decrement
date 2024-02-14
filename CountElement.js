//+ {count} -
//attribute- steps- 1,5,initialValue

const template=document.createElement('template');
template.innerHTML=`
    <style>
    h3{
        color:red;
        font-size:40px;
    }
    
    </style>    
    
    


`;


class CountElement extends HTMLElement{
    static get observedAttributes(){
        return ['steps','initialvalue']
    }

// get/set for attributes
    get initialvalue(){
        return this.getAttribute('initialvalue')
    }
    set initialvalue(value){
        if(value){
            this.setAttribute('initialvalue');
        }
        else{
            this.removeAttribute('initialvalue')
        }
    }

    get steps(){
        return this.getAttribute('steps')
    }
    set steps(value){
        if(value){
            this.setAttribute('steps');
        }
        else{
            this.removeAttribute('steps')
        }
    }

//define attributes

    constructor(){
        super();   
        console.log('construtor method') ;
        this._shadowRoot= this.attachShadow({mode:'open'});
        this._shadowRoot.innerHTML=`
        <button id="decrement" style="background:green;color:white;padding:20px;margin-left:500px">-</button>
        <span id="count" style="font-size:30px;">0 </span>
        <button id="increment" style="background:green;color:white;padding:20px;margin-right:10px">+</button>
        `
        this.CountElement=this._shadowRoot.querySelector('#count');
        this.decrementMethod=this._shadowRoot.querySelector('#decrement');
        this.incrementMethod=this._shadowRoot.querySelector('#increment');
    }

    connectedCallback(){
       console.log('Connected Callback method');
       this.count= this.initialvalue || 0
       this.CountElement.innerText=this.count;
       this.decrementMethod.addEventListener("click",this.decrementValue.bind(this));
       this.incrementMethod.addEventListener("click",this.incrementValue.bind(this));
    }
    attributeChangedCallback(name,oldValue,newValue){
        console.log(`${name}'s  changed from ${oldValue} to ${newValue}`)
    }

    disconnectedCallback(){
        console.log('disconnected callback connected');
        this.decrementMethod.removeEventListener("click",this.decrementValue.bind(this));
        this.incrementMethod.removeEventListener("click",this.incrementValue.bind(this))
    }

    decrementValue(){
        this.count=this.count- +this.steps ;
        this.CountElement.innerText=this.count;
    }

    incrementValue(){
        this.count= +this.count + +this.steps;
        this.CountElement.innerText= this.count;   
    }
}

customElements.define("count-element",CountElement);