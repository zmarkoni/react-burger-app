import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// Advice https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8276254#announcements

configure({adapter: new Adapter()});

// shallow simulate DOM without content, it will render only attributes, properties of elements

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => { // general function which happen before any test, we also have afterEach
        wrapper = shallow(<NavigationItems/>);
    });

    afterEach(() => {

    });

    // For this test we need to uncomment code in NavigationItem.js
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render Logout button if authenticated', () => {
        // when testing with CONTAINS we need to write exactly the same NODE
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});