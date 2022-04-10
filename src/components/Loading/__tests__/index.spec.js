import Loading from '../index';

describe('Loading component', () => {
  it('should render Loading component', () => {
    const component = shallow(<Loading />);
    expect(component).toMatchSnapshot();
  });
});
