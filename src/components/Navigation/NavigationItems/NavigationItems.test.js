import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationItems } from './NavigationItems';
import { NavigationItem } from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should display 2 navigation items if un-authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should display 4 navigation items if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });

    it('should display Logout navigation item if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavigationItem>Logout</NavigationItem>)).toEqual(true);
    });
});