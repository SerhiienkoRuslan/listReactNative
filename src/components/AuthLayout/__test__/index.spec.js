import AuthLayout from '../index';

const createTestProps = (props) => ({
  navigation: {
    navigate: jest.fn()
  },
  handleSubmit: jest.fn(),
  ...props
});

describe('AuthLayout component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps({});
    wrapper = shallow(<AuthLayout {...props} />);
  });

  it('should render AuthLayout component with props', () => {
    const { getByText } = render(
      <AuthLayout
        isLogin={true}
        navigation={navigation}
        handleSubmit={handleSubmit}
      />
    );
    let buttonText = getByText('Sign Up');
    fireEvent(buttonText.parent, 'press'); //parent to get to TouchableOpacity
    alertText = getByText('Not Allowed');
    expect(alertText).toBeDefined();
  });

  it('should render AuthLayout component without props', () => {
    const component = shallow(
      <AuthLayout navigation={navigation} handleSubmit={handleSubmit} />
    );
    expect(component).toMatchSnapshot();
  });
});
