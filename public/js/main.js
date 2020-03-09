class Hellos{
  constructor(){
    this.hellos = [];
    this.apiURL = '/api/v1/hellos';
    this.$app = document.querySelector("#app");
    this.$createHelloBtn = document.querySelector("#createHelloBtn");
    this.$hellosCounter = document.querySelector("#hellosCounter");

  }
  
  async init(){
     this.$createHelloBtn.addEventListener('click', async(evt) => {
       evt.preventDefault();
       
       await this.createHello();
     });

    await this.getHellos();
    this.updateView();
  }
  
  updateView(){
    this.$hellosCounter.textContent = this.hellos.length;
  }
  
  // GET
  async getHellos(){
    try{
      const result = await fetch(this.apiURL);
      const data = await result.json();
      this.hellos = data;
      this.updateView();
    } catch(err){
      console.error(err);
    }
  }

  // POST
  async createHello(){
    try{
      const newData = {
        greeting: "hello"
      }
      const options = {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData)
      }
      const result = await fetch(this.apiURL, options);
      const data = await result.json();

      this.hellos.push(data);
      this.updateView();
    }catch(err){
      console.error(err);
    }
  }
}

window.addEventListener('DOMContentLoaded', async() =>{
   const hellos = new Hellos();
   console.log(hellos)
   hellos.init();

});