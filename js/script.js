const root = document.getElementById("root");
const {Component} = React;
const categories = ["annabelle","almay","alva","anna sui","benefit","boosh","clinique","colourpop","covergirl","dalish","marcelle","marienatie","maybelline","milani","misa","mistura","moov","nudus","nyx","orly"];
const NavbarCom = () => {
 return (
  <nav className="nav" >
  <a href="#" className="logo" >Makeup<span>Club</span></a>
  <div>
  <span>
  <svg width="1.6em" height="1.6em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
  </svg>
  </span>
  <span>
  <svg width="1.6em" height="1.6em" viewBox="0 0 16 16" className="bi bi-cart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
  </svg>
  </span>
  </div>
  </nav>
 );
}
const HeaderCom = () => {
  return (
  <header className="header">
  <div>
  <h1>MakeupClub</h1>
  <h2>Best Makeup product</h2>
  <p>Buy makeup & beauty products online in the world, Best exclusive makeup website in India</p>
  <a href="https://www.sololearn.com/Profile/9151475/?ref=app" target="_blank" className="btn" >Follow me</a>
  </div>
  </header>
  );
}
const FooterCom = () => {
  return (
  <footer>
  <small>Created by <a href="https://www.sololearn.com/Profile/9151475/?ref=app" >Amardeep Kesharwani</a></small>
  </footer>
  );
}
const Loader = () => {
  return (
    <div class="overlay">
      <div class="loader" >
        <img src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif" alt="loading" /> 
      </div>
    </div>
  );
}
class Products extends Component{
  constructor(props) {
   super(props);
   this.state = {
   product:[],
   loading: false,
   };
  }
  fetchProduct = async (brand) => {
   try{
    this.setState({loading:true})
    const res = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json?brand='+brand);
    this.setState({
     product:res.data,
    })
   }catch(err){
    console.log(err)
   } finally{
    this.setState({loading:false})
   } 
  }
  catChange = (e) => {
  const brand = e.target.value;
  this.fetchProduct(brand)
  }
  componentDidMount() {
   this.fetchProduct('annabelle')
  }
  purchase = (name, price) => {
    swal("Enter Your Mobile No ", {
     content: "input",
     attributes: {
     placeholder: "+91",
     type: "number",
     },
     button:"Register"
    })
    .then((value) => {
     swal({
      title:"Checkout",
      text:`Product Name : ${name}
      Total price : ${price}$`,
      icon:"info",
      button:"checkout"
     })
     .then(() => {
      swal({
      title: "Thank You",
      text: "Your Order Successfully,\nWe will call you soon for delivery details.",
      icon: "success",
      button:"close"
      })
     })
    })
  }
  render(){
    return(
      <section>
         {this.state.loading ? <Loader/> : null}
        <div className="filter" >
        <h4>Filter Products</h4>
        <select onChange={this.catChange}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        </div>
        <h1 className="title" >Our Products</h1>
        <div className="grid">
          {this.state.product.map(pro =>  
          <div class="card">
          <div class="card_img">
          <img src={pro.image_link} alt=""/>
          </div>
          <div class="card_content" >
          <div class="card_body">
          <p class="card_name">{pro.name} </p>
          <h3 class="card_pri">Price : {pro.price}$</h3>
          <h4 class="card_cat">Category : {pro.category || pro.brand}</h4>
          <p>{pro.description}</p>
          </div>
          <div class="card_footer" >
          <button class="btn" onClick={() => this.purchase(pro.name,pro.price)}>Buy Now</button>
          </div>
          </div>
          </div>
        )}
        </div>
      </section>
    );
  }
}
class App extends Component{
 render(){
  return(
  <React.Fragment>
   <NavbarCom/>
   <HeaderCom/>
   <Products/>
   <FooterCom/>
  </React.Fragment>
  );
 }
}
ReactDOM.render(<App/>,root);