import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {
  
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);
  
  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if(check) {
      setVeggie(JSON.parse(check));
    }else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
      const data = await api.json();
  
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data.recipes);
    }
    
  }

  return (
    <div>
      <h3>Our Vegetarian Picks</h3>
      <Wrapper>
        <Splide options={{
          perPage: 3,
          pagination: false,
          drag: "free",
          gap: "2rem",

          // Responsive breakpoints
          mediaQuery: 'max',
          breakpoints: {
            // When windows width is 1000
            1000: {
              perPage: 2,
            },
            //When windows width is 600
            600: {
              perPage: 1,
            }
          }
        }}>
        {veggie.map((recipe) => {
          return(
            <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt={recipe.title}/>
              <h4>{recipe.title}</h4>
              </Link>
            </Card>
            </SplideSlide>
          );
        })}
        </Splide>
      </Wrapper>
    </div>
  )
}
const Wrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 3rem;
`;
const Card = styled.div`
img{
  width: 100%;
  border-radius: 2rem;
  height: 15rem;
}
a {
  text-decoration: none;
}
h4{
  text-align: center;
  padding: 1rem;
}
`;

export default Veggie
