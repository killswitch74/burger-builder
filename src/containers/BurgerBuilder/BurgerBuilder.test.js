import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

configure({ adapter: new Adapter });

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder resetIng={() => {}} resetPrice={() => {}} fetchIng={() => {}} />);
    });

    it('<Spinner /> check', () => {
        wrapper.setProps({ error: null, ing: null });
        expect(wrapper.contains(<Spinner />)).toEqual(true);
    });

    it('<Burger /> check', () => {
        wrapper.setProps({ ing: true});
        expect(wrapper.contains(<Burger ing />)).toEqual(true);
    });

    it('<BuildControls /> check', () => {
        wrapper.setProps({ ing: true});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});