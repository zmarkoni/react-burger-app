// Lecture https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8276256#announcements
import {BurgerBuilder} from "./BurgerBuilder";
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
configure({adapter: new Adapter()});
// shallow simulate DOM without content, it will render only attributes, properties of elements

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        // need to pass onInitIngredients since it is used in componentDidMount
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render BuildControls when receiving ingredients', () => {
       wrapper.setProps({
           ings: {
                salad: 0
           }
       });
       // finding only Type BuildControls not component!
       expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});