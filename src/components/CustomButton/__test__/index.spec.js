import CustomButton from '../index';

describe('CustomButton component', () => {
  it('should render CustomButton component with props', () => {
    const component = shallow(<CustomButton text="Delete" />);
    expect(component).toMatchSnapshot();
  });

  it('should render CustomButton component without props', () => {
    const component = shallow(<CustomButton />);
    expect(component).toMatchSnapshot();
  });
});
