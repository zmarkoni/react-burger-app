import React from 'react';
import classes from './Burger.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    console.log('Burger props: ', props);
    //console.log(props.ingredients);
    let objIngredients = props.ingredients;

    // Prvo moramo objekat objIngredients da pretvorimo u key:value parove da bi prosli kroz njih
    /*
    https://stackoverflow.com/questions/8312459/iterate-through-object-properties
    Object.keys(obj).map(e => console.log(`key=${e}  value=${obj[e]}`));
    */
    //console.log('objIngredients keys: ', Object.keys(objIngredients));

    let transformedIngredients = Object.keys(objIngredients) // convert Object keys to array like:"meat", "salat"
        .map(ingKey => {
            // da prebacimo u array
            //console.log( objIngredients[ingKey] );  // get values koje prebacujemo u array da bi mogli da ih mapiramo
            //console.log( [...Array( props.ingredients[ingKey])] );  // create Array of as many elements as it is value of the key, cheese:2
            return [...Array( props.ingredients[ingKey])].map((noNeed, i) => { // map(name, index) here we put noNeed since we don't need name since we get it from ingKey
                return <BurgerIngridient key={ingKey + i} type={ingKey}/>
            });
        }).reduce(
            (arr, el) => {
                return arr.concat(el)
            }, []
        );

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingridients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);